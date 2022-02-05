
export const state = {
    jobs: [],
    loading: false,
    error: ''
}

export const JobReducer = (state, action)=>{
    switch(action.type){
        case 'SET_JOBS':
            return {
                ...state,
                jobs: action.payload.jobs
            };
        case 'SET_ERROR':
            return {
                ...state,
                error: action.error
            }
        default:
            throw new Error(`Unhandled action type(jobReducer): ${action.type}`);
    }
}