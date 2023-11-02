/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

export default async function sendRequest(method: any, url: any, data?: any) {
  try {
    const token =
      typeof window !== 'undefined'
        ? JSON.parse(localStorage.getItem('token') as any)
        : null;

    const accessToken = `Bearer ${token.accessToken}`;

    return await axios({
      method,
      url: `${url}`,
      data,
      headers: {
        Authorization: accessToken,
      },
    });
  } catch (err: any) {
    const errRes = err.response;
    return errRes;
  }
}
