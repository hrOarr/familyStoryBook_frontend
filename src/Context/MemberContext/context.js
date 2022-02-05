import React, { useReducer } from 'react';
import { state, MemberReducer } from './reducer';

const MemberStateContext = React.createContext();
const MemberDispatchContext = React.createContext();

export function useMemberState() {
	const context = React.useContext(MemberStateContext);
	if (context === undefined) {
		throw new Error('useMemberState must be used within a MemberProvider');
	}

	return context;
}

export function useMemberDispatch() {
	const context = React.useContext(MemberDispatchContext);
	if (context === undefined) {
		throw new Error('useMemberDispatch must be used within a MemberProvider');
	}

	return context;
}

export const MemberProvider = ({ children }) => {
	const [member, dispatch] = useReducer(MemberReducer, state);

	return (
		<MemberStateContext.Provider value={member}>
			<MemberDispatchContext.Provider value={dispatch}>
				{children}
			</MemberDispatchContext.Provider>
		</MemberStateContext.Provider>
	);
};