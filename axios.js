import axios from 'axios';
const instance = axios.create({baseURL: 'https://auth-jwt-with-whatsapp-api.herokuapp.com'});
export default instance