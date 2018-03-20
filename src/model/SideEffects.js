import {Map, Set} from "immutable";
import * as Actions from "./Actions";
import * as core from "./core";
import {getSelectedDishId} from "./core";
import * as network from "./network";
import * as Keys from "./keys";
import * as Rx from "rxjs";
import {searchKey} from "./core";

/**
 * Created by Daniel Schlaug on 2018-03-13.
 */

const scope = "se.kth.dinnerplanner.siddaniel.";

const types = {
    fetchDish: scope + "fetchDish",
    updateUrl: scope + "updateUrl",
    findDishes: scope + "findDishes"
};

function fetchDish(dishId) {
    return {
        type: types.fetchDish,
        key: dishId,
        successAction: (dish) => Actions.fetchedDish(dish),
        errorAction: (dishId, reason) => Actions.failedToFetchDish({dishId: dishId, reason: reason}),
    }
}

function updateUrl(url) {
    return {
        type: types.updateUrl,
        key: url.toString(),
    }
}

function findDishes({searchText, searchType}) {
    const searchKey = core.searchKey(searchText, searchType);
    return {
        type: types.findDishes,
        key: searchKey,
        searchText: searchText,
        searchType: searchType,
    }
}

export function getSideEffects(oldState, state) {
    let url = new URL(window.location);
    url.search = "";
    url.pathname = `/${state.get('page')}`;
    const selectedDishId = core.getSelectedDishId(state);
    if (selectedDishId) {
        url.searchParams.set('id', selectedDishId);
    }
    return Set()
        .add(
            core.getSelectedDishId(state)
            && !core.getFullDataOnSelectedDish(state)
            && fetchDish(getSelectedDishId(state))
        )
        .add(
            core.searchParametersChanged(oldState, state)
            && findDishes({
                searchText: state.get('searchText'),
                searchType: state.get('searchType')
            })
        )
        .add(
            updateUrl(url)
        )
        .filter(x => x);
}

function id(sideEffect) {
    return sideEffect.type + "/" + sideEffect.key;
}

export function sideEffectMapper(sideEffects, dispatch, mapperState = Map()) {
    sideEffects.forEach(sideEffect => {
        console.log("------------ Mapping Side Effect -----------");
        console.log(sideEffect);
        switch (sideEffect.type) {
            case types.fetchDish:
                let promise = network.fetchDish(sideEffect.key);
                promise.then(
                    dish => dispatch(sideEffect.successAction(dish)),
                    error => dispatch(sideEffect.errorAction(sideEffect.key, error)));
                break;
            case types.updateUrl:
                let url = new URL(sideEffect.key);
                history.pushState(
                    {todo: "back navigation not implemented"},
                    url.pathname,
                    `${url.pathname}${url.search}`
                );
                break;
            case types.findDishes:
                let findDishesState = mapperState.get(types.findDishes) || {};
                console.log("---- Searching ----");
                console.log(findDishesState);
                findDishesState.textSubject = findDishesState.textSubject || new Rx.BehaviorSubject(sideEffect.searchText);
                findDishesState.typeSubject = findDishesState.typeSubject || new Rx.BehaviorSubject(sideEffect.searchType);
                console.log(findDishesState);

                if (!findDishesState.searchSubscription) {
                    findDishesState.searchSubscription = findDishesState.textSubject
                        .throttleTime(500)
                        .startWith("")
                        .distinctUntilChanged()
                        .combineLatest(
                            findDishesState.typeSubject
                                .startWith("all dishes")
                                .distinctUntilChanged(),
                            (search, type) => ([search, type])
                        )
                        .flatMap(([search, type]) =>
                            Rx.Observable.fromPromise(network.findDishes({
                                searchText: search,
                                searchType: type
                            }))
                            .map(foundDishes => [searchKey(search, type), foundDishes])
                        )
                        .subscribe(([searchKey, foundDishes]) => dispatch(Actions.cacheFoundDishes(searchKey, foundDishes)));
                } else {
                    findDishesState.textSubject.next(sideEffect.searchText);
                    findDishesState.typeSubject.next(sideEffect.searchType);
                }
                mapperState = mapperState.set(types.findDishes, findDishesState);
                break;
        }
    });
    return {reduxAction: {type: "sideEffectCompleted"}, mapperState: mapperState};
}

function getEffectsToCancel(sideEffectRequests, pendingSideEffects) {
    let requestedIds = sideEffectRequests.map(id);

    return pendingSideEffects
        .filter((_, pendingId) => !requestedIds.has(pendingId));
}

function getEffectsToPerform(sideEffectRequests, pendingSideEffects) {
    return sideEffectRequests
        .filter(sideEffectRequest => !pendingSideEffects.has(id(sideEffectRequest)));
}

export class SideEffector {
    constructor(mapper, dispatch) {
        this._mapper = mapper;
        this._state = Map({lastIdsToPerform: Set(), pendingEffects: Map()});
        this._dispatch = dispatch;
    }

    perform(sideEffects) {
        const {state, reduxAction} = this._performWithState(this._state, sideEffects);
        this._state = state;
        reduxAction && this._dispatch(reduxAction);
    }

    _performWithState(sideEffectorState, sideEffectRequests) {
        let state = sideEffectorState;
        let pendingEffects = state.get('pendingEffects');
        const effectsToPerform = getEffectsToPerform(sideEffectRequests, pendingEffects);
        const effectIdsToPerform = Set(effectsToPerform.map(id));
        if (state.get('lastIdsToPerform').equals(effectIdsToPerform)) {
            return {state: state}
        }
        state = state.set('lastIdsToPerform', effectIdsToPerform);

        const effectsToCancel = getEffectsToCancel(sideEffectRequests, pendingEffects);
        effectsToCancel.valueSeq().forEach(pending => pending.cancel && pending.cancel());
        const pendingSubCancelled = state.get('pendingEffects').deleteAll(effectsToCancel.keys());
        console.log("effects to perform");
        console.log(effectsToPerform.toJS());
        if (effectsToPerform.size > 0) {
            console.log(this._state.toJS());
            const {reduxAction, mapperState} = this._mapper(effectsToPerform, this._dispatch, state.get('mapperState'));
            state = state.set('mapperState', mapperState);
            console.log(this._state.toJS());
            return {
                state: state,
                reduxAction: reduxAction
            };
        } else {
            return {state: state.set('pendingEffects', pendingSubCancelled)};
        }
    }
}
