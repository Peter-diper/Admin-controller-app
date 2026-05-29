import { QueryClient } from "@tanstack/react-query";
import axios from "axios";

export const queryClient = new QueryClient();

export async function getUsers() {
  let url = "http://localhost:3000/users";
  const responce = axios.get(url);
  return responce;
}
