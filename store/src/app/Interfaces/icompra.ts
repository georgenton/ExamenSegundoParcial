export interface Icompra {
    compra_id?: number;
    cliente_id: number;
    fecha_compra: string;
    total: number;
    estado: number;
    producto_id: number;
    cantidad: number;
    precio_unitario: number;

    //son solo para mostrar informacion
    Nombre_cliente?: string;
    color?: string;
    nombre?: string;
}
