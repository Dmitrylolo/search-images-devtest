import { REHYDRATE } from 'redux-persist';
import {
	TERM_CHANGED,
	COLUMNS_CHANGED,
	FETCH_RESULT,
	LOADING,
	SWITCHER_CHANGED
} from '../actions/types';

const INITIAL_STATE = {
	term: '',
	columns: 1,
	images: [],
	errorText: 'Nothing to show. :(',
	loading: false,
	switcher: false
};

export default (state = INITIAL_STATE, action) => {
	console.log(action);
	switch (action.type) {
		case REHYDRATE: 																								// Crunch on rerux-persist. I dont know why it not works first run. Comment
			return action.payload.search ? action.payload.search : state;	// this REHYDRATE case, then run app, and uncomment block.
		case TERM_CHANGED:
			return { ...state, term: action.payload };
		case COLUMNS_CHANGED:
			return { ...state, columns: action.payload };
		case FETCH_RESULT:
			return { ...state, images: action.payload, loading: false };
		case LOADING:
			return { ...state, loading: true };
		case SWITCHER_CHANGED:
			return { ...state, switcher: action.payload };
		default:
		return state;
	}
};
