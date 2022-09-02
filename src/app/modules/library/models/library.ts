export interface Book {
  id: string;
  public: boolean;
  author: string;
  resume: string;
  title: string;
  subtitle: string;
  image: string;
  url: string;
  category: Array<number>;
  userRegister: string;
}

export interface SearchBooks {
  count: number;
  items: Book[];
}

export interface UserInfo {
  userId: string;
  username: string;
}
