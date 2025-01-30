const _EMAIL_UNIQUE_ERROR = 'Email ya se encuentra registrado';

export const handleError = async (err: string) => {
  const error_unique = err.includes('unique');
  if (error_unique) {
    return _EMAIL_UNIQUE_ERROR;
  }
};
