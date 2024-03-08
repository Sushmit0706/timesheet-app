import React from 'react';
import './css/EmployeeList.css';


function EmployeeList({ employees , onSelect }) {
  return (
  <ul>
    {employees.map((employee) => (
      <li key={employee.id} onClick={() => onSelect(employee)}>
        {employee.name}
      </li>
    ))}
  </ul>
  );
}

export default EmployeeList;