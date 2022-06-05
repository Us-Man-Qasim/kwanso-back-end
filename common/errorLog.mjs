function errorLog(message, status) {
  const error = new Error(message);
  if (status) error.status = status;
  throw error;
}

export { errorLog };
