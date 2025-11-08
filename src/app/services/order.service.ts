import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import {  Observable, throwError } from 'rxjs';

import { catchError } from 'rxjs/operators';

import { Order } from '../models/order';

@Injectable({

  providedIn: 'root'

})

export class OrderService {

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
  
  getAllOrder(): Observable<any> {

    return this.httpClient.get(this.apiURL + '/Orders/')

    .pipe(

      catchError(this.errorHandler)

    )

  }
  
  
  getAllItems(id:number): Observable<any> {

    return this.httpClient.get(this.apiURL + '/Orders/'+id)

    .pipe(

      catchError(this.errorHandler)

    )

  }
  create(order:Order): Observable<any> {

    return this.httpClient.post(this.apiURL + '/Orders/', JSON.stringify(order), this.httpOptions)

    .pipe(

      catchError(this.errorHandler)

    )

  }  

  find(id:number): Observable<any> {

    var data = this.httpClient.get(this.apiURL + '/Orders/' + id).pipe( catchError(this.errorHandler))
    console.log(data);
 
    return data

  }

  update(id:number, statusId :number): Observable<any> {

    return this.httpClient.put(this.apiURL + '/Orders/' + id, JSON.stringify(statusId), this.httpOptions)

    .pipe( 

      catchError(this.errorHandler)

    )

  }


  delete(id:number){

    return this.httpClient.delete(this.apiURL + '/Orders/' + id, this.httpOptions)

  

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



