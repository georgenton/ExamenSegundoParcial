import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Icompra } from '../Interfaces/icompra'; // Asegúrate de crear esta interfaz
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComprasService {
  apiurl = 'http://localhost/SextoVirtual/Evaluaciones/evaluacionParcialdos/controllers/compras.controller.php?op=';

  constructor(private http: HttpClient) {}

  // Método para obtener todos los productos
  todos(): Observable<Icompra[]> {
    return this.http.get<Icompra[]>(this.apiurl + 'todos');
  }

  // Método para obtener un producto por su ID
  // uno(idProductos: number): Observable<Icompra> {
  //   const formData = new FormData();
  //   formData.append('idProductos', idProductos.toString());
  //   return this.http.post<Icompra>(this.apiurl + 'uno', formData);
  // }

  // Método para eliminar un producto por su ID
  eliminar(idCompras: number): Observable<number> {
    const formData = new FormData();
    formData.append('idCompras', idCompras.toString());
    return this.http.post<number>(this.apiurl + 'eliminar', formData);
  }

  // Método para insertar un nuevo producto junto con el kardex
  insertar(compra: Icompra): Observable<string> {
    // $idClientes = intval($_POST["idClientes"]);
    // $Total = $_POST["Total"];
    // $Estado = $_POST["Estado"];
    // $idProductos = intval($_POST["idProductos"]);
    // $Cantidad = intval($_POST["Cantidad"]);
    // $Precio_Unitario = $_POST["Precio_Unitario"];

    const formData = new FormData();
    formData.append('idClientes', compra.cliente_id.toString());
    formData.append('Total', compra.total.toString());
    formData.append('Estado', compra.estado.toString());
    formData.append('idProductos', compra.producto_id.toString());
    formData.append('Cantidad', compra.cantidad.toString());

    // Insertar el producto y kardex
    return this.http.post<string>(this.apiurl + 'insertar', formData);
  }

  // Método para actualizar un producto
  // actualizar(producto: Icompra): Observable<string> {
  //   const formData = new FormData();
  //   formData.append('idProductos', producto.idProductos.toString());
  //   formData.append('Codigo_Barras', producto.Codigo_Barras);
  //   formData.append('Nombre_Producto', producto.Nombre_Producto);
  //   formData.append('Graba_IVA', producto.Graba_IVA.toString());

  //   // Actualizar el producto
  //   return this.http.post<string>(this.apiurl + 'actualizar', formData);
  // }
}