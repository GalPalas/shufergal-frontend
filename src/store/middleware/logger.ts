const logger = (store: any) => (next: any) => (action: any) => {
  console.log("store", store);
  console.log("store", next);
  console.log("store", action);
  next(action);
};

export default logger;
