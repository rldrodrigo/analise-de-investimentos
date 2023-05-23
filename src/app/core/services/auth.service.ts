import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url: string = environment.api;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  public sign(payload: {email: string, password: string}): Observable<any> {

    return this.http.post<{token: string}>(`http://35.247.195.146:5000/api/user/login`, payload).pipe(
      map( (res: any) => {
        localStorage.removeItem('access_token');
        localStorage.setItem('access_token', JSON.stringify(res._id));
        return this.router.navigate(['admin']);
      }),
      catchError((e: any) => {
        if(e.error) {
          return throwError(e.error.error);
        }

        return throwError("Servidor não está respondendo.");
      })
    )
  }

  public signup(payload: {name: string, email: string, password: string, confirmPassword: string}): Observable<any> {

    return this.http.post<{token: string}>(`${this.url}/user/signup`, payload).pipe(
      map( (res: any) => {
        localStorage.removeItem('access_token');
        localStorage.setItem('access_token', JSON.stringify(res._id));
        return this.router.navigate(['admin']);
      }),
      catchError((e: any) => {
        if(e.error) {
          return throwError(e.error.error);
        }

        return throwError("Servidor não está respondendo.");
      })
    )
  }

  public logout() {
    localStorage.removeItem('access_token');

    return this.http.get(`${this.url}/user/signout`)
      .toPromise()
      .then((res: any) => {
        localStorage.removeItem('access_token');
        this.router.navigate(['']);
        return res;
      })
      .catch((error: Response) => error);
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem("access_token");

    if(token) {
      return true;
    }

    return false;
  }

}
