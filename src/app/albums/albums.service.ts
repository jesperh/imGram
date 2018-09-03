import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AlbumsService {

  baseUrl = environment.baseApiUrl + "album/";

  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Client-ID ${environment.clientId}`
    })
  };

  constructor( private http: HttpClient) { }

  getAlbum(id: string) {
    const url = `${this.baseUrl}${id}`;
    return this.http.get(url, this.httpOptions);
  }
}
