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

export type MyLibraryTypes = {
  userId: number;
  progress: number;
};

export type MyLibraryAddTypes = {
  userId: number;
  isbn: string;
  title: string;
  author: string;
  publisher: string;
  img: string;
};

export type MyLibraryModifyTypes = {
  progress: number;
  isbn: number;
  userid: number;
};

export type MyLibraryDeleteType = {
  id: number;
};
