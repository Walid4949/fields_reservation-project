import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function AvailabilityPage() {
  const [field, setField] = useState('Football');
  const [date, setDate] = useState('');
  const [slots, setSlots] = useState([]);
  const location = useLocation();

  useEffect(() => {
    if (date) {
      fetch(`http://localhost:3001/api/availability?field=${field}&date=${date}`)
        .then((response) => response.json())
        .then((data) => setSlots(data.slots))
        .catch((error) => console.error("Error fetching availability:", error));
    }
  }, [field, date]);

  const TIMES = ['09:00', '10:30', '12:00', '13:30', '15:00', '16:30'];

  return (
    <div className="container">
      <h1>Availability</h1>
      <form>
        <select value={field} onChange={(e) => setField(e.target.value)}>
          <option value="Football">Football</option>
          <option value="Basketball">Basketball</option>
        </select>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </form>
      <ul>
        {TIMES.map((time, index) => (
          <li key={time} style={{ color: slots[index] ? 'red' : 'green' }}>
            {time} {slots[index] ? '(Reserved)' : '(Available)'}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AvailabilityPage;