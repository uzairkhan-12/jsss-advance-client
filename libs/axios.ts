// import { decryptData } from "@/utils/localStorage";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

export async function request(options: AxiosRequestConfig) {
  const apiEndpoint: string = process.env.NEXT_PUBLIC_SERVER_PATH as string;
  // let authToken = decryptData("token")?.access?.token;
  const client = axios.create({
    baseURL: apiEndpoint,
    // withCredentials: true,
    // headers: {
    //   Authorization: `Bearer ${authToken}`, // Add the bearer token to the Authorization header
    // },
  });
  const onSucess = (response: AxiosResponse) => {
    const { data } = response;
    return data;
  };
  const onError = (error: AxiosError) => {
    return Promise.reject(error.response);
  };

  return client(options).then(onSucess).catch(onError);
}
