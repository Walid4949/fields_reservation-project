import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ReservationPage({ user }) {
  const [field, setField] = useState('Football');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please register first!");
      return;
    }
    fetch("http://localhost:3001/api/reserve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: user.username, field, date, time }),
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        setMessage("Reservation done!");
        setTimeout(() => navigate("/availability"), 2000);
      } else {
        alert(data.error);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Failed to reserve");
    });
  };

  return (
    <div className="container">
      <h1>Reserve a Field</h1>
      {message && <p className="success">{message}</p>}
      <form onSubmit={handleSubmit}>
        <select value={field} onChange={(e) => setField(e.target.value)}>
          <option value="Football">Football</option>
          <option value="Basketball">Basketball</option>
        </select>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
        <button type="submit">Reserve</button>
      </form>
    </div>
  );
}

export default ReservationPage;