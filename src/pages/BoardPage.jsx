import React, { useEffect, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import boardContext from '../context/boardContext';
import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import ListColumn from '../components/ListColumn';
import CardItem from '../components/CardItem';

const AddCardForm = ({ listId }) => {
  const { addCard } = useContext(boardContext);
  const [title, setTitle] = useState('');
  const onChange = (e) => setTitle(e.target.value);
  const onSubmit = (e) => {
    e.preventDefault();
    if (title.trim() !== '') {
      addCard({ title, listId });
      setTitle('');
    }
  };

  return (
    <form onSubmit={onSubmit} style={{ marginTop: '0.5rem' }}>
      <input
        type="text"
        name="title"
        value={title}
        onChange={onChange}
        placeholder="New Card Title"
        style={{ width: '90%' }}
        required
      />
      <button type="submit" style={{ width: '90%', marginTop: '0.5rem' }}>Add Card</button>
    </form>
  );
};

const BoardPage = () => {
  const { currentBoard, lists, cards, getBoardData, addList, moveCard } = useContext(boardContext);
  const { boardId } = useParams();
  const [listName, setListName] = useState('');

  useEffect(() => {
    getBoardData(boardId);
    // eslint-disable-next-line
  }, [boardId]);
  
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event) => {
    const { over, active } = event;
    if (over && active.id !== over.id) {
      moveCard(active.id, over.id);
    }
  };

  const onListNameChange = (e) => setListName(e.target.value);

  const onAddListSubmit = (e) => {
    e.preventDefault();
    if (listName.trim() !== '') {
      addList({ name: listName, boardId: boardId });
      setListName('');
    }
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <h2>{currentBoard && currentBoard.name}</h2>
      
      <form onSubmit={onAddListSubmit} style={{ marginTop: '1rem', marginBottom: '1rem' }}>
        <input
          type="text"
          name="listName"
          value={listName}
          onChange={onListNameChange}
          placeholder="New List Name"
          required
        />
        <input type="submit" value="Add List" />
      </form>

      <hr />

      <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', overflowX: 'auto', paddingBottom: '1rem' }}>
        {lists && lists.length > 0 ? (
          lists.map((list) => (
            <ListColumn key={list._id} id={list._id} name={list.name}>
              {cards && cards
                .filter((card) => card.list === list._id)
                .map((card) => (
                  <CardItem key={card._id} id={card._id} title={card.title} />
                ))}
              <AddCardForm listId={list._id} />
            </ListColumn>
          ))
        ) : (
          <p>This board has no lists yet. Create one!</p>
        )}
      </div>
    </DndContext>
  );
};

export default BoardPage;