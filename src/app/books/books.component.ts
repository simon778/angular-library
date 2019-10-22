import { Component, OnInit } from '@angular/core';
import { Book } from '../book';
//import { BOOKS } from '../book_list';
import { BookService } from '../book.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
book:Book;
	books: Book[];
	
add(bookName: string, bookAuthor: string): void {
  bookName = bookName.trim();
  bookAuthor= bookAuthor.trim();
  if (!bookName || !bookAuthor) { return; }
  this.book={
	  name: bookName,
	  author : bookAuthor,
	  id :null
  }
  this.bookService.addBook( this.book)
    .subscribe(book => {
      this.books.push(book);
    });
}
  constructor(private bookService: BookService) {
	  }
	  
getBooks(): void {
  this.bookService.getBooks()
      .subscribe(books => this.books =books);
}
  ngOnInit() {
	    this.getBooks();
  }
 
}
