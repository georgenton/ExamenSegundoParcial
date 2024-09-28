<?php
//TODO: Clase de Provedores
require_once('../config/config.php');
class Compras
{
    //TODO: Implementar los metodos de la clase

    public function todos() //select * from compraas
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "SELECT p.producto_id, 
        p.nombre, 
        p.talla, 
        p.color,
        p.precio, 
        c.cliente_id as cliente_id, 
        CONCAT_WS(' ', c.nombre, c.apellido) as Nombre_cliente, 
        cr.compra_id,
        cr.fecha_compra, 
        cr.total, 
        dcr.cantidad, 
        dcr.precio_unitario
            FROM `productos` p
            INNER JOIN `detalle_compras` dcr ON p.producto_id = dcr.producto_id
            INNER JOIN `compras` cr ON dcr.compra_id = cr.compra_id
            INNER JOIN `clientes` c ON cr.cliente_id = c.cliente_id
            where cr.`estado` = 1
            ";
        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }

    // public function uno($idProductos) //select * from provedores where id = $id
    // {
    //     $con = new ClaseConectar();
    //     $con = $con->ProcedimientoParaConectar();
    //     $cadena = "SELECT p.*
    //                FROM `Productos` p
    //                WHERE p.idProductos = $idProductos";
    //     $datos = mysqli_query($con, $cadena);
    //     $con->close();
    //     return $datos;
    // }

    public function insertar($idClientes, $Total, $Estado, $idProductos, $Cantidad)
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();

            // Insertar el compras
            $cadenaCompras = "INSERT INTO `compras`(`cliente_id`, `fecha_compra`, `total`, `estado`) 
                               VALUES ('$idClientes', NOW(), '$Total', '$Estado')";

            if (mysqli_query($con, $cadenaCompras)) {
                $compraId = $con->insert_id; // Obtener el ID del producto recién creado
                $Precio_Unitario = $Total / $Cantidad;
                // Insertar el Kardex asociado al producto
                $cadenaDetalleCompra = "INSERT INTO `detalle_compras`(`compra_id`, `producto_id`, `cantidad`, `precio_unitario`)
                                 VALUES ($compraId, $idProductos, '$Cantidad', '$Precio_Unitario')";

                if (mysqli_query($con, $cadenaDetalleCompra)) {
                    return $compraId; // Éxito, devolver el ID de la compra
                } else {
                    return $con->error; // Error en el Kardex
                }
            } else {
                return $con->error; // Error en el producto
            }
        } catch (Exception $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }
    // public function actualizar($idProductos, $Codigo_Barras, $Nombre_Producto, $Graba_IVA) // update productos set ... where id = $idProductos
    // {
    //     try {
    //         $con = new ClaseConectar();
    //         $con = $con->ProcedimientoParaConectar();
    //         $cadena = "UPDATE `Productos` SET 
    //                    `Codigo_Barras`='$Codigo_Barras',
    //                    `Nombre_Producto`='$Nombre_Producto',
    //                    `Graba_IVA`='$Graba_IVA'
    //                    WHERE `idProductos` = $idProductos";
    //         if (mysqli_query($con, $cadena)) {
    //             return $idProductos; // Éxito, devolver el ID actualizado
    //         } else {
    //             return $con->error;
    //         }
    //     } catch (Exception $th) {
    //         return $th->getMessage();
    //     } finally {
    //         $con->close();
    //     }
    // }
    public function eliminar($idCompras) // delete from productos where id = $idProductos
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "UPDATE `compras` SET `estado`= 0 WHERE `compra_id`=$idCompras";
            if (mysqli_query($con, $cadena)) {
                return 1; // Éxito
            } else {
                return $con->error;
            }
        } catch (Exception $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }
}