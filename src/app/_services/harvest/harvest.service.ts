import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Harvest } from '../../_models/harvest';

@Injectable({
  providedIn: 'root'
})
export class HarvestService {
  private harvests: Harvest[] = [];
  endpoint: string = 'http://localhost:3000/api/harvest';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient,private router: Router) { }
    // Add Harvest
   AddHarvest(season:string,year:Number,
    city:String,crops:Array<String>) {
    const harvest: Harvest = { season:season,year:year,
    city:city,crops:crops};
    this.http
      .post<{ message: string; id: string }>(
        `${this.endpoint}/add-harvest`,
        harvest
      )
      .subscribe(responseData => {
        this.harvests.push(harvest);
        this.router.navigate(["/harvest-view"]);
      });
  }

    // Get all Harvest
  GetHarvests() {
    return this.http.get(`${this.endpoint}`);
  }

   // Get Harvest
   GetHarvest(id:string): Observable<any> {
    let API_URL = `${this.endpoint}/read-harvest/${id}`;
    return this.http.get(API_URL, { headers: this.headers })
      .pipe(
        map((res: any) => {
          return res || {} 
        }),
        catchError(this.errorMgmt)
      )
  }

   // Delete harvest
   DeleteHarvest(id:string): Observable<any> {
    var API_URL = `${this.endpoint}/delete-harvest/${id}`;
    return this.http.delete(API_URL)
      .pipe(
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
