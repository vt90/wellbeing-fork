import firebase from 'firebase/app';
import 'firebase/auth';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseApiService {
  constructor(
    private http: HttpClient,
  ) {
  }

  private static extractData(res) {
    // TODO check in other requests, this was done only for local pdf
    let body;

    try {
      body = res.json();
    } catch (e) {
      body = res;
    }

    return body.data || body;
  }

  private static async populateRequestHeaders(headers: object): Promise<HttpHeaders> {
    const token = await firebase.auth().currentUser.getIdToken(true);
    const _headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
      .set('X-Requested-With', 'XMLHttpRequest');

    console.log('token inside service: ', token);

    for (const name in headers) {
      if (headers.hasOwnProperty(name)) {
        const value = headers[name];

        _headers.append(name, value);
      }
    }

    console.log(_headers.getAll('Authorization'));

    return _headers;
  }

  private static handleError(error) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';

      const err = body;
      // @ts-ignore
      errMsg = err;
    } else {
      errMsg = error.errorMessage ? error.errorMessage : error.toString();
    }

    return Observable.throw(errMsg);
  }

  public get(url: string, params?: object, headers?: object) {
    return this.request(url, 'get', params, null, headers);
  }

  public post(url: string, body: object, params?: object, headers?: object) {
    return this.request(url, 'post', params, body, headers);
  }

  public put(url: string, body: object, params?: object, headers?: object) {
    return this.request(url, 'put', params, body, headers);
  }

  public delete(url: string, params?: object, headers?: object) {
    return this.request(url, 'delete', params, null, headers);
  }

  private async request(url: string,
                        method: string,
                        params: object = {},
                        body: object = {},
                        headers: object = {}) {
    const _headers = await FirebaseApiService.populateRequestHeaders(headers);
    const _params = this.populateRequestSearchParams(params);
    const _body = this.populateRequestBody(body);

    const _reqOptions: any = {};

    if (_body && Object.values(_body)) { _reqOptions.body = _body; }
    if (_headers && Object.values(_headers)) { _reqOptions.headers = _headers; }

    return this.http
      .request(method, `https://us-central1-wellbeing-3d322.cloudfunctions.net/api${url}`, _reqOptions)
      .toPromise()
      .then(FirebaseApiService.extractData)
      .catch(FirebaseApiService.handleError);
  }

  private extractUnneededData(payload = {}): object {
    if (payload) {
      Object.keys(payload).forEach((key) => {
        if (!payload[key] && payload[key] !== 0 && payload[key] !== false) {
          delete payload[key];
        }
      });
    }
    return payload;
  }

  private populateRequestSearchParams(params: object): URLSearchParams {
    const _params = new URLSearchParams();
    params = this.extractUnneededData(params);

    for (const param in params) {
      if (params.hasOwnProperty(param)) {
        const value = params[param];

        _params.append(param, value);
      }
    }

    return _params;
  }

  private populateRequestBody(body: object): string {
    body = this.extractUnneededData(body);

    return body && JSON.stringify(body);
  }
}
