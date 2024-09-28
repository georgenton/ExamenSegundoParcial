<?php
// TODO: Clase de Clientes Tienda Cel@g
require_once('../config/config.php');

class Clientes
{
    // TODO: Implementar los métodos de la clase


    public function buscar($texto) // select * from clientes
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "SELECT * FROM `clientes` where apellido='$texto'";
        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }
    public function todos() // select * from clientes
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "SELECT * FROM `clientes`";
        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }

    public function uno($idClientes) // select * from clientes where id = $idClientes
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "SELECT * FROM `clientes` WHERE `cliente_id` = $idClientes";
        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }

    public function insertar($Nombre, $Apellido, $Email, $Telefono) // insert into clientes (nombres, direccion, telefono, cedula, correo) values ($nombres, $direccion, $telefono, $cedula, $correo)
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "INSERT INTO `clientes`(`nombre`, `apellido`, `email`, `telefono`) 
                       VALUES ('$Nombre', '$Apellido', '$Email', '$Telefono')";
            if (mysqli_query($con, $cadena)) {
                return $con->insert_id; // Return the inserted ID
            } else {
                return $con->error;
            }
        } catch (Exception $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }

    public function actualizar($idClientes, $Nombre, $Apellido, $Email, $Telefono) // update clientes set nombres = $nombres, direccion = $direccion, telefono = $telefono, cedula = $cedula, correo = $correo where id = $idClientes
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "UPDATE `clientes` SET 
                       `nombre`='$Nombre',
                       `apellido`='$Apellido',
                       `email`='$Email',
                       `telefono`='$Telefono'
                       WHERE `cliente_id` = $idClientes";
            if (mysqli_query($con, $cadena)) {
                return $idClientes; // Return the updated ID
            } else {
                return $con->error;
            }
        } catch (Exception $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }

    public function eliminar($idClientes) // delete from clientes where id = $idClientes
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "DELETE FROM `clientes` WHERE `cliente_id`= $idClientes";
            if (mysqli_query($con, $cadena)) {
                return 1; // Success
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
