import { createSlice, nanoid } from '@reduxjs/toolkit';
import operations from './operations';

const contactsInitialState = { contacts: [], isLoading: false, error: null };

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
    [operations.fetchContacts.pending](state) {
      state.isLoading = true;
    },
    [operations.fetchContacts.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.items = action.payload;
    },
    [operations.fetchContacts.rejected](state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

// export const { addContact, deleteContact, replaceContacts } =
//   contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
