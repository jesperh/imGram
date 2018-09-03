import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  baseUrl = environment.baseApiUrl + "image/";

  constructor(private http: HttpClient) {
  }

  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Client-ID ${environment.clientId}`
    })
  };

  getThumbnailUrl(id: string, size: string) {
    return `${ environment.imagesUrl}${id}${size}.jpg`;
  }

  getImage(id: string) {
    const url = `${this.baseUrl}${id}`;
    return this.http.get(url, this.httpOptions);
  }
}
