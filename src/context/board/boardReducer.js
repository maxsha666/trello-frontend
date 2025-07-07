import {
    GET_BOARDS,
    ADD_BOARD,
    BOARD_ERROR,
} from '../types';

const boardReducer = (state, action) => {
    switch (action.type) {
        case GET_BOARDS:
            return {
                ...state,
                boards: action.payload,
                loading: false,
                error: null,
            };
        case ADD_BOARD:
            return {
                ...state,
                boards: [action.payload, ...state.boards],
                loading: false,
                error: null,
            };
        case BOARD_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        default:
            return state;
    }
};

export default boardReducer;