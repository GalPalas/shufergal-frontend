import http from "services/httpService";

export const getProducts = () => {
  return http.get(`${process.env.REACT_APP_BACKEND_URL}/api/products`);
};
