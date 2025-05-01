const API_VERSION = "v1";
export const BASE_URL = `http://localhost:8000/api/${API_VERSION}`;

export const URLS = {
  AUTH: {
    LOGIN: `/auth/login/`,
    REFRESH: `/auth/refresh/`,
    USER: `/user/me/`,
  },
};
