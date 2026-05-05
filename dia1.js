const nombre = "Jonathan";
let edad = 20;
let leGustaProgramar = true;

console.log("Nombre:", nombre);
console.log("Edad inicial:", edad);
console.log("Le gusta programar:", leGustaProgramar);

edad = edad + 1;
console.log("Edad actualizada:", edad);

console.log("Tipo de nombre:", typeof nombre);
console.log("Tipo de edad:", typeof edad);
console.log("Tipo de leGustaProgramar:", typeof leGustaProgramar);

let ciudad = "Bogota";
ciudad = "Medellin";
console.log("Ciudad actualizada:", ciudad);

const pais = "Colombia";
//pais = "Peru"
console.log("Pais:", pais);

const producto = "Mouse gamer";
let precioBase = 120000;
const iva = 0.19;
const descuento = 0.10;

const montoIva = precioBase * iva;
const montoDescuento = precioBase * descuento;
const envio = 8000;
const precioFinal = precioBase + montoIva - montoDescuento + envio;

console.log ("Producto:", producto);
console.log ("Precio base:", precioBase);
console.log ("IVA:", montoIva);
console.log("Descuento:", montoDescuento);
console.log("Costo de envio:", envio);
console.log("Precio final:", precioFinal);

// PASO "2"//

function sumar (a, b) {
    return a + b;
}

const resultadoSuma = sumar(10, 5);
console.log("Resultado suma:", resultadoSuma);

const restar = (a, b) => {
    return a - b;
};

const resultadoResta = restar(10, 5 );
console.log("Resultado resta:", resultadoResta);

const calcularTotal = (precioBase, iva, descuento) => {
    const montoIva = precioBase * iva;
    const montoDescuento = precioBase * descuento;
    return precioBase + montoIva - montoDescuento;
};

const total = calcularTotal(120000, 0.19, 0.10);
console.log("Total a calculado:", total);


const cuadrado = (numero) => numero * numero;
const numero = 6;
console.log("El cuadrado de", numero, "es:", cuadrado(numero));

const esPar = (numero) => numero % 2 === 0;
console.log("10 es par?", esPar(10));
console.log("7 es par?", esPar(7));

const mensajeUsuario = (nombre, edad)  => "Hola, soy " + nombre + " y tengo " + edad + " años."; 
console.log(mensajeUsuario("jonathan", 20));


const costoBase = 8000; 
const calcularEnvio = (ciudad) => {
    if (ciudad === "Bogota") {
        return costoBase;
    }
    else {
        return costoBase + 4000;
    }
};

console.log("Costo de envio a Bogota:", calcularEnvio("Bogota"));
console.log("Costo de envio a Medellin:", calcularEnvio("Medellin"));
console.log("costo de envio a Cali:", calcularEnvio("Cali"));

const productos = [
    { nombre: "Mouse", precio: 45000 },
    { nombre: "Teclado", precio: 80000 },
    { nombre: "Monitor", precio: 600000 },
    { nombre: "Pad Mouse", precio: 20000 },
    { nombre: "Audifonos", precio: 120000 }
];

// 1) FILTER: productos con precio mayor a  50000
const caros = productos.filter((producto) => producto.precio > 50000);
console.log("Productos caros:", caros);

// 2) MAP: solo nombres de todos los productos
const nombres = productos.map((producto) => producto.nombre);
console.log("Nombres:", nombres);

//3) FIND: buscar producto por nombre
const buscado = productos.find((producto) => producto.nombre === "Monitor");
console.log("Producto encontrado:", buscado);

// 4) prueba filter
const baratos = productos.filter((producto) => producto.precio < 50000);
console.log("Productos baratos:", baratos);

// 5) Prueba MAP
const preciosConIva = productos.map((p) => p.precio * 1.19);
console.log("Precios con IVA:", preciosConIva);

const productosConIva = productos.map((p) => ({
    nombre: p.nombre,
    precioBase: p.precio,
    precioConIva: p.precio * 1.19
}));
console.log("Productos con IVA:", productosConIva);

// 6) Prueba FIND
const buscado2 = productos.find(p => p.nombre === "Teclado");
console.log("Producto encontrado:", buscado2);

const buscado3 = productos.find(p=> p.nombre === "Laptop");
console.log("Producto encontrado:", buscado3);

//Prueba reduce
const totalPreciosBase = productos.reduce((acumulador, productoActual) => {
    return acumulador + productoActual.precio;
}, 0);
console.log("Total precios base:", totalPreciosBase);

