export type ResponseData<T> = {
  operationStatus: 'SUCCESS' | 'ERROR';
  message: string;
  data: T;
};
