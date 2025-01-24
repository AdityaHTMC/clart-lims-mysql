// axios-config.js
import axios from 'axios';

// Add a response interceptor to the default Axios instance
axios.interceptors.response.use(
    (response) => {
        // Pass through successful responses
        return response;
    },
    (error) => {
        // console.log('Error intercepted:', error);
        const href = window.location.href
        // Check for 401 status code
        if (error.response && error.response.status === 401 && !href.includes('/login')) {
            // alert('Session expired. Please log in again.');
            window.location.href = '/#/login' // Reload the page or redirect to login
        }

        // Reject the error so it can still be handled locally if needed
        return Promise.reject(error);
    }
);

export default axios; // Export the default instance for reuse
