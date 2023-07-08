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
  extraReducers: {
    //TODO czy zadziała?
    [operations.fetchContactsToDisplay.pending]: handlePending,
    [operations.fetchContactsToDisplay.fulfilled](state, action) {
      console.log(action.payload);
      handleFulfiledPartly(state);
      state.contacts = action.payload;
    },
    [operations.fetchContactsToDisplay.rejected]: handleRejected,
    [operations.putContactOnList.pending]: handlePending,
    [operations.putContactOnList.fulfilled](state, action) {
      handleFulfiledPartly(state);
      state.contacts = action.payload; //TODO do sprawdzenia czy to będzie działać.
    },
    [operations.putContactOnList.rejected]: handleRejected,
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
