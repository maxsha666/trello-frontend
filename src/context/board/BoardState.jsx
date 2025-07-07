import React, { useReducer } from 'react';
import api from '../../api';
import BoardContext from './boardContext';
import boardReducer from './boardReducer';
import {
    GET_BOARDS,
    ADD_BOARD,
    BOARD_ERROR
} from '../types';

const BoardState = props => {
    const initialState = {
        boards: [],
        currentBoard: null,
        loading: true,
        error: null,
    };

    const [state, dispatch] = useReducer(boardReducer, initialState);

    // Get all boards for a user
    const getBoards = async () => {
        try {
            const res = await api.get('/api/boards');
            dispatch({
                type: GET_BOARDS,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: BOARD_ERROR,
                payload: err.response.data.msg
            });
        }
    };

    // Add a new board
    const addBoard = async (formData) => {
        try {
            const res = await api.post('/api/boards', formData);
            dispatch({
                type: ADD_BOARD,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: BOARD_ERROR,
                payload: err.response.data.msg
            });
        }
    };


    return (
        <BoardContext.Provider
            value={{
                boards: state.boards,
                currentBoard: state.currentBoard,
                loading: state.loading,
                error: state.error,
                getBoards,
                addBoard,
            }}
        >
            {props.children}
        </BoardContext.Provider>
    );
};

export default BoardState;