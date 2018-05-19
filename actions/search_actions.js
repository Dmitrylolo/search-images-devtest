import axios from 'axios';
import qs from 'qs';
import {
	TERM_CHANGED,
	COLUMNS_CHANGED,
	FETCH_RESULT
} from './types';

const SEARCH_ROOT_URL = 'https://www.google.com/search?';

const QUERY_PARAMS = {
	tbm: 'isch'
};

const RESULT_START_TAG = '<table class="images_table"';
const RESULT_END_TAG = '/table>';
const LENGTH_END_TAG = RESULT_END_TAG.length;
const IMG_START_SRC_ATTR = 'src="';
const IMG_END_SRC_ATTR = '"';
const IMG_START_SRC_ATTR_LENGTH = IMG_START_SRC_ATTR.length;


const buildSearchUrl = term => {
	const query = qs.stringify({ ...QUERY_PARAMS, q: term });
	return `${SEARCH_ROOT_URL}${query}`;
};

export const termChanged = text => {
	return {
		type: TERM_CHANGED,
		payload: text
	};
};

export const columnsChanged = text => {
	return {
		type: COLUMNS_CHANGED,
		payload: text
	};
};

export const loadResult = (term, navigate) => async dispatch => {
	try {
		const url = buildSearchUrl(term);

		const { data } = await axios.get(url);
		const start = data.indexOf(RESULT_START_TAG, 0);
		if (start === -1) {
			dispatch({ type: FETCH_RESULT, payload: [] });
			navigate();
		} else {
			const end = data.indexOf(RESULT_END_TAG, start);
			const imagesTable = data.slice(start, end + LENGTH_END_TAG);
			let startPos = -1;
			let id = 0;	
			const images = [];
			while ((startPos = imagesTable.indexOf(IMG_START_SRC_ATTR, startPos + 1)) !== -1) {
				const endPos = imagesTable.indexOf(IMG_END_SRC_ATTR, startPos + IMG_START_SRC_ATTR_LENGTH);
				const imgSrc = imagesTable.slice(startPos + IMG_START_SRC_ATTR_LENGTH, endPos);
				const image = { id, src: imgSrc };
				images.push(image);
				id++;
			}
			dispatch({ type: FETCH_RESULT, payload: images });
			console.log('we are here');
			navigate();
		}
	} catch (e) {
		console.log(e);
	}
};

