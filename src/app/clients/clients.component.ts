import { Client } from './../client';
import { Component, OnInit } from '@angular/core';
import { ClientService } from '../client.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit{

  clients: Client[] = [];
  formGroupClient!: FormGroup;
  isEditing: boolean = false;

  constructor (private clientService: ClientService, private formBuilder: FormBuilder){
    this.formGroupClient = formBuilder.group({
      id: [''],
      name: [''],
      email: ['']
    })
  }

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(){
      this.clientService.getClients().subscribe(
        {
            next:  data =>  this.clients = data,
            error: msg  => console.log("Erro ao chamar o endpont " + msg)
        }
      )
  }

  Save(){
    if(this.isEditing){
      this.isEditing = false;
      this.clientService.update(this.formGroupClient.value).subscribe({
        next: () => {
          this.loadClients();
          this.formGroupClient.reset();
        }
      })
    }
    else{
    this.clientService.save(this.formGroupClient.value).subscribe(
      {
        next: data =>{
          this.clients.push(data);
        }
      }
    )
    }

    this.loadClients();
  }

  Exluir(clients: Client): void{
    this.clientService.remove(clients).subscribe({
      next:() => this.loadClients()

    });
  }

  Alterar(clients: Client){
    this.formGroupClient.setValue(clients)
    this.isEditing = true;
  }

}








