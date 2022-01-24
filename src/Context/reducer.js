
let user = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')).user:'';
let token = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')).auth_token:'';

export const state = {
	user: '' || user,
	token: '' || token,
	loading: false,
	errorMessage: null
};

export const AuthReducer = (state, action) => {
    switch(action.type){
        case 'REQUEST_LOGIN':
            return {
                ...state,
                loading: true
            };
        
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.auth_token,
                loading: false
            };
        case 'LOGOUT':
            return {
                ...state,
                user: '',
                token: ''
            };
        case 'LOGIN_ERROR':
			return {
				...state,
				loading: false,
				errorMessage: action.error,
			};
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}