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
    return async dispatch => {
        await dispatch({ type: 'BUY_RECOMMENDATION_REQUEST', payload: selectedKits})
        // montar o payload
        if (Object.keys(selectedKits).length < 1) {
            dispatch({ type: 'BUY_RECOMMENDATION_FAIL', payload: "Nenhuma recomendação selecionada" });
        }
        await Object.keys(selectedKits).map(async kit => {
            // one debit post for each kit selected
            if (!Object.keys(selectedKits[kit]).some(index => selectedKits[kit][index].selected)) {
                dispatch({ type: 'BUY_RECOMMENDATION_FAIL', payload: "Nenhuma recomendação selecionada" });
            }
            await Object.keys(selectedKits[kit]).forEach(async index => {
                let recom = selectedKits[kit][index];
                if (recom.selected) {
                    let postPayload = {
                        productId: kit,
                        description: recom.description,
                        value: recom.value,
                        installmentsNumber: recom.parcelas
                    }
                    let userId = JSON.parse(localStorage.getItem("user")).id;
                    await kitsService.buyRecommendation(userId, postPayload)
                    .then(res => {
                        dispatch({ type: 'BUY_RECOMMENDATION_SUCCESS', payload: 'Itens comprados!!!' });
                        console.log(res);
                    }, err => {
                        dispatch({ type: 'BUY_RECOMMENDATION_FAIL', payload: err.response.data.error });
                        console.log(err.response.data)
                    })
                }
            })
        });
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