import {Map, Set} from "immutable";
import * as Actions from "./Actions";
import * as Core from "./model/core";
import {getSelectedDishId} from "./model/core";
import * as Services from "./model/network";
import * as Keys from "./model/keys";

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

function findDishes({searchString, searchType}) {
    const searchKey = searchString + "/" + searchType;
    return {
        type: types.findDishes,
        key: searchKey,
        successAction: (foundDishes) => Actions.foundDishes(foundDishes, searchKey)
    }
}

export function getSideEffects(oldState, state) {
    let url = new URL(window.location);
    url.search = "";
    url.pathname = `/${state.get('page')}`;
    const selectedDishId = Core.getSelectedDishId(state);
    if (selectedDishId) {
        url.searchParams.set('id', selectedDishId);
    }
    return Set()
        .add(
            Core.getSelectedDishId(state)
            && !Core.getFullDataOnSelectedDish(state)
            && fetchDish(getSelectedDishId(state))
        )
        .add(
            Core.searchParametersChanged(oldState, state)
            && findDishes({
                searchString: state.get('searchString'),
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

export function sideEffectMapper(sideEffects, dispatch) {
    sideEffects.forEach(sideEffect => {
        switch (sideEffect.type) {
            case types.fetchDish:
                let promise = Services.fetchDish(sideEffect.key);
                promise.then(dish => dispatch(sideEffect.successAction(dish)), (error) => dispatch(sideEffect.errorAction(sideEffect.key, error)));
                break;
            case types.updateUrl:
                let url = new URL(sideEffect.key);
                history.pushState(
                    {todo:"back navigation not implemented"},
                    url.pathname,
                    `${url.pathname}${url.search}`
                )
                break;
            case types.findDishes:
        }
    });
    return {reduxAction: {type: "sideEffectCompleted"}, pending: {}};
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
            const {reduxAction, pending: newPending} = this._mapper(effectsToPerform, this._dispatch);
            return {
                state: state.set('pendingEffects', pendingSubCancelled.merge(newPending)),
                reduxAction: reduxAction
            };
        } else {
            return {state: state.set('pendingEffects', pendingSubCancelled)};
        }
    }
}
