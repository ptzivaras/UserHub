import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/users';

export const getAllUsers = (config = {}) => axios.get(BASE_URL, config);

export const getUserById = (id, config = {}) => axios.get(`${BASE_URL}/${id}`, config);

export const createUser = (userData) => axios.post(BASE_URL, userData);

export const deleteUser = (id) => axios.delete(`${BASE_URL}/${id}`);