import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { DataResponse } from '../classes/dataResponse';
@Injectable()
export class WebService {

  constructor(public http: Http) {

  }

  get(user: Object, url) {
    return this.http.get(url, user)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  post(data: Object, url) {
    return this.http.post(url, data)
      .toPromise().then((data: Response) => {

        let dataResponse = new DataResponse();
        let parsedData = data.json();
        dataResponse.message = parsedData.message;
        dataResponse.status = data['status'];
        return dataResponse;
      }).catch((data: Response) => {

        let dataResponse = new DataResponse();
        let parsedData = data.json();

        if (data['status'] == 404) {
          dataResponse.message = parsedData.message;
          dataResponse.invalid = parsedData.invalid;
          dataResponse.status = data['status'];
        }
        if (data['status'] == 0) {
          dataResponse.message = "Error en la conexión. Intentelo nuevamente.";
        }
        dataResponse.status = parsedData.status;
        return dataResponse;
      });
  }


  postWithJWT(data: Object, url) {
    return this.http.post(url, data)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  private handleError(error: Response | any) {
    if (error instanceof Response) {
      const body = error.json() || '';
      return body;
    }
  }
}
