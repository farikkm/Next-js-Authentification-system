export type TokenDataType = {
  id: string;
  username: string;
  email: string;
};

export type UserDataType = {
  _id: string;
  username: string;
  email: string;
  password?: string;
  isVerified?: boolean;
  isAdmin?: boolean;
};
