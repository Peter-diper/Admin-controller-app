import { QueryClient } from "@tanstack/react-query";
import axios from "axios";

export const queryClient = new QueryClient();

export async function getUsers() {
  let url = "http://localhost:3000/users";
  const responce = await axios.get(url);
  return responce;
}
export async function createUser(data) {
  let url = "http://localhost:3000/users";
  const responce = await axios.post(url, data);
  return responce;
}

export async function deleteUser(id) {
  console.log(id);

  let url = "http://localhost:3000/users/";
  const responce = await axios.delete(url + id);
  return responce;
}
export async function getUser({ id }) {
  let url = "http://localhost:3000/users/";
  const responce = await axios.get(url + id);

  return responce;
}

export async function editUser({ userId, userData }) {
  console.log(userId, userData);

  let url = "http://localhost:3000/users/";
  const responce = await axios.put(url + userId, userData);
  return responce;
}
