// this utils file is created to handle async functions in a better way
// instead of using try catch block in every async function
// we can use this asyncHandler to wrap the async function and it will handle the error for us
// and pass it to the global error handler middleware

const asyncHandler = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

export { asyncHandler };
