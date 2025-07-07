import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { DndContext, PointerSensor, useSensor, useSensors, closestCorners } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import api from '../api';
import Column from '../components/Column';

const BoardPage = () => {
  const { boardId } = useParams();
  const [board, setBoard] = useState(null);
  const [lists, setLists] = useState([]);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBoardData = async () => {
    try {
      setLoading(true);
      const boardRes = await api.get(`/api/boards/${boardId}`);
      const cardsRes = await api.get(`/api/cards/board/${boardId}`);
      
      setBoard(boardRes.data.data);
      setLists(boardRes.data.data.lists || []);
      setCards(cardsRes.data.data || []);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching board data:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBoardData();
  }, [boardId]);

  const setupTestData = async () => {
    try {
      // Create Lists
      const todoList = await api.post('/api/lists', { title: 'To Do', boardId });
      const inProgressList = await api.post('/api/lists', { title: 'In Progress', boardId });
      const doneList = await api.post('/api/lists', { title: 'Done', boardId });

      // Create Cards
      await api.post('/api/cards', { title: 'Task 1: Setup project', listId: todoList.data._id, boardId });
      await api.post('/api/cards', { title: 'Task 2: Build UI', listId: todoList.data._id, boardId });
      await api.post('/api/cards', { title: 'Task 3: Connect to API', listId: inProgressList.data._id, boardId });
      await api.post('/api/cards', { title: 'Task 4: Debug auth', listId: doneList.data._id, boardId });

      // Refresh data
      fetchBoardData();
    } catch (error) {
      console.error("Failed to set up test data", error);
    }
  };

  const getCardsByListId = (listId) => {
    return cards
      .filter((card) => card.list === listId)
      .sort((a, b) => a.position - b.position);
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
  
    const activeTask = cards.find(c => c._id === active.id);
    let overId = over.id;
    let overIsColumn = over.data.current?.type === 'Column';
  
    if (!overIsColumn) {
      const overTask = cards.find(c => c._id === over.id);
      overId = overTask.list;
    }
  
    if (activeTask.list !== overId) {
      // --- Move to a different column ---
      setCards(prev => prev.map(c => c._id === active.id ? { ...c, list: overId } : c));
    }
  
    // --- Reorder within the same or new column ---
    setCards(prev => {
      const activeIndex = prev.findIndex(c => c._id === active.id);
      const overIndex = prev.findIndex(c => c._id === over.id);
      return arrayMove(prev, activeIndex, overIndex);
    });
  
    // --- Backend Update ---
    // A slight delay to allow optimistic state to settle before calculating positions
    setTimeout(async () => {
      const allLists = [...new Set(cards.map(c => c.list))];
      const listsToUpdate = [];
  
      allLists.forEach(listId => {
        const cardsInList = cards
          .filter(c => c.list === listId)
          .sort((a, b) => a.position - b.position) // This might need adjustment based on final state
          .map(c => c._id);
        listsToUpdate.push({ listId, cards: cardsInList });
      });
  
      await api.put('/api/cards/move', { lists: listsToUpdate });
      fetchBoardData(); // Re-fetch from DB to ensure sync
    }, 500);
  };
  
  if (loading) return <div>Cargando...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>{board?.title}</h1>
      <button onClick={setupTestData} style={{ marginBottom: '20px' }}>Setup Test Data</button>
      <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
        <div style={{ display: 'flex', gap: '20px' }}>
          {lists.map((list) => (
            <Column
              key={list._id}
              list={list}
              tasks={getCardsByListId(list._id)}
            />
          ))}
        </div>
      </DndContext>
    </div>
  );
};

export default BoardPage;