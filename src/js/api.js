import axios from 'axios';

const API_ID = '64a31d40b45881cc0ae625d4';

const errorHandler = error => {
  if (error.response.status === 400) {
    alert("We're sorry, but you've reached the end of search results.");
  } else if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error', error.message);
  }
  console.log(error.config);
};

const mockApi = axios.create({
  baseURL: `https://${API_ID}.mockapi.io`,
  timeout: 10000,
});

const mockApiGet = async () => {
  const response = await mockApi.get('/contacts').catch(errorHandler());
  return response;
};
const mockApiGetId = async id => {
  const response = await mockApi.get(`/contacts/${id}`).catch(errorHandler());
  return response;
};

const mockApiPost = async () => {
  const response = await mockApi.post('/contacts/').catch(errorHandler());
  return response;
};

const mockApiPut = async id => {
  const response = await mockApi.put(`/contacts/${id}`).catch(errorHandler());
  return response;}

const mockApiDelete = async id => {
  const response = await mockApi.delete(`/contacts/${id}`).catch(errorHandler());
  return response;
};
// const api = 'https://64a31d40b45881cc0ae625d4.mockapi.io/:endpoint'

//ENDPOINTS
//GET /contacts /contacts/:id
//POST /contacts
//PUT /contacts/:id
//DELETE /contacts/:id
const api = {mockApiGet, mockApiGetId, mockApiPost, mockApiPut, mockApiDelete}


export default api