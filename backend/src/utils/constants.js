// Array of available time slots from 9:00 to 16:30 in 1.5-hour increments
  const TIMES = Array.from({ length: 9 }, (_, i) => {
    const hour = 9 + Math.floor(i * 1.5);
    const min = i % 2 === 0 ? '00' : '30';
    return `${hour.toString().padStart(2, '0')}:${min}`;
  });

  module.exports = { TIMES };