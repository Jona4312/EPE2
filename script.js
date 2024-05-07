// Función para cargar los datos del archivo JSON
function cargarDatosJSON(url, callback) {
    fetch(url)
        .then(response => response.json())
        .then(data => callback(data))
        .catch(error => console.error('Error al cargar los datos:', error));
}

// Función para cargar la tabla con los productos
function cargarTabla(productos) {
    const tablaProductos = document.getElementById('tabla-productos');
    // Limpiar la tabla antes de agregar nuevos datos
    tablaProductos.innerHTML = `
        <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Proveedor</th>
            <th>Categoría</th>
        </tr>
    `;
    productos.forEach(producto => {
        tablaProductos.innerHTML += `
            <tr>
                <td>${producto.IdProducto}</td>
                <td>${producto.NombreProducto}</td>
                <td>${producto.Proveedor}</td>
                <td>${producto.Categoría}</td>
            </tr>
        `;
    });
}

// Función para generar las opciones de las listas desplegables
function generarOpciones(productos) {
    const selectProveedor = document.getElementById('proveedor');
    const selectCategoria = document.getElementById('categoria');

    // Limpiar las opciones anteriores
    selectProveedor.innerHTML = '';
    selectCategoria.innerHTML = '';

    // Crear y agregar opción "Todos"
    const optionTodos = document.createElement('option');
    optionTodos.textContent = 'Todos';
    selectProveedor.appendChild(optionTodos.cloneNode(true));
    selectCategoria.appendChild(optionTodos.cloneNode(true));

    // Obtener proveedores y categorías únicos
    const proveedores = [...new Set(productos.map(producto => producto.Proveedor))];
    const categorias = [...new Set(productos.map(producto => producto.Categoría))];

    // Agregar opciones de proveedores
    proveedores.forEach(proveedor => {
        const option = document.createElement('option');
        option.textContent = proveedor;
        selectProveedor.appendChild(option);
    });

    // Agregar opciones de categorías
    categorias.forEach(categoria => {
        const option = document.createElement('option');
        option.textContent = categoria;
        selectCategoria.appendChild(option);
    });
}

// Evento para cargar la página
window.addEventListener('DOMContentLoaded', () => {
    cargarDatosJSON('data.json', productos => {
        cargarTabla(productos);
        generarOpciones(productos);
    });
});

// Función para aplicar los filtros
function aplicarFiltros() {
    const proveedorSeleccionado = document.getElementById('proveedor').value;
    const categoriaSeleccionada = document.getElementById('categoria').value;

    cargarDatosJSON('data.json', productos => {
        const productosFiltrados = productos.filter(producto => {
            return (proveedorSeleccionado === "Todos" || producto.Proveedor === proveedorSeleccionado) &&
                   (categoriaSeleccionada === "Todos" || producto.Categoría === categoriaSeleccionada);
        });

        cargarTabla(productosFiltrados);
    });
}

// Evento para aplicar filtros al hacer clic en el botón
document.getElementById('filtrar').addEventListener('click', () => {
    aplicarFiltros();
});
