export interface User {
  //id: string;
  name: string;
  password: string;
  idBooks: Array<Book['id']>;
  books: Array<Book>;
  Category: Array<Category>;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  category: Category['name'];
}

export interface Category {
  //id: string;
  name: string;
}

export interface Table<T> {
  [key: string]: T;
}
