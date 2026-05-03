'use  strict';
// clave con la cual se guarda en local
const STORAGE_KEY = 'tareas';

//elemetos del DOM
const input = document.querySelector("#input-tarea");
const btnAgregar = document.querySelector("#btn-agregar");
const lista = document.querySelector("#lista-tareas");
const btnLimpiar = document.querySelector("#btn-limpiar");

// memoria de listado
let tareas = [];

//funciones de storage
function loadStorage() {
    const datos = localStorage.getItem(STORAGE_KEY);
    return datos ? JSON.parse(datos) : [];
}

function saveTask() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tareas));
}

//funciones de logica

function agregarTarea(texto) {
    if(!texto.trim()) return;
    const nuevaTarea = {
        id: Date.now(),
        texto: texto.trim(),
        completada: false
    };
    tareas.push(nuevaTarea);
    saveTask();
    renderTareas();
    input.value = '';
    input.focus();         
}
   
function eliminarTarea(id) {    
//    const tareas = tareas.find (tarea => tarea.id === id);
//    if (tarea) {
//        tareas.remove(tarea);
//}
    tareas = tareas.filter(tarea => tarea.id !== id);
        saveTask();
        renderTareas();
    }


function toogleTarea(id) {
    const tarea = tareas.find(tarea => tarea.id === id);
    if (tarea) {
        tarea.completada = !tarea.completada;
    }
        saveTask();
        renderTareas();
    
}

function clearAll(){
    if(tareas.length === 0) return;
    if(confirm('¿Desea eliminar todas las tareas?')) {
        tareas = [];
        saveTask();
        renderTareas();
    }
}

function renderizar() {
  
  lista.innerHTML = '';

  
  if (tareas.length === 0) {
    const vacio = document.createElement('p');
    vacio.className = 'vacio';
    vacio.textContent = 'No hay tareas. ¡Agrega una!';
    lista.appendChild(vacio);
    btnLimpiar.disabled = true;
    return;
  }

  btnLimpiar.disabled = false;

  
  tareas.forEach(tarea => {
    const item = document.createElement('div');
    item.className = 'item-tarea';
    if (tarea.completada) {
      item.classList.add('completada');
    }

    
    const texto = document.createElement('span');
    texto.className = 'texto-tarea';
    texto.textContent = tarea.texto;
    texto.addEventListener('click', () => toggleTarea(tarea.id));

    
    const btnEliminar = document.createElement('button');
    btnEliminar.className = 'btn-eliminar';
    btnEliminar.textContent = 'Eliminar';
    btnEliminar.addEventListener('click', () => eliminarTarea(tarea.id));

    item.appendChild(texto);
    item.appendChild(btnEliminar);
    lista.appendChild(item);
  });
}

btnAgregar.addEventListener('click', () => {
  agregarTarea(input.value);
});

input.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    agregarTarea(input.value);
  }
});

btnLimpiar.addEventListener('click', clearAll);


// Cargar tareas guardadas al abrir la página
tareas = cargarDelStorage();
renderizar();
input.focus();