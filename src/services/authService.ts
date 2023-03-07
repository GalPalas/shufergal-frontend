import http from "services/httpService";
// import apiUrl from "config.json";

export function login(email: string, password: string) {
  return http.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth`, {
    email,
    password,
  });
}

export function getCurrentUser(id: string) {
  return http.get(`${process.env.REACT_APP_BACKEND_URL}/api/users/${id}`);
}
