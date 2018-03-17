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
    updateUrl: scope + "updateUrl"
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

export function renderSideEffects(state) {
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
        }
    });
    return {reduxAction: {type: "sideEffectCompleted"}, pending: {}};
}

function splitSideEffects(renderedSideEffects, pendingSideEffects) {
    let renderedSFIds = renderedSideEffects.map(id);

    let pendingToCancel = pendingSideEffects
        .filter((_, pendingId) => !renderedSFIds.has(pendingId));

    let effectsToPerform = renderedSideEffects
        .filter(renderedSideEffect => !pendingSideEffects.has(id(renderedSideEffect)));

    return {pendingToCancel: pendingToCancel, effectsToPerform: effectsToPerform}
}

export class SideEffector {
    constructor(mapper, dispatch) {
        this._mapper = mapper;
        this._pending = Map();
        this._lastEffectIdsToPerform = Set();
        this._dispatch = dispatch;
    }

    perform(sideEffects) {
        const pendingIn = this._pending;
        const {pendingToCancel, effectsToPerform} = splitSideEffects(sideEffects, this._pending);
        const effectIdsToPerform = Set(effectsToPerform.map(id));
        if (this._lastEffectIdsToPerform.equals(effectIdsToPerform)) {
            return
        }
        this._lastEffectIdsToPerform = effectIdsToPerform;
        pendingToCancel.valueSeq().forEach(pending => pending.cancel && pending.cancel());
        const pendingSubCancelled = pendingIn.deleteAll(pendingToCancel.keys());
        console.log("effects to perform");
        console.log(effectsToPerform.toJS());
        if (effectsToPerform.size > 0) {
            const {reduxAction, pending: newPending} = this._mapper(effectsToPerform, this._dispatch);
            this._pending = pendingSubCancelled.merge(newPending);
            this._dispatch(reduxAction);
        } else {
            this._pending = pendingSubCancelled;
        }
    }
}
