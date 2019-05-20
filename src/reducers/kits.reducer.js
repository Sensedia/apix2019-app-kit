
const initialState = {
    camisa: {
      isSelected: true,
      color: "Branco",
      size: "",
      gender: "Masculino"
    },
    calca: {
      isSelected: false,
      color: "Branco",
      size: "",
      gender: "Masculino"
    },
    sapato: {
      isSelected: false,
      color: "Branco",
      size: "",
      gender: "Masculino"
    },
    hasSubmit: false
}

export function kits(state = initialState, action) {
    console.log(action);
    switch(action.type) {
        case 'SELECT_TYPE': {
            // Select only one
            let newState = {
                camisa: { ...state.camisa, isSelected: action.payload === "camisa" },
                calca: { ...state.calca, isSelected: action.payload === "calca" },
                sapato: { ...state.sapato, isSelected: action.payload === "sapato" }
            }
            return newState;
        } case 'SET_COLOR': {
            // Set color of the object
            const object = action.payload.object;
            const value = action.payload.value;
            return {
                ...state,
                [object]: {
                    ...state[object],
                    color: value
                }
            }
        } case 'SET_SIZE': {
            // Set size of the object
            const object = action.payload.object;
            const value = action.payload.value;
            return {
                ...state,
                [object]: {
                    ...state[object],
                    size: value
                }
            }
        } case 'SET_GENDER': {
            // Set gender of the object
            const object = action.payload.object;
            const value = action.payload.value;
            return {
                ...state,
                [object]: {
                    ...state[object],
                    gender: value
                }
            }
        } case 'SET_REF': {
            // Set HTML element reference of the object
            const object = action.payload.object;
            const value = action.payload.value;
            const newState = {
                ...state,
                [object]: {
                    ...state[object],
                    element: value
                }
            }
            return newState;
        } case 'SUBMIT_KIT_REQUEST': {
            return { ...state, hasSubmit: false, isSubmitting: true }
        } case 'SUBMIT_KIT_SUCCESS': {
            return { ...state, hasSubmit: true, isSubmitting: false }
        } case 'SUBMIT_KIT_FAIL': {
            return { ...state, isSubmitting: false }
        } default: {
            return state;
        }
    }
}