import http from "services/httpService";

export const getCategories = () => {
  return http.get(`${process.env.REACT_APP_BACKEND_URL}/api/categories`);
};
