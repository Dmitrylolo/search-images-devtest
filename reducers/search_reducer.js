import {
	TERM_CHANGED,
	COLUMNS_CHANGED,
	FETCH_RESULT
} from '../actions/types';

const INITIAL_STATE = {
	term: '',
	columns: 1,
	images: []
};

export default (state = INITIAL_STATE, action) => {
	console.log(action);
	switch (action.type) {
		case TERM_CHANGED:
			return { ...state, term: action.payload };
		case COLUMNS_CHANGED:
			return { ...state, columns: action.payload };
		case FETCH_RESULT:
			return { ...state, images: action.payload };
		default:
		return state;
	}
};
