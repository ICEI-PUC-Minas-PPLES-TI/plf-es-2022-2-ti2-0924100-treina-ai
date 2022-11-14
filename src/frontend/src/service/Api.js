import axios from 'axios';

const api = axios.create({
    baseURL: 'https://sheltered-gorge-29018.herokuapp.com'
});

export default api;