import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IProducto } from 'src/app/Interfaces/iproducto';
import { ProductoService } from 'src/app/Services/productos.service';

@Component({
  selector: 'app-nuevoproducto',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './nuevoproducto.component.html',
  styleUrl: './nuevoproducto.component.scss'
})
export class NuevoproductoComponent {
  titulo = '';
  frm_Producto: FormGroup;
  idProductos = 0;
  editar = false;
  constructor(
    private fb: FormBuilder,
    private productoServicio: ProductoService,
    private navegacion: Router,
    private ruta:ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.idProductos = parseInt(this.ruta.snapshot.paramMap.get('id'));
    this.crearFormulario();


    if(this.idProductos > 0){
        this.editar = true;
        this.productoServicio.uno(this.idProductos).subscribe((producto) => {
        this.frm_Producto.get('Nombre')?.setValue(producto.nombre);
        this.frm_Producto.get('Talla')?.setValue(producto.talla);
        this.frm_Producto.get('Color')?.setValue(producto.color);
        this.frm_Producto.get('Precio')?.setValue(producto.precio);
      });
    }
  }
  crearFormulario() {
    this.frm_Producto = new FormGroup({
      Nombre: new FormControl('', Validators.required),
      Talla: new FormControl('', Validators.required),
      Color: new FormControl('', Validators.required),
      Precio: new FormControl('', [Validators.required, Validators.min(0)])
    });
  }
  grabar() {
    let producto: IProducto = {
      nombre: this.frm_Producto.get('Nombre')?.value,
      talla: this.frm_Producto.get('Talla')?.value,
      color: this.frm_Producto.get('Color')?.value,
      precio: this.frm_Producto.get('Precio')?.value,
      estado: 1,
    };
    if (this.idProductos == 0 || isNaN(this.idProductos)) {
      this.productoServicio.insertar(producto).subscribe((respuesta) => {
        console.log(producto);
        if (parseInt(respuesta) > 0) {
          alert('Producto grabado');
          this.navegacion.navigate(['/productos']);
        } else {
          alert('Error al grabar');
        }
      });
    }else {
      producto.producto_id = this.idProductos;
      this.productoServicio.actualizar(producto).subscribe((respuesta) => {
        if (parseInt(respuesta) > 0) {
          this.idProductos = 0;
          alert('Actualizado con exito');
          this.navegacion.navigate(['/productos']);
        } else {
          alert('Error al actualizar');
        }
      });
    }
    }
  }
