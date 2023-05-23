import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TreasuryboundService {
  // readonly urlApi = environment.api;
  readonly urlApi = 'http://35.247.195.146:5000/api'

  constructor(
    private http: HttpClient,
  ) { }

  public listTreasuriesBound(tipo_titulo: string, ano_vencimento: string, data_inicial: string, data_final: string ){

    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Access-Control-Allow-Origin', environment.host);

    let nova_data_inicial = data_inicial.split('-');
    data_inicial = nova_data_inicial[2]+"-"+nova_data_inicial[1]+"-"+nova_data_inicial[0];
    let nova_data_final = data_final.split('-');
    data_final = nova_data_final[2] + "-" +nova_data_final[1] + "-" + nova_data_final[0];

    return this.http
      .post(`${this.urlApi}/tesouro/getTesouro`, {
          tipo_titulo,
          ano_vencimento,
          data_inicial,
          data_final,
        })
      .toPromise()
      .then((res: any) => res as any)
      .catch((error: Response) => error);
  }

  public listarTesourosTaxa(tipo_titulo: string, ano_vencimento:string, data_inicial: string, data_final: string) {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Access-Control-Allow-Origin', environment.host);

    let nova_data_inicial = data_inicial.split('-');
    data_inicial = nova_data_inicial[2]+"-"+nova_data_inicial[1]+"-"+nova_data_inicial[0];
    let nova_data_final = data_final.split('-');
    data_final = nova_data_final[2] + "-" +nova_data_final[1] + "-" + nova_data_final[0];

    return this.http
      .post(`${this.urlApi}/tesouro/getPrecoTaxa`, {
          tipo_titulo,
          ano_vencimento,
          data_inicial,
          data_final
        })
      .toPromise()
      .then((res: any) => res as any)
      .catch((error: Response) => error);
  }

  public listaAnoVencimento(tipo_titulo: string) {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Access-Control-Allow-Origin', environment.host);

    return this.http
      .post(`${this.urlApi}/tesouro/getAnoVencimento`, {
          tipo_titulo,
        }
        )
      .toPromise()
      .then((res: any) => res as any)
      .catch((error: Response) => error);
  }
}
