import { fromEventPattern } from "rxjs";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global';
import { User } from '../models/user';
import { Observable } from 'rxjs';


@Injectable()
export class UserService{
    public url: string;

    constructor(public _http: HttpClient){
        this.url = GLOBAL.url;
    }

    register(user: User): Observable<any> {
        let params = JSON.stringify(user);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.post(this.url+'user/'+'register', params, {headers:headers});
    }
    signup(user: User, gettoken = null): Observable<any> {

        if(gettoken != null){
            user.gettoken = gettoken;
        }
        let params = JSON.stringify(user);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.post(this.url+'user/'+'login', params, {headers:headers});
    }
}