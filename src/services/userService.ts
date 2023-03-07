import http from "services/httpService";
// import apiUrl from "config.json";

export function signUp(name: string, email: string, password: string) {
  return http.post("http://localhost:5000/api/users", {
    name,
    email,
    password,
  });
}
