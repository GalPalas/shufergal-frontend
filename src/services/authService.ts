import http from "services/httpService";
// import apiUrl from "config.json";

export function login(email: string, password: string) {
  return http.post("http://localhost:5000/api/auth", { email, password });
}

export function getCurrentUser(id: string) {
  return http.get(`http://localhost:5000/api/users/${id}`);
}