const totalPreciosConIva = productos.reduce((acumulador, productoActual) => {
    return acumulador + productoActual.precio * 1.19;
}, 0);
console.log("Total precios con IVA:", totalPreciosConIva);
//pruebas mezcladas
const tareas = [
    { id: 1, proyectoID: 1, titulo: "Definir alcance", estado: "completada", prioridad: "alta" },
    { id: 2, proyectoID: 1, titulo: "Diseñar interfaz", estado: "en_progreso", prioridad:"media" },
    { id: 3, proyectoID: 1, titulo: "Configurar repositorio", estado: "completada", prioridad: "baja"},
    { id: 4, proyectoID: 2, titulo: "Crear backlog", estado: "pendiente", prioridad: "alta"},
    { id: 5, proyectoID: 2, titulo: "Configurar autenticacion", estado: "completada", prioridad: "media"},
    { id: 6, proyectoID: 2, titulo: "Documentar API", estado: "en_progreso", prioridad: "media"}
]

const filtrarPendientes = tareas.filter((tarea) => tarea.estado === "pendiente");
console.log("Tareas pendientes:", filtrarPendientes);

const encontrarId4 = tareas.find(tarea => tarea.id === 4);
console.log("Tarea con ID 4:", encontrarId4);

const mapearTitulos = tareas.map(tarea => tarea.titulo);
console.log("Titulos de tareas:", mapearTitulos);


const tarea = { id: 1, titulo: "Diseñar interfaz", estado: "pendiente"};

const {titulo, estado } = tarea;
console.log(titulo);
console.log(estado);


const tareaOriginal = { id: 1, titulo: "diseñar interfaz", estado: "completada"};
const tareaActualizada = { ...tareaOriginal, estado: "completada"};

console.log(tareaOriginal.estado);
console.log(tareaActualizada.estado);

const tarea2 = tareas.find(t => t.id === 2);
console.log("Tarea original:", tarea2);

const { titulo:tituloTarea, estado:estadoTarea } = tarea2;
console.log("Titulo:", tituloTarea);
console.log("Estado:", estadoTarea);

const tarea2Actualizada = { ...tarea2, estado: "completada"};

console.log("Estado original:", tarea2.estado);
console.log("Estado actualizado:", tarea2Actualizada.estado);


const validarEstado = (estado) => {
    const estadosValidos = ["pendiente", "en_progreso", "completada"];
    return estadosValidos.includes(estado);
}

console.log("es 'pendiente' un estado valido?", validarEstado("pendiente"));
console.log("Es 'en_progreso' un estado valido?", validarEstado("en_progreso"));
console.log("Es 'completada' un estado valido?", validarEstado("completada"));


const validarPrioridad = (prioridad) => {
    const prioridadesValidas = ["baja", "media", "alta",];
    return prioridadesValidas.includes(prioridad);
}

console.log("Es 'baja' una prioridad valida?", validarPrioridad("baja"));
console.log("Es 'media' una prioridad valida?", validarPrioridad("media"));
console.log("Es 'urgente' valida?", validarPrioridad("urgente"));


const obtenerMensajeTarea = (tarea) => {
    if (tarea.estado === "completada") {
        return "COMPLETADA!:" + tarea.titulo;
    }
    else if (tarea.estado === "en_progreso"){
        return "EN PROGRESO:" + tarea.titulo;
    }
    else if (tarea.estado === "pendiente") {
        return "PENDIENTE:" + tarea.titulo;
    }
    else {
        return "Estado desconocido";
    }
}

console.log(obtenerMensajeTarea(tareas[0]));
console.log(obtenerMensajeTarea(tareas[1]));
console.log(obtenerMensajeTarea(tareas[2]));


const necesitaAtencion = (tarea) => {
    return tarea.estado === "pendiente" && tarea.prioridad === "alta";
};

console.log("La tarea 1 necesita atencion?", necesitaAtencion(tareas[0]));
console.log("La tarea 2 necesita atencion?", necesitaAtencion(tareas[1]));
console.log("La tarea 4 necesita atencion?", necesitaAtencion(tareas[3]));

console.log( tareas[0]);

const obtenerResumen = (tareas) => {
    return {
        total: tareas.length,
        pendientes: tareas.filter((t) => t.estado.trim().toLowerCase() === "pendiente").length,
        enProgreso: tareas.filter((t) => t.estado.trim().toLowerCase() === "en_progreso").length,
        completadas: tareas.filter((t) => t.estado.trim().toLowerCase() === "completada").length,
        atencionAlta: tareas.filter(
            (t) => 
                t.estado.trim().toLowerCase() === "pendiente" &&
                t.prioridad.trim().toLowerCase() === "alta"
        ).length,        
    };
};

const resumen = obtenerResumen(tareas);
console.log("Resumen de tareas:", resumen);