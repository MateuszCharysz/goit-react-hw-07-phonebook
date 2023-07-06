import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "js/api";

const fetchContacts = createAsyncThunk('contacts/fetchAll', async (_,thunkAPI)=> {
    try{
    const response =await api.mockApiGet()
    console.logO(response)
    return response.data} catch (e) {
        return thunkAPI.rejectWithValue(e.message)
    }
})

const addContacts = createAsyncThunk('contacts/')
const operations = {fetchContacts, addContacts}

export default operations