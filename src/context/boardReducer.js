import { GET_BOARDS, ADD_BOARD, BOARD_ERROR, GET_BOARD_DATA, ADD_LIST, ADD_CARD, MOVE_CARD } from './types';

export default (state, action) => {
  switch (action.type) {
    // ... (otros casos)
    case ADD_CARD:
      return {
        ...state,
        cards: [...state.cards, action.payload],
      };
    // NUEVO CASO PARA MOVER LA TARJETA EN EL ESTADO LOCAL
    case MOVE_CARD:
      return {
        ...state,
        cards: state.cards.map((card) =>
          card._id === action.payload.cardId ? { ...card, list: action.payload.newListId } : card
        ),
      };
    // ... (el resto de los casos)
    default:
      return state;
  }
};