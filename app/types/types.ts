/* eslint-disable @typescript-eslint/no-explicit-any */
export type ProductDatatype = {
  name: string;
  description?: string;
  price: string;
  photos?: File | any;
  askForPrice?: boolean;
  desc?: string | any;
  poster?: File | any;
};
export type ProductTabTypes = {
  _id?: string | any;
  name?: string | any;
  desc?: string | any;
  price?: string | any;
  poster?: string | any;
};
export type StatesDataTypes = {
  name: string;
  value: string;
  change: string;
  changeType: string;
};
export type EditProductData = {
  photos?: string;
  description?: string;
  desc?: string;
  _id?: 1;
  name?: string;
  price?: string;
  userId?: string;
  poster: File | any;
};
