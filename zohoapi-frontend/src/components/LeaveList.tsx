import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./styles/LeaveList.css";

interface HolidayApiData {
  id: number;
  locationId: number;
  Name: string;
  Remarks: string;
  status: string;
  retryCount: number;
}

const App: React.FC = () => {
  const [holiday, setHoliday] = useState<HolidayApiData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchHolidays();
  }, []);

  const fetchHolidays = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/leave');
      const data = response.data;
      if (Array.isArray(data)) {
        setHoliday(data);
      } else {
        setError('Invalid data format received from API');
      }
    } catch (error) {
      console.error('Error fetching holiday data:', error);
      setError('Failed to fetch holiday data');
    } finally {
      setLoading(false);
    }
  };

  const retryHoliday = async (id: number) => {
    try {
      const response = await axios.post(`/retryHoliday/${id}`); 
      const updatedHoliday = response.data;
      setHoliday((prevHoliday) =>
        prevHoliday.map((holiday) =>
          holiday.id === updatedHoliday.id ? updatedHoliday : holiday
        )
      );
    } catch (error) {
      console.error('Error retrying holiday data:', error);
      setError('Failed to retry holiday data');
    }
  };

  if (loading) {
    return <div className='loading'>Fetching Data...</div>;
  }

  if (error) {
    return <div className='loading'>Error: {error}</div>;
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Location ID</th>
            <th>Name</th>
            <th>Remarks</th>
            <th>Status</th>
            <th>Action</th>
            <th>Retry Count</th>
          </tr>
        </thead>
        <tbody>
          {holiday.map((holiday) => (
            <tr key={holiday.id}>
              <td>{holiday.id}</td>
              <td>{holiday.locationId}</td>
              <td>{holiday.Name}</td>
              <td>{holiday.Remarks}</td>
              <td>{holiday.status}</td>
              <td>
                {holiday.status === 'Failed' && holiday.retryCount < 5 && (
                  <button onClick={() => retryHoliday(holiday.id)}>Retry</button>
                )}
                {holiday.retryCount >= 5 && <span>Maximum retry count reached</span>}
              </td>
              <td>{holiday.retryCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;