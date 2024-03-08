import React, { useState } from 'react'
import './css/RatingForm.css'

function RatingForm({onSubmit}) {
    const [rating,setRating] = useState('');

    const handleSubmit = (e) =>{
        e.preventDefault();
        onSubmit({rating});
        setRating('');
    };
  return (
    <form onSubmit={handleSubmit}>
        <label>
            Rating (1-5);
            <input type="number" min="1" max="5" value={rating} onChange={(e) => setRating(e.target.value)} />
        </label>
        <button type="submit">Submit</button>
    </form>
  );
}

export default RatingForm;
