import { Response } from 'express';

const sendResponse = (res: Response, payload: {
  success: boolean,
  message: string,
  data?: any
}) => {
  res.status(200).json(payload);
};

export default sendResponse;
