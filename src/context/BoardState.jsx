import React, { useReducer } from 'react';
import api from '../utils/api';
import boardContext from './boardContext';
import boardReducer from './boardReducer';
import { GET_BOARDS, ADD_BOARD, BOARD_ERROR, GET_BOARD_DATA, ADD_LIST, ADD_CARD, MOVE_CARD } from './types';

const BoardState = (props) => {
  const initialState = {
    boards: [],
    currentBoard: null,
    lists: [],
    cards: [],
    error: null,
  };

  const [state, dispatch] = useReducer(boardReducer, initialState);

  // Get Boards for user
  const getBoards = async () => {
    try {
      const res = await api.get('/boards');
      dispatch({ type: GET_BOARDS, payload: res.data });
    } catch (err) {
      dispatch({ type: BOARD_ERROR, payload: err.response.data.msg });
    }
  };

  // Add Board
  const addBoard = async (formData) => {
    try {
      const res = await api.post('/boards', formData);
      dispatch({ type: ADD_BOARD, payload: res.data });
    } catch (err) {
      dispatch({ type: BOARD_ERROR, payload: err.response.data.msg });
    }
  };
  
  // Get all data for a single board
  const getBoardData = async (boardId) => {
    try {
      const res = await api.get(`/boards/${boardId}`);
      dispatch({ type: GET_BOARD_DATA, payload: res.data });
    } catch (err) {
      dispatch({ type: BOARD_ERROR, payload: err.response.data.msg });
    }
  };
  
  // Add List
  const addList = async (formData) => {
    try {
      const res = await api.post('/lists', formData);
      dispatch({ type: ADD_LIST, payload: res.data });
    } catch (err) {
      dispatch({ type: BOARD_ERROR, payload: err.response.data.msg });
    }
  };
  
  // Add Card
  const addCard = async (formData) => {
    try {
      const res = await api.post('/cards', formData);
      dispatch({ type: ADD_CARD, payload: res.data });
    } catch (err) {
      dispatch({ type: BOARD_ERROR, payload: err.response.data.msg });
    }
  };

  // Move Card
  const moveCard = async (cardId, newListId) => {
    try {
      dispatch({ type: MOVE_CARD, payload: { cardId, newListId } });
      await api.put(`/cards/${cardId}`, { listId: newListId });
    } catch (err) {
      dispatch({ type: BOARD_ERROR, payload: err.response.data.msg });
    }
  };

  return (
    <boardContext.Provider
      value={{
        boards: state.boards,
        currentBoard: state.currentBoard,
        lists: state.lists,
        cards: state.cards,
        error: state.error,
        getBoards,
        addBoard,
        getBoardData,
        addList,
        addCard,
        moveCard,
      }}
    >
      {props.children}
    </boardContext.Provider>
  );
};

export default BoardState;