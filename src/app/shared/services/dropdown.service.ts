import { HttpClient } from '@angular/common/http';
import { Escolaridade } from './../models/Escolaridade';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DropdownService {
  constructor(private http: HttpClient) {}

  getEscolaridade() {
    return this.http.get<Escolaridade[]>('assets/dados/escolaridade.json');
  }
}
