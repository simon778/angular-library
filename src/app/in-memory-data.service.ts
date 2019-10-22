import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Book } from './book';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const books = [
	{ id: 20, name: 'Angular 7',  author: "John Smith" },
      { id: 12, name: 'JavaScript', author: "John Locke"},
      { id: 13, name: 'Angular',    author: "Ben Smith"},
      { id: 14, name: 'TypeScript', author: "John Black"},
      { id: 15, name: 'CSS',        author: "John Red"},
      { id: 16, name: 'Bootstrap 4',author: "John Gray"},    
      { id: 19, name: 'HTTP' ,      author: "Ben Red"},
      { id: 11, name: 'Java' ,      author: "John Smith"}
    ];
    return {books};
  }

  genId(books: Book[]): number {
    return books.length > 0 ? Math.max(...books.map(book => book.id)) + 1 : 11;
  }
}