import {Map, Set} from "immutable";
import * as Actions from "./Actions";
import * as Core from "./model/core";
import {getSelectedDishId} from "./model/core";
import * as Services from "./model/dinnerModel";
import * as Keys from "./model/keys";

/**
 * Created by Daniel Schlaug on 2018-03-13.
 */

const scope = "se.kth.dinnerplanner.siddaniel.";

const types = {
    fetchDish: scope + "fetchDish"
};

function fetchDish(dishId) {
    function success(dish) {
        return Actions.fetchedDish(dish);
    }

    function error(dishId, reason) {
        return Actions.failedToFetchDish({dishId: dishId, reason: reason});
    }

    return {
        type: types.fetchDish,
        key: dishId,
        successAction: success,
        errorAction: error,
    }
}

export function renderSideEffects(state) {
    return Set()
        .add(Core.getSelectedDishId(state) && !Core.getFullDataOnSelectedDish(state) && fetchDish(getSelectedDishId(state)))
        .filter(x => x);
}

function id(sideEffect) {
    return sideEffect.type + "/" + sideEffect.key;
}

export function sideEffectMapper(sideEffects, dispatch) {
    let pendings = {};
    sideEffects.forEach(sideEffect => {
        console.log(sideEffect);
        switch (sideEffect.type) {
            case types.fetchDish:
                let promise = Services.fetchDish(sideEffect.key);
                promise.then(dish => dispatch(sideEffect.successAction(dish)), (error) => dispatch(sideEffect.errorAction(sideEffect.key, error)));
                pendings[id(sideEffect)] = {};
                break;
        }
    });
    return {reduxAction: {type: "sideEffectCompleted"}, pending: pendings};
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
        this._dispatch = dispatch;
    }

    perform(sideEffects) {
        const pendingIn = this._pending;
        const {pendingToCancel, effectsToPerform} = splitSideEffects(sideEffects, this._pending);
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
