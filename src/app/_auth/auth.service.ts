import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject } from "rxjs";

import { AuthUser } from "./auth-user.model";

@Injectable({ providedIn: "root" })
export class AuthService {
  endpoint: string = 'http://localhost:3000/api/user';
  private isAuthenticated = false;
  private token: string | undefined;
  private tokenTimer: any;
  private username!:string;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getUsername(){
    return this.username
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createUser(username: string, password: string) {
    const authData: AuthUser = { username: username, password: password };
    this.http
      .post(`${this.endpoint}/signup`, authData)
      .subscribe(() =>{
        this.router.navigate(['/login'])
      }, error =>{
        console.log(error);
        alert(error.error.message)
        this.authStatusListener.next(false);
      });
    }

  login(username: string, password: string) {
    const authData: AuthUser = { username: username, password: password };
    this.http
      .post<{ token: string; expiresIn: number,username:string }>(
        `${this.endpoint}/login`,
        authData
      )
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        if (token) {
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.username =response.username;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          console.log(expirationDate);
          this.saveAuthData(token, expirationDate,this.username);
          this.router.navigate(["/"]);
        }
      });
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  logout() {
    this.token = null || undefined;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(["/"]);
  }

  private setAuthTimer(duration: number) {
    console.log("Setting timer: " + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date,username:string) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
    localStorage.setItem('username',username);
  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("username");
  }

  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    const username = localStorage.getItem("username")
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      username:username,
      expirationDate: new Date(expirationDate)
    }
  }
}
