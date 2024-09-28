import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IProducto } from 'src/app/Interfaces/iproducto';
import { ICliente } from 'src/app/Interfaces/icliente';
import { ProductoService } from 'src/app/Services/productos.service';
import { ClienteService } from 'src/app/Services/clientes.service';
import { ComprasService } from 'src/app/Services/compras.service';
import { Icompra } from 'src/app/Interfaces/icompra';

@Component({
  selector: 'app-nuevoproducto',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './nuevacompra.component.html',
  styleUrl: './nuevacompra.component.scss'
})
export class NuevacompraComponent {
  listaClientes: ICliente[] = [];
  listaProductos: IProducto[] = [];
  titulo = '';
  frm_Compra: FormGroup;
  idCompras = 0;
  editar = false;
  constructor(
    private fb: FormBuilder,
    private productoServicio: ProductoService,
    private clienteServicio: ClienteService,
    private compraServicio: ComprasService,
    private navegacion: Router,
    private ruta:ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.idCompras = parseInt(this.ruta.snapshot.paramMap.get('id'));
    this.clienteServicio.todos().subscribe((data) => (this.listaClientes = data));
    this.productoServicio.todos().subscribe((data) => (this.listaProductos = data));
    this.crearFormulario();


    // if(this.idCompras > 0){
    //     this.editar = true;
    //     this.productoServicio.uno(this.idProductos).subscribe((producto) => {
    //     this.frm_Compra.get('Codigo_Barras')?.setValue(producto.Codigo_Barras);
    //     this.frm_Compra.get('Nombre_Producto')?.setValue(producto.Nombre_Producto);
    //     this.frm_Compra.get('Graba_IVA')?.setValue(producto.Graba_IVA);
    //   });
    // }
  }
  crearFormulario() {
    this.frm_Compra = new FormGroup({
      idClientes: new FormControl('', Validators.required),
      idProductos: new FormControl('', Validators.required),
      Cantidad: new FormControl('', [Validators.required, Validators.min(1)]),
      Total: new FormControl('', [Validators.required, Validators.min(0)])
    });
  }
  grabar() {
    let compra: Icompra = {
      cliente_id: this.frm_Compra.get('idClientes')?.value,
      producto_id: this.frm_Compra.get('idProductos')?.value,
      cantidad: this.frm_Compra.get('Cantidad')?.value,
      total: this.frm_Compra.get('Total')?.value,
      fecha_compra: new Date().toString(),
      precio_unitario: this.frm_Compra.get('Total')?.value / this.frm_Compra.get('Cantidad')?.value,
      estado: 1,
    };
    if (this.idCompras == 0 || isNaN(this.idCompras)) {
      this.compraServicio.insertar(compra).subscribe((respuesta) => {
        if (parseInt(respuesta) > 0) {
          alert('Producto grabado');
          this.navegacion.navigate(['/compras']);
        } else {
          alert('Error al grabar');
        }
      });
    }
    // else {
    //   compra.compra_id = this.idCompras;
    //   this.compraServicio.actualizar(compra).subscribe((respuesta) => {
    //     if (parseInt(respuesta) > 0) {
    //       this.idProductos = 0;
    //       alert('Actualizado con exito');
    //       this.navegacion.navigate(['/productos']);
    //     } else {
    //       alert('Error al actualizar');
    //     }
    //   });
    // }
    }
  }