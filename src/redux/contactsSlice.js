import { createSlice, nanoid } from '@reduxjs/toolkit';
import operations from './operations';

const contactsInitialState = { contacts: [], isLoading: false, error: null };

const handlePending = state => state.isLoading = true
const handleRejected = (state, action) => {
  state.isLoading=false;
  state.error=action.payload
}

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactsInitialState,
  // reducers: {
  //   addContact: {
  //     reducer(state, action) {
  //       state.push(action.payload);
  //     },
  //     prepare(formName, formNumber) {
  //       return {
  //         payload: {
  //           id: nanoid(),
  //           name: formName,
  //           number: formNumber,
  //         },
  //       };
  //     },
  //   },
  //   deleteContact(state, action) {
  //     const index = state.findIndex(contact => contact.id === action.payload);
  //     state.splice(index, 1);
  //   },
  //   replaceContacts(state, action) {
  //     return action.payload;
  //   },
  // },
  extraReducers: { //TODO czy zadziała?
    [operations.fetchContactsToDisplay.pending]: handlePending,
    [operations.fetchContactsToDisplay.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.items = action.payload;
    },
    [operations.fetchContactsToDisplay.rejected]: handleRejected,
        [operations.putContactOnList.pending]: handlePending,
    [operations.putContactOnList.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      console.log(action.payload)
      console.log(state.contacts);
            console.log(state.items);
      state.items = action.payload; //TODO do sprawdzenia czy to będzie działać.
    },
    [operations.putContactOnList.rejected]:handleRejected,
  },
});

// export const { addContact, deleteContact, replaceContacts } =
//   contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
