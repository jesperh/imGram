import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  private baseUrl = environment.baseApiUrl + "gallery/";

  constructor(private http: HttpClient) {
  }

  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Client-ID ${environment.clientId}`
    })
  };

  // The main gallery of imgur is also
  // known as the viral gallery.
  getMainGallery() {
    const url = this.baseUrl + "hot/viral/";
    return this.http.get(url, this.httpOptions);
  }

  getPageFromMainGallery(page: number) {
    const section = "hot/viral";
    const window = "day";
    const url = `${this.baseUrl}${section}/${window}/${page}`;
    return this.http.get(url, this.httpOptions);
  }

}
