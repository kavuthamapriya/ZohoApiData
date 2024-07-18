import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const getAllHolidays = async () => {
  const response = await axios.get(`${API_URL}/getAllHolidays`);
  return response.data;
};

export const retryFailedHoliday = async (holidayId: number) => {
  await axios.post(`${API_URL}/retryFailedHoliday`,{holidayId});
};