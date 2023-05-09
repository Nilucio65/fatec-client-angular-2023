import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Client } from './client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

   url = "http://localhost:3000/clients";
  constructor(private http: HttpClient) { }


  getClients(): Observable<Client[]> {

      return this.http.get<Client[]>(this.url);
  }

  save(newClient:Client): Observable<Client>{
    return this.http.post<Client>(this.url, newClient);
  }

}






