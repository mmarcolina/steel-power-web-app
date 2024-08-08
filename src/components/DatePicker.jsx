import React, { useState, useEffect } from 'react';

const DatePicker = ({ label, selectedDate, onDateChange }) => {
  const [month, setMonth] = useState(selectedDate ? new Date(selectedDate).getMonth() + 1 : '');
  const [day, setDay] = useState(selectedDate ? new Date(selectedDate).getDate() + 1 : '');
  const [year, setYear] = useState(selectedDate ? new Date(selectedDate).getFullYear() : '');

  useEffect(() => {
    if (selectedDate) {
      const date = new Date(selectedDate);
      setMonth(date.getMonth() + 1);
      setDay(date.getDate() + 1);
      setYear(date.getFullYear());
    }
  }, [selectedDate]);

  const handleMonthChange = (e) => {
    const newMonth = Number(e.target.value);
    setMonth(newMonth);
    if (newMonth && day && year) updateDate(newMonth, day, year);
  };

  const handleDayChange = (e) => {
    const newDay = Number(e.target.value);
    setDay(newDay);
    if (month && newDay && year) updateDate(month, newDay, year);
  };

  const handleYearChange = (e) => {
    const newYear = Number(e.target.value);
    setYear(newYear);
    if (month && day && newYear) updateDate(month, day, newYear);
  };

  const updateDate = (m, d, y) => {
    const formattedDate = `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    onDateChange(formattedDate);
  };

  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

  return (
    <div className = "date-picker">
      <label>{label}</label>
      <div>
        <select value={month} onChange={handleMonthChange}>
          <option value="" disabled>MM</option>
          {months.map(m => (
            <option key={m} value={m}>
              {String(m).padStart(2, '0')}
            </option>
          ))}
        </select>
        <select value={day} onChange={handleDayChange}>
          <option value="" disabled>DD</option>
          {days.map(d => (
            <option key={d} value={d}>
              {String(d).padStart(2, '0')}
            </option>
          ))}
        </select>
        <select value={year} onChange={handleYearChange}>
          <option value="" disabled>YYYY</option>
          {years.map(y => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default DatePicker;
