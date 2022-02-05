import React, { useReducer } from 'react';
import { state, EducationReducer } from './reducer';

const EducationStateContext = React.createContext();
const EducationDispatchContext = React.createContext();

export function useEducationState() {
	const context = React.useContext(EducationStateContext);
	if (context === undefined) {
		throw new Error('useEducationState must be used within a EducationProvider');
	}

	return context;
}

export function useEducationDispatch() {
	const context = React.useContext(EducationDispatchContext);
	if (context === undefined) {
		throw new Error('useEducationDispatch must be used within a EducationProvider');
	}

	return context;
}

export const EducationProvider = ({ children }) => {
	const [education, dispatch] = useReducer(EducationReducer, state);

	return (
		<EducationStateContext.Provider value={education}>
			<EducationDispatchContext.Provider value={dispatch}>
				{children}
			</EducationDispatchContext.Provider>
		</EducationStateContext.Provider>
	);
};