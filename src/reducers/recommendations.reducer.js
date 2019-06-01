const initialState = {
    kits: []
}

export function recommendations(state = initialState, action) {
    switch(action.type) {
        case 'GET_KITS_REQUEST': {
            return {
                ...state,
                isGettingKits: true,
            }
        } case 'GET_KITS_SUCCESS': {
            return {
                ...state,
                isGettingKits: false,
                kits: action.payload
            }
        } case 'GET_KITS_FAIL': {
            return {
                ...state,
                isGettingKits: false,
                getKitsErrorMessage: action.payload
            }
        } case 'BUY_RECOMMENDATION_REQUEST': {
            return {
                ...state,
                isSendingBuy: true,
                itemsBuying: action.payload,
                buyErrorMessage: null,
                buySuccessMessage: null
            }
        } case 'BUY_RECOMMENDATION_FAIL': {
            return {
                ...state,
                isSendingBuy: false,
                buyErrorMessage: action.payload,
                buySuccessMessage: null
            }
        } case 'BUY_RECOMMENDATION_SUCCESS': {
            return {
                ...state,
                isSendingBuy: false,
                buyErrorMessage: null,
                buySuccessMessage: action.payload
            }
        } case 'CLEAR_BUY_MESSAGE': {
            return {
                ...state,
                buyErrorMessage: null,
                buySuccessMessage: null
            }
        } default: return state;
    }
}