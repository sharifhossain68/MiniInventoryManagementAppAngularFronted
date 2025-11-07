import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import {  Observable, throwError } from 'rxjs';

import { catchError } from 'rxjs/operators';

import { Product } from '../models/product';

@Injectable({

  providedIn: 'root'

})

export class ProductService {

  private apiURL = "https://localhost:7224/api";

  httpOptions = {

    headers: new HttpHeaders({

      'Content-Type': 'application/json'

    })

  }

   

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<any> {

    return this.httpClient.get(this.apiURL + '/Products/')

    .pipe(

      catchError(this.errorHandler)

    )

  }

  create(product:Product): Observable<any> {

    return this.httpClient.post(this.apiURL + '/Products/', JSON.stringify(product), this.httpOptions)

    .pipe(

      catchError(this.errorHandler)

    )

  }  

  find(id:number): Observable<any> {

    var data = this.httpClient.get(this.apiURL + '/Products/' + id).pipe( catchError(this.errorHandler))
    console.log(data);
 
    return data

  }

  update(id:number, product:Product): Observable<any> {

    return this.httpClient.put(this.apiURL + '/Products/' + id, JSON.stringify(product), this.httpOptions)

    .pipe( 

      catchError(this.errorHandler)

    )

  }


  delete(id:number){

    return this.httpClient.delete(this.apiURL + '/Products/' + id, this.httpOptions)

  

    .pipe(

      catchError(this.errorHandler)

    )

  }

  errorHandler(error:any) {

    let errorMessage = '';

    if(error.error instanceof ErrorEvent) {

      errorMessage = error.error.message;

    } else {

      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;

    }

    return throwError(errorMessage);

 }
}


