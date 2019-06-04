import { kitsService } from '../services';

export const kitsActions = {
    selectType,
    setRef,
    setColor,
    setGender,
    submit,
    clearSubmitMessage
}

const COLORS = ["Preto","Azul","Marrom","Verde","Cinza","Laranja","Rosa","Roxo","Vermelho","Branco","Amarelo"];
const COLORS_EN = ["BLACK","BLUE","BROWN","GREEN","GREY","ORANGE","PINK","PURPLE","RED","WHITE","YELLOW"];

function submit(kit, phone) {
    const effectiveKit = {
        phone: phone,
        gender: kit.gender.substring(0,1),
        specifications: [
            {
                type: "PANT",
                color: COLORS_EN[COLORS.indexOf(kit.calca.color)]
            },
            {
                type: "SHIRT",
                color: COLORS_EN[COLORS.indexOf(kit.camisa.color)]
            },
            {
                type: "SHOES",
                color: COLORS_EN[COLORS.indexOf(kit.sapato.color)]
            }
        ]
    }
    return dispatch => {
        dispatch({ type: "SUBMIT_KIT_REQUEST" });
        kitsService.submitKit(effectiveKit)
        .then(res => {
            dispatch({ type: "SUBMIT_KIT_SUCCESS", payload: "Kit submetido com sucesso!" });
            setTimeout(() => {
                dispatch(clearSubmitMessage());
            }, 3000);
        }, err => {
            dispatch({ type: "SUBMIT_KIT_FAIL" });
        })
    }
}

function clearSubmitMessage() {
    return dispatch => {
        dispatch({ type: 'CLEAR_SUBMIT_MESSAGE' })
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

function setGender(gender) {
    return dispatch => {
        dispatch({ type: "SET_GENDER", payload: gender });
    }
}

// const processError = err => {
//     if (err.response && err.response.data) {
//         if (err.response.data.length) {
//             return err.response.data.reduce((acc,cur) => acc += cur.message + '\n', "");
//         } else {
//             return err.response.data.message;
//         }
//     }
//     return err.message;
// }