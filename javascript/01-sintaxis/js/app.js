'use strict';

const nombre = 'Jonnathan';
const apellido = 'Parraga';
const fullName = nombre + ' ' + apellido;
let ciclo = 5;
const activo = true;

const direccion = {
    ciudad: 'Cuenca',
    provincia: 'Azuay',
    pais: 'Ecuador'
}
console.table({nombre, apellido, fullName, ciclo, activo, direccion });

const calcularPromedio = (notas) => // promedio = suma de notas / cantidad de notas
    notas.reduce((suma, nota) => suma + nota, 0) / notas.length;

const esMayorDeEdad = (edad) => edad >= 18;

const getSaludo = (nombre, hora) => {
    if (hora < 12) {
        return `Buenos días, ${nombre}`;
    } else if (hora < 18) {
        return `Buenas tardes, ${nombre}`;
    } else {
        return `Buenas noches, ${nombre}`;
    }
}
const getSaludo2 = (nombre, hora) => hora < 12
        ? `Buenos días, ${nombre}`
        : hora < 18
            ? `Buenas tardes, ${nombre}`
            : `Buenas noches, ${nombre}`;

//Mostrar en HTML
document.getElementById('nombre').textContent = `${nombre} `;
document.getElementById('apellido').textContent = `${apellido}`;
document.getElementById('ciclo').textContent = `Ciclo: ${ciclo}`;