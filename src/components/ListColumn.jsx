import React from 'react';
import { useDroppable } from '@dnd-kit/core';

const ListColumn = ({ id, name, children }) => {
  const { setNodeRef } = useDroppable({
    id: id,
  });

  return (
    <div 
      ref={setNodeRef} 
      style={{ background: '#f0f0f0', padding: '1rem', minWidth: '275px', borderRadius: '5px' }}
    >
      <h4>{name}</h4>
      <hr />
      {children}
    </div>
  );
};

export default ListColumn;