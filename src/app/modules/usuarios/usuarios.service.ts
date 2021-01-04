import { environment } from './../../../environments/environment';
import { EscolaridadeValues } from './../../shared/models/Escolaridade';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuarios } from 'src/app/shared/models/usuarios';
import { map } from 'rxjs/operators';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  private readonly BaseUrl = `${environment.apiUrl}api/Usuario`;

  header = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  constructor(private http: HttpClient, private datepipe: DatePipe) {}

  getAll() {
    return this.http.get(`${this.BaseUrl}`).pipe(
      map((resp: any) =>
        resp.map((data) => {
          return {
            id: data.id,
            nome: data.nome,
            sobrenome: data.sobrenome,
            email: data.email,
            dataNascimento: this.datepipe.transform(
              data.dataNascimento,
              'yyyy-MM-dd'
            ),
            escolaridade: this.ConvertValueEscolaridade(data.escolaridade),
          };
        })
      )
    );
  }

  private ConvertValueEscolaridade(value) {
    if (value == EscolaridadeValues.Infantil) {
      return 'Infantil';
    } else if (value == EscolaridadeValues.Fundamental) {
      return 'Fundamental';
    } else if (value == EscolaridadeValues.Médio) {
      return 'Médio';
    } else if (value == EscolaridadeValues.Superior) {
      return 'Superior';
    }
  }

  get(id: string) {
    return this.http.get<Usuarios>(`${this.BaseUrl}/${id}`).pipe(
      map((obj) => {
        return {
          id: obj.id,
          nome: obj.nome,
          sobrenome: obj.sobrenome,
          email: obj.email,
          dataNascimento: this.datepipe.transform(
            obj.dataNascimento,
            'yyyy-MM-dd'
          ),
          escolaridade: obj.escolaridade,
        };
      })
    );
  }

  insert(params: any) {
    return this.http.post(this.BaseUrl, params, {
      headers: this.header,
    });
  }

  update(params: any) {
    return this.http.put(this.BaseUrl, params, {
      headers: this.header,
    });
  }

  delete(id: string) {
    return this.http.delete(`${this.BaseUrl}/${id}`, {
      headers: this.header,
    });
  }
}
