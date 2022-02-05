
export const state = {
    achievements: [],
    loading: false,
    error: ''
}

export const AchievementReducer = (state, action)=>{
    switch(action.type){
        case 'SET_ACHIEVEMENTS':
            return {
                ...state,
                achievements: action.payload.achievements
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