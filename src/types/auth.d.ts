export type loginResponse = {
  error: boolean;
  message:
    | string
    | {
        email: string[];
        password: string[];
      };
};
