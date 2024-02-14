/** @format */

import { Biblioteca } from './app';

window.onload = () => {
  //if (!localStorage.userSigned) localStorage.userSigned = 'null';
};

export const app = new Biblioteca();

// @ts-ignore
window.app = app;
