<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER["REQUEST_METHOD"];
if($method == "OPTIONS") {die();}

//TODO: controlador de proveedores

require_once('../models/compras.model.php');
//error_reporting(0);
$compras  = new Compras;

switch ($_GET["op"]) {
        //TODO: operaciones de proveedores

        case 'todos': // Procedimiento para cargar todos los productos
            $datos = array();
            $datos = $compras->todos();
            while ($row = mysqli_fetch_assoc($datos)) {
                $todos[] = $row;
            }
            echo json_encode($todos);
            break;
    
        // case 'uno': // Procedimiento para obtener un producto por ID
        //     if (!isset($_POST["idProductos"])) {
        //         echo json_encode(["error" => "Producto ID not specified."]);
        //         exit();
        //     }
        //     $idProductos = intval($_POST["idProductos"]);
        //     $datos = array();
        //     $datos = $compras->uno($idProductos);
        //     $res = mysqli_fetch_assoc($datos);
        //     echo json_encode($res);
        //     break;
    
        case 'insertar': // Procedimiento para insertar un nuevo producto y actualizar el kardex
            if (!isset($_POST["idClientes"]) || !isset($_POST["Total"]) || !isset($_POST["Estado"]) || !isset($_POST["idProductos"]) || !isset($_POST["Cantidad"])) {
                echo json_encode(["error" => "Missing required parameters."]);
                exit();
            }
    
            $idClientes = intval($_POST["idClientes"]);
            $Total = $_POST["Total"];
            $Estado = $_POST["Estado"];
            $idProductos = intval($_POST["idProductos"]);
            $Cantidad = intval($_POST["Cantidad"]);

    
            $datos = array();
            $datos = $compras->insertar($idClientes, $Total, $Estado, $idProductos, $Cantidad);
            echo json_encode($datos);
            break;
    
        // case 'actualizar': // Procedimiento para actualizar un producto existente
        //     if (!isset($_POST["idProductos"]) || !isset($_POST["Codigo_Barras"]) || !isset($_POST["Nombre_Producto"]) || !isset($_POST["Graba_IVA"])) {
        //         echo json_encode(["error" => "Missing required parameters."]);
        //         exit();
        //     }
    
        //     $idProductos = intval($_POST["idProductos"]);
        //     $Codigo_Barras = $_POST["Codigo_Barras"];
        //     $Nombre_Producto = $_POST["Nombre_Producto"];
        //     $Graba_IVA = intval($_POST["Graba_IVA"]);
    
        //     $datos = array();
        //     $datos = $compras->actualizar($idProductos, $Codigo_Barras, $Nombre_Producto, $Graba_IVA);
        //     echo json_encode($datos);
        //     break;
    
        case 'eliminar': // Procedimiento para eliminar un producto
            if (!isset($_POST["idCompras"])) {
                echo json_encode(["error" => "Compras ID not specified."]);
                exit();
            }
            $idCompras = intval($_POST["idCompras"]);
            $datos = array();
            $datos = $compras->eliminar($idCompras);
            echo json_encode($datos);
            break;
    
        default:
            echo json_encode(["error" => "Invalid operation."]);
            break;
}