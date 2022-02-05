import React, { useReducer } from 'react';
import { state, AchievementReducer } from './reducer';

const AchievementStateContext = React.createContext();
const AchievementDispatchContext = React.createContext();

export function useAchievementState() {
	const context = React.useContext(AchievementStateContext);
	if (context === undefined) {
		throw new Error('useAchievementState must be used within a AchievementProvider');
	}

	return context;
}

export function useAchievementDispatch() {
	const context = React.useContext(AchievementDispatchContext);
	if (context === undefined) {
		throw new Error('useAchievementDispatch must be used within a AchievementProvider');
	}

	return context;
}

export const AchievementProvider = ({ children }) => {
	const [achievement, dispatch] = useReducer(AchievementReducer, state);

	return (
		<AchievementStateContext.Provider value={achievement}>
			<AchievementDispatchContext.Provider value={dispatch}>
				{children}
			</AchievementDispatchContext.Provider>
		</AchievementStateContext.Provider>
	);
};