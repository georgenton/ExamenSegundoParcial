import { Component } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ICliente } from '../Interfaces/icliente';
import { ClienteService } from '../Services/clientes.service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [SharedModule, FormsModule, RouterLink],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.scss'
})
export class ClientesComponent {
  title = 'Lista de Clientes';
  listaClientes:ICliente[] = [];

  constructor(private ServicioCliente:ClienteService){}
  ngOnInit(){
    this.cargaTabla();

  }

  cargaTabla(){
    this.ServicioCliente.todos().subscribe(
      (data) => {
        
        this.listaClientes = data;
        console.log(this.listaClientes);
      }
    );
  }

  eliminar(idClientes:number){

    Swal.fire({
      title: "Clientes?",
      text: "Está seguro que desea eliminar el cliente?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Eliminar cliente"
    }).then((result) => {
      if (result.isConfirmed) {
        this.ServicioCliente.eliminar(idClientes).subscribe(
          (data) => {
            Swal.fire({
              title: "Eliminado",
              text: "El cliente ha sido eliminado.",
              icon: "success"
            });
            this.cargaTabla();
          }
        );
      }
    });
  }

}