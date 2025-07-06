import { GET_BOARDS, ADD_BOARD, BOARD_ERROR, GET_BOARD_DATA, ADD_LIST, ADD_CARD, MOVE_CARD } from './types';

export default (state, action) => {
  switch (action.type) {
    case GET_BOARDS:
      return {
        ...state,
        boards: action.payload,
      };
    case ADD_BOARD:
      return {
        ...state,
        boards: [action.payload, ...state.boards],
      };
    case GET_BOARD_DATA:
      return {
        ...state,
        currentBoard: action.payload.board,
        lists: action.payload.lists,
        cards: action.payload.cards,
      };
    case ADD_LIST:
      return {
        ...state,
        lists: [...state.lists, action.payload],
      };
    case ADD_CARD:
      return {
        ...state,
        cards: [...state.cards, action.payload],
      };
    case MOVE_CARD:
      return {
        ...state,
        cards: state.cards.map((card) =>
          card._id === action.payload.cardId ? { ...card, list: action.payload.newListId } : card
        ),
      };
    case BOARD_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};