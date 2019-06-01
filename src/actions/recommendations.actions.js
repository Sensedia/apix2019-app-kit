import { kitsService } from '../services';

export const recommendationsActions = {
    buyRecommendations,
    clearMessage,
    getKits
}

function clearMessage() {
    return dispatch => {
        dispatch({ type: 'CLEAR_BUY_MESSAGE' });
    }
}

function buyRecommendations(selectedKits) {
    return dispatch => {
        dispatch({ type: 'BUY_RECOMMENDATION_REQUEST', payload: selectedKits})
        let postPayload = selectedKits
        // montar o payload
        // selectedKits.map(kit => {});
        kitsService.buyRecommendation(postPayload).then(res => {
            dispatch({ type: 'BUY_RECOMMENDATION_SUCCESS', payload: res });
            setTimeout(() => {
                dispatch(clearMessage());
            }, 5000)
        }).catch(err => {
            dispatch({ type: 'BUY_RECOMMENDATION_FAIL', payload: err.message });
            setTimeout(() => {
                dispatch(clearMessage());
            }, 3000)
        })
    }
}

function getKits() {
    return dispatch => {
        dispatch({ type: 'GET_KITS_REQUEST'})
        let user = JSON.parse(localStorage.getItem("user"))
        kitsService.getKits(user).then(kits => {
            dispatch({ type: 'GET_KITS_SUCCESS', payload: kits.data})
        }).catch(err => {
            dispatch({ type: 'GET_KITS_FAIL', payload: err.message})
        })
    }
}