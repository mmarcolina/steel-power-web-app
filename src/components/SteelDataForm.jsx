import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from './DatePicker';

const SteelDataForm = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [weekStatus, setWeekStatus] = useState('');
  const [dayOfWeek, setDayOfWeek] = useState('');
  const [loadType, setLoadType] = useState('');
  const [operations, setOperations] = useState([]);
  const [responseData, setResponseData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const params = {
      StartDate: startDate ? new Date(startDate).toISOString().split('T')[0] : '2018-01-01',
      EndDate: endDate ? new Date(endDate).toISOString().split('T')[0] : '2018-12-31',
      WeekStatus: weekStatus,
      Day_of_week: dayOfWeek,
      Load_Type: loadType,
      Operation: operations
    };

    const queryString = Object.keys(params)
      .map(key => {
        if (params[key] === null || params[key] === '' || (Array.isArray(params[key]) && params[key].length === 0)) {
          return null;
        }
        if (Array.isArray(params[key])) {
          return params[key].map(val => `${key}=${encodeURIComponent(val)}`).join('&');
        }
        return `${key}=${encodeURIComponent(params[key])}`;
      })
      .filter(param => param !== null)
      .join('&');

    const url = `https://localhost:44358/api/energy?${queryString}`;

    console.log('Request URL:', url);

    try {
      const response = await axios.get(url);
      console.log('Response: ', response.data);
      setResponseData(response.data);
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  //   try {
  //     const response = await axios.get('https://localhost:44358/api/energy?', { params });
  //     console.log('Response: ', response.data);
  //     setResponseData(response.data);
  //   } catch (error) {
  //     console.error('Error submitting data:', error);
  //   }
  // };

  const handleOperationChange = (e) => {
    const { value } = e.target;
    setOperations((prev) => 
      prev.includes(value) ? prev.filter((op) => op !== value) : [...prev, value]
    );
  };

  const formatResponseData = (data) => {
    return Object.keys(data).map(key => (
      <div key={key} className="response-item">
        <strong>{key}:</strong> <span>{JSON.stringify(data[key])}</span>
      </div>
    ));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Submit Steel Data</h2>
        <DatePicker label="Start Date" selectedDate={startDate} onDateChange={setStartDate} />
        <DatePicker label="End Date" selectedDate={endDate} onDateChange={setEndDate} />
        
        <div>
          <label>
            Week Status:
            <select value={weekStatus} onChange={e => setWeekStatus(e.target.value)}>
              <option value="" disabled>Select Week Status</option>
              <option value="Weekday">Weekday</option>
              <option value="Weekend">Weekend</option>
            </select>
          </label>
        </div>
        
        <div>
          <label>
            Day of Week:
            <select value={dayOfWeek} onChange={e => setDayOfWeek(e.target.value)}>
              <option value="" disabled>Select Day of Week</option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
            </select>
          </label>
        </div>
        
        <div>
          <label>
            Load Type:
            <select value={loadType} onChange={e => setLoadType(e.target.value)}>
              <option value="" disabled>Select Load Type</option>
              <option value="Light_Load">Light Load</option>
              <option value="Medium_Load">Medium Load</option>
              <option value="Maximum_Load">Maximum Load</option>
            </select>
          </label>
        </div>
        
        <div>
          <label>Operations:</label>
          <div>
            <label>
              <input
                type="checkbox"
                value="sum"
                checked={operations.includes("sum")}
                onChange={handleOperationChange}
              />
              Sum
            </label>
            <label>
              <input
                type="checkbox"
                value="mean"
                checked={operations.includes("mean")}
                onChange={handleOperationChange}
              />
              Average
            </label>
            <label>
              <input
                type="checkbox"
                value="median"
                checked={operations.includes("median")}
                onChange={handleOperationChange}
              />
              Median
            </label>
            <label>
              <input
                type="checkbox"
                value="min"
                checked={operations.includes("min")}
                onChange={handleOperationChange}
              />
              Minimum
            </label>
            <label>
              <input
                type="checkbox"
                value="max"
                checked={operations.includes("max")}
                onChange={handleOperationChange}
              />
              Maximum
            </label>
          </div>
        </div>
        
        <button type="submit">Submit</button>
      </form>

      {responseData && (
        <div className="response-data">
          <h3>Results:</h3>
          {formatResponseData(responseData)}
          {/* <pre>{JSON.stringify(responseData, null, 2)}</pre> */}
        </div>
      )}
    </div>
  );
};

export default SteelDataForm;
