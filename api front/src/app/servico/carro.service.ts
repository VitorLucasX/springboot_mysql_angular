import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Carro } from '../modelo/carro';

@Injectable({
  providedIn: 'root'
})
export class CarroService {

  // Url da API
  private url:string = 'http://localhost:8080';

  // Constructor
  constructor(private http:HttpClient) { }

  // Método para selecionar todos os carros
  selecionar():Observable<Carro[]> {
    return this.http.get<Carro[]>(this.url);
  }

  // Método para cadastrar carros
  cadastrar(obj:Carro):Observable<Carro> {
    return this.http.post<Carro>(this.url, obj);
  }

  // Método para editar carros
  editar(obj:Carro):Observable<Carro> {
    return this.http.put<Carro>(this.url, obj);
  }

  // Método para remover carros
  remover(codigo:number):Observable<void> {
    return this.http.delete<void>(this.url + '/' + codigo);
  }
}
