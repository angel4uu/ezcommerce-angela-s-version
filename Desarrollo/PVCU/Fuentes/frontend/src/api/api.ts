import axios from 'axios';
export const baseURL='http://localhost:8000';

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
  baseURL: `${baseURL}/usuarios` 
});

export const createUser = (user:User) => {
  return registerApi.post('/', user);
};
