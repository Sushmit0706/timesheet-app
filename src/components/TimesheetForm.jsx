import React, { useState } from 'react'
import './css/TimesheetForm.css'

function TimesheetForm({ onSubmit ,disabled }) {
    const[date,setDate]= useState('');
    const[hoursWorked, setHoursWorked] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ date, hoursWorked});
        setDate('');
        setHoursWorked('');
    };
  return (
    <form onSubmit = {handleSubmit} disabled={disabled}>
        <label>
            Date:
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </label>
        <label>
            Hours Worked:
            <input type="number" value={hoursWorked} onChange={(e) => setHoursWorked(e.target.value)} />
        </label>
        <button type="submit">Submit</button>
    </form>
  );
}

export default TimesheetForm
