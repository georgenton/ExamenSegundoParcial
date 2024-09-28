import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProducto } from '../Interfaces/iproducto'; // Asegúrate de crear esta interfaz
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  apiurl = 'http://localhost/SextoVirtual/Evaluaciones/evaluacionParcialdos/controllers/productos.controller.php?op=';

  constructor(private http: HttpClient) {}

  // Método para obtener todos los productos
  todos(): Observable<IProducto[]> {
    return this.http.get<IProducto[]>(this.apiurl + 'todos');
  }

  // Método para obtener un producto por su ID
  uno(idProductos: number): Observable<IProducto> {
    const formData = new FormData();
    formData.append('idProductos', idProductos.toString());
    return this.http.post<IProducto>(this.apiurl + 'uno', formData);
  }

  // Método para eliminar un producto por su ID
  eliminar(idProductos: number): Observable<number> {
    const formData = new FormData();
    formData.append('idProductos', idProductos.toString());
    return this.http.post<number>(this.apiurl + 'eliminar', formData);
  }

  // Método para insertar un nuevo producto junto con el kardex
  insertar(producto: IProducto): Observable<string> {

    // $Nombre = $_POST["Nombre"];
    //     $Talla = $_POST["Talla"];
    //     $Color = $_POST["Color"];
    //     $Precio = $_POST["Precio"];
    //     $Estado = intval($_POST["Estado"]);

    const formData = new FormData();
    formData.append('Nombre', producto.nombre);
    formData.append('Talla', producto.talla);
    formData.append('Color', producto.color);
    formData.append('Precio', producto.precio.toString());
    formData.append('Estado', producto.estado.toString());

    // Insertar el producto
    return this.http.post<string>(this.apiurl + 'insertar', formData);
  }

  // Método para actualizar un producto
  actualizar(producto: IProducto): Observable<string> {
    const formData = new FormData();
    formData.append('idProductos', producto.producto_id.toString());
    formData.append('Nombre', producto.nombre);
    formData.append('Talla', producto.talla);
    formData.append('Color', producto.color);
    formData.append('Precio', producto.precio.toString());
    formData.append('Estado', producto.estado.toString());

    // Actualizar el producto
    return this.http.post<string>(this.apiurl + 'actualizar', formData);
  }
}
