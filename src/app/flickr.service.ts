import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { environment } from './../environments/environment';
const { flickrApi } = environment;

@Injectable()
export class FlickrService {

  constructor(
    private http: HttpClient,
  ) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.log('Client error: ', error.error.message);
      console.error(error);
    } else {
      // The backend returned an unsuccessful response code.
      console.log('Flickr error: ', error.message);
      console.log('Flickr status: ', error.status);
      console.error(error);
    }

    return new ErrorObservable(error);
  }

  getFlickrImages(tags?: string) {
    const url = flickrApi;
    let params = new HttpParams();
    params = params.append('format', 'json');
    if (tags) {
      params = params.append('tags', tags);
    }
    params = params.append('jsoncallback', 'JSON_CALLBACK');
    const urlParams = params.toString();

    return this.http.jsonp(`${url}?${urlParams}`, 'jsoncallback').pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

}
