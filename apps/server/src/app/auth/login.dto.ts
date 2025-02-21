export type LoginDto = {
  email: string;
  password: string;
};

export type LoginResponseDto = {
  id: string;
  email: string;
  token: string;
};
