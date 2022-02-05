import React, { useReducer } from 'react';
import { state, JobReducer } from './reducer';

const JobStateContext = React.createContext();
const JobDispatchContext = React.createContext();

export function useJobState() {
	const context = React.useContext(JobStateContext);
	if (context === undefined) {
		throw new Error('useJobState must be used within a JobProvider');
	}

	return context;
}

export function useJobDispatch() {
	const context = React.useContext(JobDispatchContext);
	if (context === undefined) {
		throw new Error('useJobDispatch must be used within a JobProvider');
	}

	return context;
}

export const JobProvider = ({ children }) => {
	const [job, dispatch] = useReducer(JobReducer, state);

	return (
		<JobStateContext.Provider value={job}>
			<JobDispatchContext.Provider value={dispatch}>
				{children}
			</JobDispatchContext.Provider>
		</JobStateContext.Provider>
	);
};