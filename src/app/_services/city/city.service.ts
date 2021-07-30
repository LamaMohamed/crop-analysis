import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  endpoint: string = 'http://localhost:3000/api/city';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) { }
   
    // Get all City
  GetCities() {
    return this.http.get(`${this.endpoint}`);
  }

   // Get City
   GetCity(id:any): Observable<any> {
    let API_URL = `${this.endpoint}/read-city/${id}`;
    return this.http.get(API_URL, { headers: this.headers })
      .pipe(
        map((res: any) => {
          return res || {} 
        }),
        catchError(this.errorMgmt)
      )
  }


   // Error handling 
errorMgmt(error: HttpErrorResponse) {
  let errorMessage = '';
  if (error.error instanceof ErrorEvent) {
    // Get client-side error
    errorMessage = error.error.message;
  } else {
    // Get server-side error
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  }
  console.log(errorMessage);
  return throwError(errorMessage);
}
    

}
