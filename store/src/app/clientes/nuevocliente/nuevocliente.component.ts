import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Route, Router, Routes } from '@angular/router';
import { ICliente } from 'src/app/Interfaces/icliente';
import { ClienteService } from 'src/app/Services/clientes.service';

@Component({
  selector: 'app-nuevocliente',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './nuevocliente.component.html',
  styleUrl: './nuevocliente.component.scss'
})
export class NuevoclienteComponent implements OnInit {
  titulo = 'Insertar Cliente';
  tituloBoton = 'Grabar Cliente';
  idClientes = 0;
  nombre: string;
  apellido:string;
  email:string;
  telefono:string;
  
  constructor(
    private clienteServicio: ClienteService, 
    private navegacion:Router,
    private ruta:ActivatedRoute
  ){ }

  ngOnInit(): void {
    // this.idProveedores = this.ruta.snapshot.params['id'];
    this.idClientes = parseInt(this.ruta.snapshot.paramMap.get('id'));

    if(this.idClientes > 0){
      this.clienteServicio.uno(this.idClientes).subscribe(
        (cliente) => {
          this.nombre = cliente.nombre;
          this.apellido = cliente.apellido;
          this.email = cliente.email;
          this.telefono = cliente.telefono;
          this.titulo = "Actualizar Clientes";
          this.tituloBoton = "Actualizar Cliente";
        }
      );
    }
  }
  grabar(){
    let ICliente:ICliente= {
      cliente_id:0,
      nombre:this.nombre,
      apellido:this.apellido,
      email:this.email,
      telefono:this.telefono,
    };

    if(this.idClientes == 0 || isNaN(this.idClientes)){

    this.clienteServicio.insertar(ICliente).subscribe(
      (respuesta)=>{
          // parseInt(respuesta) > 1 ? alert("Grabado con éxito"): alert("Error al grabar");

          if(parseInt(respuesta)> 1){
            alert("Grabado con éxito");
            this.navegacion.navigate(['/clientes']);
          }else{
            alert("Error al grabar");
          }
      }
    );
  }else{
    ICliente.cliente_id = this.idClientes;

    console.log(ICliente);
    this.clienteServicio.actualizar(ICliente).subscribe(
      (respuesta)=>{
        if(parseInt(respuesta)> 0){
          this.idClientes = 0;
          alert("Actualizado con éxito");
          this.navegacion.navigate(['/clientes']);
        }else{
          alert("Error al actualizar");
        }
      }
    );
  }
  }

}
