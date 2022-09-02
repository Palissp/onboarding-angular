export interface ExistResponse {
  exists: boolean;
}

export interface Category {
  id: number;
  description: string;
  checked: boolean;
}

export interface createUser {
  name: string;
  email: string;
  password: string;
  categories: number[];
}

export interface createUserResponse {
  status: 'success' | 'error';
  id: string;
}

export interface loginResponse {
  user: {
    userId: string;
    username: string;
  },
  access_token: string;
  tokenType: string;
}
