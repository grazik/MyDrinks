export const withRetry = async <T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
): Promise<T> => {
  let lastError: unknown;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (err) {
      console.error(`withRettry ${attempt}:`, err);
      lastError = err;

      if (attempt === maxRetries) break;
    }
  }

  throw new Error(`Operation failed after ${maxRetries} attempts`, {
    cause: lastError,
  });
};
