import axios from "axios";

// axios.interceptors.response.use(null, (error) => {
//   const expectedError =
//     error.respone && error.respone.status >= 400 && error.respone.status < 500;

//   if (!expectedError) {
//     console.log("logging the error");
//     alert("An unexpected error occurred");
//   }

//   return Promise.reject(error);
// });

const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};

export default http;
