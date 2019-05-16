import { kitsService } from '../services';

export const kitsActions = {
    selectType,
    setRef,
    setColor,
    setSize,
    setGender,
    submit
}

function submit(kit, user) {
    const effectiveKit = {
        camisa: {
            cor: kit.camisa.color,
            tamanho: kit.camisa.size,
            genero: kit.camisa.gender
        },
        calca: {
            cor: kit.calca.color,
            tamanho: kit.calca.size,
            genero: kit.calca.gender
        },
        calcado: {
            cor: kit.sapato.color,
            tamanho: kit.sapato.size,
            genero: kit.sapato.gender
        }
    }
    return dispatch => {
        dispatch({ type: "SUBMIT_KIT_REQUEST" });
        kitsService.submitKit(effectiveKit, user)
        .then(kit => {
            dispatch({ type: "SUBMIT_KIT_SUCCESS" });
            console.log('submitted kit')
            console.log(kit);
            console.log(user);
        })
        .catch(err => {
            dispatch({ type: "SUBMIT_KIT_FAIL" });
        })
    }
}

function selectType(which) {
    return dispatch => {
        dispatch({ type: "SELECT_TYPE", payload: which });
    }
}

function setRef(which, ref) {
    return dispatch => {
        dispatch({ type: "SET_REF", payload: { object: which, value: ref } });
    }
}

function setColor(color, which) {
    return dispatch => {
        dispatch({ type: "SET_COLOR", payload: { object: which, value: color } });
    }
}

function setSize(size, which) {
    return dispatch => {
        dispatch({ type: "SET_SIZE", payload: { object: which, value: size } });
    }

}

function setGender(gender, which) {
    return dispatch => {
        dispatch({ type: "SET_GENDER", payload: { object: which, value: gender } });
    }
}