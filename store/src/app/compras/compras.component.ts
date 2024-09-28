import { Component } from '@angular/core';
import { SharedModule } from '../theme/shared/shared.module';
import { RouterLink } from '@angular/router';
import { ComprasService } from '../Services/compras.service';
import Swal from 'sweetalert2';
import { Icompra } from '../Interfaces/icompra';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [SharedModule, RouterLink],
  templateUrl: './compras.component.html',
  styleUrl: './compras.component.scss'
})
export class ComprasComponent {
  listacompras : Icompra[] = [];

  constructor(private compraServicio: ComprasService){}

  cargarcompras(){
    this.compraServicio.todos().subscribe((data) => {
      this.listacompras = data;
      console.log(data);
    });
  }
  ngOnInit(): void {
    this.cargarcompras();
  }

  trackByFn() {}

  generarReporte(){
    const doc = new jsPDF();
    doc.text('Lista de prodcutos', 10, 10);

    const columnas = ['Descripcion', 'Cantidad', 'Precio', 'Subtotal', 'IVA', 'Total'];
    const filas: any[] = [];
    this.listacompras.forEach((compra) => {
      const fila = [compra.Nombre_cliente, compra.nombre, compra.fecha_compra, compra.cantidad, compra.precio_unitario, compra.total];
      filas.push(fila);
    });

    (doc as any).autoTable({
      head: [columnas],
      body: filas,
      start: 20
    });

    doc.save('compras.pdf');

    
  }

  
  eliminar(idCompras) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará la compra',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.compraServicio.eliminar(idCompras).subscribe((data) => {
          this.cargarcompras();
        });
        Swal.fire('Eliminado', 'La compra ha sido eliminada', 'success');
      } else {
        Swal.fire('Error', 'Ocurrio un erro', 'error');
      }
    });
  }

}

