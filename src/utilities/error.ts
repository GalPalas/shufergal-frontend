const getError = (err: any) =>
  err.response && err.response.data ? err.response.data : err.message;

export { getError };
