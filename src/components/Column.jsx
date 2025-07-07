import React from 'react';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import Task from './Task';

const Column = ({ list, tasks }) => {
  const { setNodeRef } = useDroppable({
    id: list._id,
    data: {
      type: 'Column',
    }
  });

  return (
    <div
      ref={setNodeRef}
      style={{
        background: '#333',
        padding: '10px',
        width: '250px',
        borderRadius: '5px',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <h2>{list.title}</h2>
      <div style={{ flexGrow: 1, minHeight: '100px' }}>
        <SortableContext items={tasks.map(t => t._id)} strategy={verticalListSortingStrategy}>
            {tasks.map((task) => (
                <Task key={task._id} task={task} />
            ))}
        </SortableContext>
      </div>
    </div>
  );
};

export default Column;