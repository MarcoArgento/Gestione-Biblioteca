import { Book, Category, Table, User } from './declarations';

export class Biblioteca {
  name = 'Biblioteca';

  #user: User = { name: 'null', password: 'null', idBooks: [], books: [], Category: [] }; //this.login('string', 'string');
  #userSigned: Table<User> = {};

  constructor() {
    console.log('Biblioteca created');
    if (!!localStorage.userSigned) this.#userSigned = JSON.parse(localStorage.userSigned);

    if (!!localStorage.user) this.login(localStorage.user, this.#userSigned[localStorage.user].password);
  }

  signup(name: User['name'], password: User['password']) {
    if (name.length == 0 || password.length == 0) throw new Error('Nome utente e password necessari');

    if (!!this.#userSigned[name]) throw new Error('Utente già registrato');

    const newUser = { name: name, password: password, idBooks: [], Category: [], books: [] };
    this.#userSigned[name] = newUser;
    localStorage.userSigned = JSON.stringify(this.#userSigned);

    this.login(name, password);
  }

  login(name: User['name'], password: User['password']) {
    if (name.length == 0 || password.length == 0) throw new Error('Nome utente e password necessari');

    if (!this.#userSigned[name]) throw new Error('Utente non registrato');

    if (this.#user.name != 'null') throw new Error("Hai già fatto l'accesso");

    if (this.#userSigned[name].password != password) throw new Error('Password errata');

    this.#user.name = name;
    this.#user.password = password;
    this.#user.idBooks = this.#userSigned[name].idBooks;
    this.#user.Category = this.#userSigned[name].Category;
    this.#user.books = this.#userSigned[name].books;
    localStorage.user = name;

    console.log('Benvenuto ' + this.#user.name);
  }

  logout(name: User['name']) {
    if (this.#user.name === 'null') throw new Error('Non hai fatto nessun accesso');
    if (name != this.#user.name) throw new Error('Digitare nome corretto per effetuare il logout');

    this.#user.name = 'null';
    this.#user.password = 'null';
    localStorage.user = '';
    localStorage.removeItem('user');
    console.log('Ti sei disconnesso');
  }

  addBook(id: Book['id'], title: Book['title'], author: Book['author'], category: Book['category']) {
    if (this.#user.name === 'null') throw new Error('Non hai fatto nessun accesso');

    const existBook = this.#userSigned[this.#user.name].books.find(book => book.id === id);

    if (!!existBook) throw new Error('Libro già aggiunto');
    const newBook = { id: id, title: title, author: author, category: category };
    this.#userSigned[this.#user.name].books.push(newBook);
    localStorage.userSigned = JSON.stringify(this.#userSigned);

    console.log(`Libro ${title} aggiunto!!`);
  }

  removeBook(id: Book['id']) {
    if (this.#user.name === 'null') throw new Error('Non hai fatto nessun accesso');

    const existBook = this.#userSigned[this.#user.name].books.findIndex(book => book.id === id);

    if (existBook == -1) throw new Error('Libro inesistente');

    this.#userSigned[this.#user.name].books.splice(existBook, 1);
    localStorage.userSigned = JSON.stringify(this.#userSigned);
    console.log('Libro rimosso');
  }

  addCategory(name: Category['name']) {
    if (this.#user.name === 'null') throw new Error('Non hai fatto nessun accesso');

    if (name.length == 0) throw new Error('Inserire nome categoria');
    const categoryFound = this.#userSigned[this.#user.name].Category.find(category => category.name === name);

    if (!!categoryFound) throw new Error('Categoria esistente');

    const newCategory = { name: name };
    this.#userSigned[this.#user.name].Category.push(newCategory);
    localStorage.userSigned = JSON.stringify(this.#userSigned);

    console.log(`Categoria ${name} aggiunta!!`);
  }

  removeCategory(name: Category['name']) {
    if (this.#user.name === 'null') throw new Error('Non hai fatto nessun accesso');

    const existCategory = this.#userSigned[this.#user.name].Category.findIndex(category => category.name === name);
    if (existCategory == -1) throw new Error('Categoria inesistente');
    this.#userSigned[this.#user.name].Category.splice(existCategory, 1);
    localStorage.userSigned = JSON.stringify(this.#userSigned);

    console.log('Categoria rimossa');
  }

  addBooksReads(id: Book['id']) {
    if (this.#user.name === 'null') throw new Error('Non hai fatto nessun accesso');

    const existBook = this.#user.idBooks.find(book => book === id);
    if (!!existBook) throw new Error('Libro già aggiunto');

    this.#user.idBooks.push(id);
    localStorage.userSigned = JSON.stringify(this.#userSigned);

    console.log(`Libro aggiunto!!`);
    console.log(this.#user.idBooks);
  }

  removeBooksReads(id: Book['id']) {
    if (this.#user.name === 'null') throw new Error('Non hai fatto nessun accesso');

    const existBook = this.#user.idBooks.findIndex(book => book === id);
    if (existBook == -1) throw new Error('Libro inesistente');

    this.#user.idBooks.splice(existBook, 1);
    localStorage.userSigned = JSON.stringify(this.#userSigned);

    console.log(`Libro rimosso!!`);
    console.log(this.#user.idBooks);
  }

  showCategory() {
    return this.#userSigned[this.#user.name].Category;
  }

  showBooks() {
    return this.#userSigned[this.#user.name].books;
  }

  showUserSign() {
    return this.#userSigned;
  }
}
