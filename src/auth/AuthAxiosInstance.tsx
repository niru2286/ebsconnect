import axios from 'axios';
import { data } from 'react-router-dom';

const AuthAxiosInstance = axios.create({
  baseURL: 'http://localhost:13179/api/', // Base URL for your API
  headers: {
    'Content-Type': 'application/json'
  }
});

export const forgotPassword = async (emailid: any) => {
  try {
    debugger
    const response = await AuthAxiosInstance.post('auth/forgot-password', {
      Email: emailid
    });
    return response;
  } catch (error) {
    console.error('Error during sending otp:', error);
    throw error;

  }
};

export default AuthAxiosInstance;