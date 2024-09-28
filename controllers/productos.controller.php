<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER["REQUEST_METHOD"];
if ($method == "OPTIONS") {
    die();
}

// TODO: Controlador de productos

require_once('../models/productos.model.php');
error_reporting(0);
$producto = new Producto;

switch ($_GET["op"]) {
        // TODO: Operaciones de productos

    case 'todos': // Procedimiento para cargar todos los productos
        $datos = array();
        $datos = $producto->todos();
        while ($row = mysqli_fetch_assoc($datos)) {
            $todos[] = $row;
        }
        echo json_encode($todos);
        break;

    case 'uno': // Procedimiento para obtener un producto por ID
        if (!isset($_POST["idProductos"])) {
            echo json_encode(["error" => "Producto ID not specified."]);
            exit();
        }
        $idProductos = intval($_POST["idProductos"]);
        $datos = array();
        $datos = $producto->uno($idProductos);
        $res = mysqli_fetch_assoc($datos);
        echo json_encode($res);
        break;

    case 'insertar': // Procedimiento para insertar un nuevo producto
        //$Nombre, $Talla, $Color, $Precio, $Estado
        if (!isset($_POST["Nombre"]) || !isset($_POST["Talla"]) || !isset($_POST["Color"]) || !isset($_POST["Precio"]) || !isset($_POST["Estado"])) {
            echo json_encode(["error" => "Missing required parameters."]);
            exit();
        }

        $Nombre = $_POST["Nombre"];
        $Talla = $_POST["Talla"];
        $Color = $_POST["Color"];
        $Precio = $_POST["Precio"];
        $Estado = intval($_POST["Estado"]);

        $datos = array();
        $datos = $producto->insertar($Nombre, $Talla, $Color, $Precio, $Estado);
        echo json_encode($datos);
        break;

    case 'actualizar': // Procedimiento para actualizar un producto existente
        if (!isset($_POST["idProductos"]) || !isset($_POST["Nombre"]) || !isset($_POST["Talla"]) || !isset($_POST["Color"]) || !isset($_POST["Precio"]) || !isset($_POST["Estado"])) {
            echo json_encode(["error" => "Missing required parameters."]);
            exit();
        }

        $idProductos = intval($_POST["idProductos"]);
        $Nombre = $_POST["Nombre"];
        $Talla = $_POST["Talla"];
        $Color = $_POST["Color"];
        $Precio = $_POST["Precio"];
        $Estado = intval($_POST["Estado"]);

        $datos = array();
        $datos = $producto->actualizar($idProductos, $Nombre, $Talla, $Color, $Precio, $Estado);
        echo json_encode($datos);
        break;

    case 'eliminar': // Procedimiento para eliminar un producto
        if (!isset($_POST["idProductos"])) {
            echo json_encode(["error" => "Producto ID not specified."]);
            exit();
        }
        $idProductos = intval($_POST["idProductos"]);
        $datos = array();
        $datos = $producto->eliminar($idProductos);
        echo json_encode($datos);
        break;

    default:
        echo json_encode(["error" => "Invalid operation."]);
        break;
}