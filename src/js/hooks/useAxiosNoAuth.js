import axios from "axios";
import { BASE_URL } from "../constants/api";

const url = BASE_URL;

export default function useAxiosNoAuth() {
  const apiClient = axios.create({
    baseURL: url,
  });

  return apiClient;
}
