import http from "services/httpService";

export const getCategories = () => {
  return http.get("http://localhost:5000/api/categories");
};
