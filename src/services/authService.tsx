import axios from "axios";

const API_URL = "https://your-api.com"; // Replace with your backend API

// Save token in localStorage
export const setToken = (token: string) => {
  localStorage.setItem("token", token);
};

// Get token
export const getToken = () => {
  return localStorage.getItem("token");
};

// Remove token on logout
export const removeToken = () => {
  localStorage.removeItem("token");
};

// Check if user is authenticated
export const isAuthenticated = () => {
  const token = getToken();
  return token ? true : false;
};


// Login function
export const login = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    setToken(response.data.token);
    return true;
  } catch (error) {
    console.error("Login failed", error);
    return false;
  }
};

// Logout function
export const logout = () => {
  removeToken();
  window.location.href = "/login"; // Redirect to login
};
