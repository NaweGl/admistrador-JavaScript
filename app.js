// Campos del formulario 
const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');

//Interfaz del usuario (UI)
const formulario = document.querySelector('#nueva-cita');
const contenedorCitas = document.querySelector('#citas');

let editando;

class Citas{
  constructor(){
     this.citas = [];

 }

 agregarCita(cita){
  this.citas = [...this.citas, cita]
 

 }

 eliminarCita(id){
  this.citas = this.citas.filter(cita => cita.id !== id)

}

editarCita(citaAcuatualizada){

  this.citas = this.citas.map(cita => cita.id === citaAcuatualizada.id ? citaAcuatualizada : cita )
}

}

class UI {

  imprimirAlerta(mensaje, tipo){

    // Crear el Div
    const divMensaje = document.createElement('div');
    divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12');

    //Agregar clase en base al tipo de error
    if(tipo === 'error'){
    divMensaje.classList.add('alert-danger')

  }else{

    divMensaje.classList.add('alert-success');
  }

  //Mensaje de error 
  divMensaje.textContent = mensaje;

  //Agregar al DOM
  document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('.agregar-cita'));

  //Quitar alerta despues de 5 segundos
  setTimeout(() => {
    divMensaje.remove();
  }, 5000);
}

   imprimirCitas({citas}){
    
   this.limpiarHTML();
   citas.forEach( cita => {

    const { mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;
    const divCita = document.createElement('div')
    divCita.classList.add('cita', 'p-3');
    divCita.dataset.id = id;

    // Scripting de los elementos de las citas
    const mascotaParrafo = document.createElement('h2');
    mascotaParrafo.classList.add('card-title', 'font-weith-bolder');
    mascotaParrafo.textContent = mascota;

    const propietarioParrafo = document.createElement('p');
    propietarioParrafo.innerHTML = `
    
     <span class="font-weight-bolder"> Propietario: <span/> ${propietario}

    `;

    const telefonoParrafo = document.createElement('p');
    telefonoParrafo.innerHTML = `
    
     <span class="font-weight-bolder"> Teléfono: <span/> ${telefono}

    `;

    const horaParrafo = document.createElement('p');
    horaParrafo.innerHTML = `
    
     <span class="font-weight-bolder"> Hora: <span/> ${hora}

    `;

    const fechaParrafo = document.createElement('p');
    fechaParrafo.innerHTML = `
    
     <span class="font-weight-bolder"> Fecha: <span/> ${fecha}

    `;

    const sintomasParrafo = document.createElement('p');
    sintomasParrafo.innerHTML = `
    
     <span class="font-weight-bolder"> Síntomas: <span/> ${sintomas}

    `;

    //Boton para eliminar esta cita

    const btnEliminar = document.createElement('button');
    btnEliminar.classList.add('btn','btn-danger')
    btnEliminar.innerHTML = 'Eliminar';
    
    
    
    btnEliminar.onclick = () => eliminarCita(id)

    // Añadir botón para editar

    const btnEditar = document.createElement('button');
    btnEditar.classList.add('btn','btn-info', 'ml-2');
    btnEditar.innerHTML = 'Editar';
    btnEditar.onclick = () => cargarEdicion(cita)
    
    //Agregar los parrafos al div cita
    divCita.appendChild(mascotaParrafo);
    divCita.appendChild(propietarioParrafo);
    divCita.appendChild(telefonoParrafo);
    divCita.appendChild(fechaParrafo);
    divCita.appendChild(horaParrafo);
    divCita.appendChild(sintomasParrafo);
    divCita.appendChild(btnEliminar);
    divCita.appendChild(btnEditar);

    //Agregar citas al HTML
    contenedorCitas.appendChild(divCita);

   })

   }

   limpiarHTML(){

    while(contenedorCitas.firstChild){

      contenedorCitas.removeChild(contenedorCitas.firstChild)
    }
   }
   
 }

const ui = new UI();
const administrarCitas = new Citas() 

//Registrar eventos
eventListener();
function eventListener(){
  
  mascotaInput.addEventListener('change', datosCitas);
  propietarioInput.addEventListener('change', datosCitas);
  telefonoInput.addEventListener('change', datosCitas);
  fechaInput.addEventListener('change', datosCitas);
  horaInput.addEventListener('change', datosCitas);
  sintomasInput.addEventListener('change', datosCitas);

  formulario.addEventListener('submit', nuevaCita);
}

//Objeto con información de la cita
const citaObj = {

    mascota: '',
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''
}

// Agrega datos con la información de la cita
function datosCitas(e){

    citaObj[e.target.name] = e.target.value;
    //console.log(citaObj);
}


// Valida y agrega una nueva cita a la clase de citas
function nuevaCita(e){

    e.preventDefault();

    // Extraer información del objeto de cita
    const { mascota, propietario, telefono, fecha, hora, sintomas} = citaObj;

    //validar
    if(mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas ===''){

        ui.imprimirAlerta('Todos los campos son obligatorios', 'error')

        return;
    }

    if(editando){

      ui.imprimirAlerta('Editado correctamente');

      // Pasar el objeto de la cita a idición

      administrarCitas.editarCita({...citaObj})

      // Regresar el texto del boton a su estado original
      formulario.querySelector('button[type="submit"]').textContent = 'Crear cita';

      // Quitando modo idicion 
      editando = false;

    }else{

    // Generar un ID único
    citaObj.id = Date.now();

    //Creando una nueva cita

    administrarCitas.agregarCita({...citaObj});

    // Mensaje de agregado correctamente
    ui.imprimirAlerta('Se agrego correctamente');

    }

    

    //Reiniciar el objeto para la validación
    reiniciarObjeto();

    //Reinicia el formulario
    formulario.reset();

    // Mostrar el HTML en de las citas

    ui.imprimirCitas(administrarCitas);
}


function reiniciarObjeto(){

  citaObj.mascota = '';
  citaObj.propietario = '';
  citaObj.telefono = '';
  citaObj.fecha = '';
  citaObj.hora = '';
  citaObj.sintomas = '';

}


function eliminarCita(id) {

  // Eliminar la cita
  administratCita.eliminarCita(id)

  // Muestre un mensaje
  ui.imprimirAlerta('La cita se eliminó correctamente');

  // Refrescar las citas
  ui.imprimirCitas(administrarCita);
}

//Cargar datos y el modo edicion

function cargarEdicion(cita){

  const { mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;

  // Llenar los input
  mascotaInput.value = mascota;
  propietarioInput.value = propietario;
  telefonoInput.value = telefono;
  fechaInput.value = fecha;
  horaInput.value = hora;
  sintomasInput.value = sintomas;

  // Llenar el objeto 
  citaObj.mascota = mascota;
  citaObj.propietario = propietario;
  citaObj.telefono = telefono;
  citaObj.fecha = fecha;
  citaObj.hora = hora;
  citaObj.sintomas = sintomas;
  citaObj.id = id;


  // Cambiar el texto del boton

  formulario.querySelector('button[type="submit"]').textContent = 'Guardar cambios'

  editando = true;
}