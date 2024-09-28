# Sistema de Gestión de Tiendas de Ropa

Este proyecto es una aplicación web que permite gestionar clientes, productos y compras dentro de una tienda de ropa utilizando Angular en el frontend y PHP en el backend. La aplicación sigue el patrón de diseño MVC (Modelo-Vista-Controlador) en el backend y se comunica con la interfaz a través de formularios y tablas dinámicas para gestionar los datos.

## Descripción del Proyecto

Este sistema está diseñado específicamente para gestionar una tienda de ropa. Se puede administrar una base de datos de productos y clientes, además de gestionar compras realizadas por los clientes. 

### Estructura de la Base de Datos

El sistema gestiona tres tablas principales: **Productos**, **Clientes** y **Compras**.

1. **Productos**
   - **producto_id** (int, PK)
   - **nombre** (varchar)
   - **talla** (varchar)
   - **color** (varchar)
   - **precio** (decimal)

2. **Clientes**
   - **cliente_id** (int, PK)
   - **nombre** (varchar)
   - **apellido** (varchar)
   - **email** (varchar)
   - **telefono** (varchar)

3. **Compras**
   - **compra_id** (int, PK)
   - **cliente_id** (int, FK de Clientes)
   - **producto_id** (int, FK de Productos)
   - **cantidad** (int)
   - **total** (decimal)
   - **fecha_compra** (datetime)

Estas tablas están relacionadas para facilitar la gestión eficiente de la tienda, permitiendo el seguimiento de las compras realizadas por cada cliente y los productos comprados.

## Estructura del Proyecto

### Frontend (Angular)

El frontend de la aplicación está desarrollado con Angular y contiene componentes que permiten gestionar clientes, productos y compras. A continuación se describen los principales componentes de la aplicación.

#### Componentes

1. **Clientes**
   - **`clientes.component.ts`**: Controlador del componente que maneja la lógica de la vista de clientes, carga la lista de clientes desde el servidor y ofrece funcionalidades para eliminar un cliente.
   - **`clientes.component.html`**: Vista que muestra la lista de clientes en una tabla. Cada cliente tiene opciones para editar o eliminar y un botón que redirige al formulario para agregar un nuevo cliente.

2. **Nuevo Cliente**
   - **`nuevocliente.component.ts`**: Controlador del componente que maneja la lógica del formulario para crear o editar un cliente. Gestiona la captura de datos y la validación de los mismos.
   - **`nuevocliente.component.html`**: Formulario que permite crear un nuevo cliente ingresando nombre, apellido, correo electrónico y teléfono. Contiene validaciones y un botón para guardar el cliente.

3. **Productos**
   - **`productos.component.ts`**: Controlador del componente que maneja la lógica de la vista de productos, carga la lista de productos desde el servidor y ofrece funcionalidades para eliminar un producto.
   - **`productos.component.html`**: Vista que muestra la lista de productos en una tabla. Cada producto tiene opciones para editar o eliminar y un botón que redirige al formulario para agregar un nuevo producto.

4. **Nuevo Producto**
   - **`nuevoproducto.component.ts`**: Controlador del componente que maneja la lógica del formulario para crear o editar un producto. Gestiona la captura de datos y la validación de los mismos.
   - **`nuevoproducto.component.html`**: Formulario que permite crear un nuevo producto ingresando nombre, talla, color y precio. Contiene validaciones y un botón para guardar el producto.

5. **Compras**
   - **`compras.component.ts`**: Controlador del componente que maneja la lógica de la vista de compras, carga la lista de compras desde el servidor y ofrece funcionalidades para eliminar una compra y generar un reporte.
   - **`compras.component.html`**: Vista que muestra la lista de compras en una tabla. Cada compra tiene opciones para eliminar y un botón que redirige al formulario para agregar una nueva compra.

6. **Nueva Compra**
   - **`nuevacompra.component.ts`**: Controlador del componente que maneja la lógica del formulario para crear una compra. Permite seleccionar un cliente y un producto de listas desplegables y registrar la cantidad y el total de la compra.
   - **`nuevacompra.component.html`**: Formulario que permite crear una nueva compra seleccionando el cliente y el producto y especificando la cantidad y el total. Contiene validaciones y un botón para guardar la compra.

### Backend (PHP)

El backend está desarrollado en PHP siguiendo el patrón de diseño MVC. Se encarga de la lógica de negocio y de la interacción con la base de datos. A continuación se describen los principales controladores y modelos.

#### Controladores

1. **`clientes.controller.php`**: Controlador que maneja la lógica relacionada con los clientes, incluyendo la creación, edición, eliminación y obtención de datos de clientes desde la base de datos.

2. **`productos.controller.php`**: Controlador que maneja la lógica relacionada con los productos, incluyendo la creación, edición, eliminación y obtención de datos de productos desde la base de datos.

3. **`compras.controller.php`**: Controlador que maneja la lógica relacionada con las compras, incluyendo la creación, edición, eliminación y obtención de datos de compras desde la base de datos.

#### Modelos

1. **`clientes.model.php`**: Modelo que interactúa con la base de datos para gestionar los datos de los clientes. Realiza operaciones CRUD (Crear, Leer, Actualizar, Eliminar).

2. **`productos.model.php`**: Modelo que interactúa con la base de datos para gestionar los datos de los productos. Realiza operaciones CRUD (Crear, Leer, Actualizar, Eliminar).

3. **`compras.model.php`**: Modelo que interactúa con la base de datos para gestionar los datos de las compras. Realiza operaciones CRUD (Crear, Leer, Actualizar, Eliminar).

### Configuración

1. **`config.php`**: Archivo de configuración que contiene las credenciales de conexión a la base de datos y otros parámetros globales necesarios para el funcionamiento del backend.

## Instalación y Configuración

1. Clona el repositorio o descarga el código fuente.
2. Configura las credenciales de la base de datos en el archivo `config.php`.
3. Instala las dependencias de Angular ejecutando el comando:

    ```bash
    npm install
    ```

4. Inicia el servidor de Angular con el comando:

    ```bash
    ng serve
    ```

5. Asegúrate de que el servidor web (como Apache o Nginx) esté configurado correctamente para servir los archivos PHP en el backend.

## Funcionalidades Principales

- **Gestión de Clientes**: Crear, editar, eliminar y listar clientes.
- **Gestión de Productos**: Crear, editar, eliminar y listar productos.
- **Gestión de Compras**: Crear, eliminar y listar compras, además de generar reportes.
- **Validación de Formularios**: Todos los formularios tienen validaciones que aseguran que los campos requeridos sean completados correctamente.

## Consideraciones

- Los datos del cliente, producto y compra se gestionan de manera independiente y están relacionados entre sí a través de IDs.
- El frontend y backend están separados, por lo que la comunicación entre ellos se realiza a través de peticiones HTTP (por ejemplo, mediante API REST).

## Licencia

Este proyecto está bajo la [Licencia MIT](LICENSE).
