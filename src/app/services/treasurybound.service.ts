import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TreasuryboundService {

  readonly urlApi = 'http://127.0.0.1:5000';

  constructor(
    private http: HttpClient,
  ) { }

  public listTreasuriesBound(tesouro_type: string, data_vencimento: string){

    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Access-Control-Allow-Origin', environment.host);

    return this.http
      .get(`${this.urlApi}/getTesouro`, {
        headers,
        params: {
          tesouro_type,
          data_vencimento
        },
      })
      .toPromise()
      .then((res: any) => res as any)
      .catch((error: Response) => error);
  }

  public listaTesourosPeloNome(tesouro_type: string){

    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Access-Control-Allow-Origin', environment.host);

    return this.http
      .get(`${this.urlApi}/getTesouro`, {
        headers,
        params: {
          tesouro_type
        },
      })
      .toPromise()
      .then((res: any) => res as any)
      .catch((error: Response) => error);
  }

  public listarTesourosTaxa(tesouro_type: string, data_vencimento:string) {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Access-Control-Allow-Origin', environment.host);

    return this.http
      .get(`${this.urlApi}/getPrecoTaxa`, {
        headers,
        params: {
          tesouro_type,
          data_vencimento
        },
      })
      .toPromise()
      .then((res: any) => res as any)
      .catch((error: Response) => error);
  }
}
