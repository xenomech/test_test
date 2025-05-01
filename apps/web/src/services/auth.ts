import { BASE_URL, URLS } from "@/constants/urls";
import api from "@/lib/api";

export const loginApi = ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => api.post(`${BASE_URL}${URLS.AUTH.LOGIN}`, { username, password });

export const refreshTokenApi = (refreshToken: string) =>
  api.post(`${BASE_URL}${URLS.AUTH.REFRESH}`, { refresh: refreshToken });

export const getUserApi = () => api.get(`${BASE_URL}${URLS.AUTH.USER}`);
