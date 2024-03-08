import React from 'react';
import './css/ManagerList.css'

function ManagerList({ managers }) {
  return (
    <ul>
      {managers.map((manager) => (
        <li key={manager.id}>
          {manager.name}
        </li>
      ))}
    </ul>
  );
}

export default ManagerList;
