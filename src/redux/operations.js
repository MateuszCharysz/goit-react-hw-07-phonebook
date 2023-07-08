import { createAsyncThunk } from '@reduxjs/toolkit';
import api, { getPromiseData } from 'js/api';

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

const postContactOnList = createAsyncThunk(
  'contacts/addContact',
  async (data, thunkAPI) => {
    try {
      const response = await getPromiseData(api.mockApiPost(data));
      // console.log(response);
      return response;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);

const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (id, thunkAPI) => {
    try {
      const response = await getPromiseData(api.mockApiDelete(id));
      // console.log(response.data);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);
const operations = { fetchContactsToDisplay, postContactOnList, deleteContact };

export default operations;
