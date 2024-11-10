import axios from 'axios';
export const baseURL='http://localhost:8000/api';

interface User{
  username:string,
  email:string,
  password:string,
  first_name:string,
  last_name:string,
  code:string,
  escuela:number
}

const registerApi = axios.create({
  baseURL: `${baseURL}/register` 
});

export const createUser = (user:User) => {
  return registerApi.post('/', user);
};
