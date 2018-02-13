import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://burger-builder-5feae.firebaseio.com/'

});

export default axiosInstance;