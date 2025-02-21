export type SignupDto = {
  email: string;
  password: string;
};

export type SignupResponseDto = {
  id: string;
  email: string;
  token: string;
};
