
export const state = {
    educations: [],
    loading: false,
    error: ''
}

export const EducationReducer = (state, action)=>{
    switch(action.type){
        case 'SET_EDUCATIONS':
            return {
                ...state,
                educations: action.payload.educations
            };
        case 'SET_ERROR':
            return {
                ...state,
                error: action.error
            }
        default:
            throw new Error(`Unhandled action type(achievementReducer): ${action.type}`);
    }
}