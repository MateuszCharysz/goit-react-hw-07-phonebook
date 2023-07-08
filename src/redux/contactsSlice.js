import { createSlice, nanoid } from '@reduxjs/toolkit';
import operations from './operations';
// import { fetchContactsToDisplay } from './operations';

const contactsInitialState = { contacts: [], isLoading: false, error: null };

const handlePending = state => {
  console.log('slice pending');
  state.isLoading = true;
};
const handleRejected = (state, action) => {
  console.log('rejected');
  console.log(action);
  state.isLoading = false;
  state.error = action.payload;
};

const handleFulfiledPartly = state => {
  state.isLoading = false;
  state.error = null;
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactsInitialState,
  extraReducers: {
    [operations.fetchContactsToDisplay.pending]: handlePending,
    [operations.fetchContactsToDisplay.fulfilled](state, action) {
      console.log(action.payload);
      handleFulfiledPartly(state);
      state.contacts = action.payload;
    },
    [operations.fetchContactsToDisplay.rejected]: handleRejected,
    [operations.postContactOnList.pending]: handlePending,
    [operations.postContactOnList.fulfilled](state, action) {
      handleFulfiledPartly(state);
      console.log(action.payload);
      state.contacts.push(action.payload);
    },
    [operations.postContactOnList.rejected]: handleRejected,
    [operations.deleteContact.pending]: handlePending,
    [operations.deleteContact.fulfilled](state, action) {
      handleFulfiledPartly(state);
      const index = state.contacts.findIndex(
        contact => contact.id === action.payload.id,
      );
      state.contacts.splice(index, 1);
    },
    [operations.deleteContact.rejected]: handleRejected,
  },
});

// export const { addContact, deleteContact, replaceContacts } =
//   contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
export const createId=nanoid()
