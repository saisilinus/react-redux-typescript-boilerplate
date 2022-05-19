import { Middleware, isRejectedWithValue } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { IErrorResponse } from '../modules/common/definitions';
import formatErrorMessage from '../modules/common/utils/formatErrorMessage';

// eslint-disable-next-line import/prefer-default-export
export const rtkQueryErrorLogger: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    toast.error(formatErrorMessage(action.payload.data as IErrorResponse | IErrorResponse['message']));
  }

  return next(action);
};
