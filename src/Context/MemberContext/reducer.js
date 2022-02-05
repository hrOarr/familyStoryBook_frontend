
export const state = {
    member: [],
    loading: false,
    error: ''
}

export const MemberReducer = (state, action)=>{
    switch(action.type){
        case 'SET_MEMBER':
            return {
                ...state,
                member: action.payload.member
            };
        case 'SET_ERROR':
            return {
                ...state,
                error: action.error
            }
        default:
            throw new Error(`Unhandled action type(memberReducer): ${action.type}`);
    }
}