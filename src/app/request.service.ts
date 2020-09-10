import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators'
  import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  posts: any;
  host = "localhost";

  constructor(private http: HttpClient) {}

  handleError(error: HttpErrorResponse){
    console.log(error.error);
    return throwError(error);
  }

  getPosts(URL: String){
    if(localStorage.getItem('token')){
      const headers = new HttpHeaders().append('Authorization', 'bearer '+  localStorage.getItem('token'));
      let url = 'https://almacen-backend.herokuapp.com/';
      url += URL;
      return this.posts = this.http.get(url,{headers: headers}).pipe(
        catchError(this.handleError)
        );
    }else{
      let url = 'https://almacen-backend.herokuapp.com/';
      url += URL;
      
      console.log(url);
      return this.posts = this.http.get(url);
    }
    
    
  }

  login(username: String, password: String) {
    let response= this.http.post('https://almacen-backend.herokuapp.com/login', 
    {
      "id": username,
      "contrasena": password
    }).pipe(
      catchError(this.handleError)
      );
    console.log(response)
    return response
    //subscribe(val=>(console.log(val)));
  }

  postMethod(URL,data){
    if(localStorage.getItem('token')){
    const headers = new HttpHeaders().append('Authorization', 'bearer '+ localStorage.getItem('token'));
    let url = 'https://almacen-backend.herokuapp.com/';
    url += URL;
    return this.http.post(url,data,{headers: headers}).pipe(
      catchError(this.handleError)
      );
    } else {
      let url = 'https://almacen-backend.herokuapp.com/';
      url += URL;
      return this.http.post(url,data);
    }
  }

  putMethod(URL,data){
    const headers = new HttpHeaders().append('Authorization' ,'bearer '+  localStorage.getItem('token'));
    let url = 'https://almacen-backend.herokuapp.com/';
    url += URL;
    //data=JSON.stringify(data)
    console.log(data);
    return this.http.put(url,data,{headers: headers});
  }

  deleteMethod(URL,data){
    const headers = new HttpHeaders().append('Authorization' ,'bearer '+  localStorage.getItem('token'));
    let url = 'https://almacen-backend.herokuapp.com/';
    url += URL;
    //data=JSON.stringify(data)
    console.log(data);
    return this.http.delete(url,{headers: headers});
  }
}

