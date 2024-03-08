import React, { useState, useEffect } from 'react';
import './App.css';

import axios from 'axios';
import EmployeeList from './components/EmployeeList';
import ManagerList from './components/ManagerList';
import TimesheetForm from './components/TimesheetForm';
import RatingForm from './components/RatingForm';

function App() {
  const [employees, setEmployees] = useState([]);
  const [managers, setManagers] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [timesheet, setTimesheet] = useState({});
  const [rating, setRating] = useState(0);

  useEffect(() => {
    fetchEmployees();
    fetchManagers();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:3001/employees');
      setEmployees(response.data);
    } catch (error) {
      console.error('Failed to fetch employees:', error);
    }
  };

  const fetchManagers = async () => {
    try {
      const response = await axios.get('http://localhost:3001/managers');
      setManagers(response.data);
    } catch (error) {
      console.error('Failed to fetch managers:', error);
    }
  };

  const handleEmployeeSelect = (employee) => {
    setSelectedEmployee(employee);
    fetchTimesheet(employee.id);
  };

  const fetchTimesheet = async (employeeId) => {
    try {
      const response = await axios.get(`http://localhost:3001/timesheet/${employeeId}`);
      setTimesheet(response.data);
    } catch (error) {
      console.error('Failed to fetch timesheet:', error);
    }
  };

  // const handleTimesheetSubmit = async (data) => {
  //   const { date, hoursWorked } = data;
  //   try {
  //     await axios.post('http://localhost:3001/timesheet', {
  //       employeeId: selectedEmployee.id,
  //       date: date,
  //       hoursWorked: hoursWorked,
  //     });
  //     fetchTimesheet(selectedEmployee.id);
  //   } catch (error) {
  //     console.error('Failed to submit timesheet:', error);
  //   }
  // };
  const handleTimesheetSubmit = async (data) => {
    const { date, hoursWorked } = data;
    if (!selectedEmployee) {
      console.error('No employee selected');
      return;
    }
    try {
      await axios.post('http://localhost:3001/timesheet', {
        employeeId: selectedEmployee.id,
        date: date,
        hoursWorked: hoursWorked,
      });
      fetchTimesheet(selectedEmployee.id);
    } catch (error) {
      console.error('Failed to submit timesheet:', error);
    }
  };
  

  const handleRatingSubmit = async (data) => {
    try {
      await axios.post('http://localhost:3001/ratings', {
        employeeId: selectedEmployee.id,
        rating: data.rating,
      });
      fetchTimesheet(selectedEmployee.id);
    } catch (error) {
      console.error('Failed to submit rating:', error);
    }
  };

  return (
    <div>
      <h1>Timesheet Application</h1>
      <h2>Employees</h2>
      <EmployeeList employees={employees} onSelect={handleEmployeeSelect} />

      <h2>Managers</h2>
      <ManagerList managers={managers} />
      {selectedEmployee && (
        <div>
          <h3>Timesheet for {selectedEmployee.name}</h3>
          <TimesheetForm onSubmit={handleTimesheetSubmit} disabled={Object.keys(timesheet).length > 0} />
          <ul>
            {Object.entries(timesheet).map(([date, hoursWorked]) => (
              <li key={date}>
                {date}: {hoursWorked} hours
              </li>
            ))}
          </ul>
          <RatingForm onSubmit={handleRatingSubmit} />
        </div>
      )}
    </div>
  );
}

export default App;
