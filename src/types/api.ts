export type SignInTypes = {
  email: string;
  password: string;
};

export type SignUpTypes = {
  email: string;
  username: string;
  password: string;
  nick: string;
};

export type ChangeNickTypes = {
  nick: string;
  id: number;
};

export type ChangePasswordTypes = {
  email: string;
  password: string;
};

export type RemoveUserTypes = {
  id: number;
  password: string;
};
