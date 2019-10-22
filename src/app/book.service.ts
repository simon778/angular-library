import { Book } from './book';
//import { BOOKS } from './book_list';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class BookService {
private booksUrl = 'api/books';

/**
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => { 
    console.error(error);  	
    return of(result as T);
  };
}

getBooks(): Observable<Book[]>{
	 return this.http.get<Book[]>(this.booksUrl)
	 .pipe(
		catchError(this.handleError<Book[]>('getBooks', []))
    );
	
}

updateBook (book: Book): Observable<any> {
  return this.http.put(this.booksUrl, book, httpOptions).pipe(
    catchError(this.handleError<any>('updateBook'))
  );
}


addBook (book: Book): Observable<Book> {
  return this.http.post<Book>(this.booksUrl, book, httpOptions).pipe(
    catchError(this.handleError<Book>('addBook'))
  );
}
getBook(id: number): Observable<Book> {
  const url = `${this.booksUrl}/${id}`;
  return this.http.get<Book>(url).pipe(
    catchError(this.handleError<Book>(`getBook id=${id}`))
  );
}

deleteBook (book: Book | number): Observable<Book> {
  const id = typeof book === 'number' ? book : book.id;
  const url = `${this.booksUrl}/${id}`;

  return this.http.delete<Book>(url, httpOptions).pipe(
    catchError(this.handleError<Book>('deleteBook'))
  );
}
  constructor(private http: HttpClient) { }
}