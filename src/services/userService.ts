import http from "services/httpService";
// import apiUrl from "config.json";

export function signUp(name: string, email: string, password: string) {
  return http.post(`${process.env.REACT_APP_BACKEND_URL}/api/users`, {
    name,
    email,
    password,
  });
}
