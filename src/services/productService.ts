import http from "services/httpService";

export const getProducts = () => {
  return http.get("http://localhost:5000/api/products");
};
