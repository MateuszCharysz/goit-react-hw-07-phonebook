import { createAsyncThunk } from '@reduxjs/toolkit';
import api, {getPromiseData} from 'js/api';

export const fetchContactsToDisplay = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await getPromiseData(api.mockApiGet());
      // console.log('all');
      // console.logO(response);
      return response;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);

const putContactOnList = createAsyncThunk('contacts/', async (id, thunkAPI) => {
  try {
    const response = await api.mockApiPut(id);
    console.log('id contact');
    console.logO(response);
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message);
  }
});
const operations = { fetchContactsToDisplay, putContactOnList };

export default operations;
