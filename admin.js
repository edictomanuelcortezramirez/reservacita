// funcion para obtener el contador de ID del Local Storage o inicializarlo en 1 si no existe
function getUniqueIDCounter() {
  const storedCounter = localStorage.getItem('uniqueIDCounter');
  return storedCounter ? parseInt(storedCounter) : 1;
}

// Funcion para actualizar el contador de ID en el Local Storage
function updateUniqueIDCounter(counter) {
  localStorage.setItem('uniqueIDCounter', counter.toString());
}

const imputsForm = document.getElementById('form');
const imputName = document.getElementById('name');
const imputLastName = document.getElementById('lastName');
const imputSpecialty = document.getElementById('specialty');
const imputTrainingCity = document.getElementById('trainingCity');
const imputPhoto = document.getElementById('photo');
const imputNameHealthCenter = document.getElementById('nameHealthCenter');
const imputLocationHealthCenter = document.getElementById(
  'locationHealthCenter'
);
const buttonSubmitForm = document.querySelector('.btn-primary');
const fechaInput = document.getElementById('fecha');
const horaInputs = [
  document.getElementById('hora1'),
  document.getElementById('hora2'),
  document.getElementById('hora3'),
  document.getElementById('hora4'),
  document.getElementById('hora5'),
];

const imagesHealthCenter = {
  SaludVida: 'img/2548931_138.jpg',
  BienestarTotal: 'img/edificio-lago-lado.jpg',
  ProSalud: 'img/moderno-edificio-oficinas.jpg',
  SanCura: 'img/paisaje-analogico-ciudad-edificios.jpg',
  SaludFutura: 'img/parque-centro-financiero-lujiazui-shanghai-china.jpg',
  VitalPlus: 'img/vista-edificio-disenado-vidrio.jpg',
};

imputNameHealthCenter.addEventListener('change', function () {
  const selectedOption = imputNameHealthCenter.value;
  const selectedImageUrl = imagesHealthCenter[selectedOption];
  console.log('URL de la imagen seleccionada:', selectedImageUrl);
});

imputsForm.addEventListener('submit', function (e) {
  e.preventDefault();
  if (
    imputName.value === '' ||
    imputLastName.value === '' ||
    imputSpecialty.value === '' ||
    imputTrainingCity.value === '' ||
    imputNameHealthCenter.value === '' ||
    imputLocationHealthCenter.value === ''
  ) {
    alert('Todos los campos son requeridos');
  } else {
    // Obtener el valor actual del contador de ID
    let uniqueIDCounter = getUniqueIDCounter();

    // generar un ID unico y estable
    const uniqueID = `formDataN°_${uniqueIDCounter}`;

    // obtener la imagen seleccionada y convertirla en URL
    const selectedImage = imputPhoto.files[0];

    if (selectedImage) {
      const imageUrl = URL.createObjectURL(selectedImage);

      const selectedOption = imputNameHealthCenter.value;
      const selectedImageUrl = imagesHealthCenter[selectedOption];

      // Obtener los valores de fecha y horas
      const fecha = fechaInput.value;
      const horas = horaInputs.map((input) => input.value);

      // Crear un objeto con los datos del formulario y la URL de la imagen
      const formData = {
        id: uniqueID,
        name: imputName.value,
        lastName: imputLastName.value,
        specialty: imputSpecialty.value,
        trainingCity: imputTrainingCity.value,
        photo: imageUrl,
        nameCenter: imputNameHealthCenter.value,
        locationCenter: imputLocationHealthCenter.value,
        imageUrl: selectedImageUrl,
        fecha: fecha,
        horas: horas,
      };

      // Convierte el objeto a una cadena JSON
      const formDataJSON = JSON.stringify(formData);

      // Almacena en el Local Storage con el ID unico como clave
      localStorage.setItem(uniqueID, formDataJSON);

      // Incrementa el contador de ID y actualizar en el Local Storage
      uniqueIDCounter++;
      updateUniqueIDCounter(uniqueIDCounter);

      console.log(
        `Datos almacenados en el Local Storage con ID único: ${uniqueID}`
      );

      imputsForm.reset();
    } else {
      alert('Selecciona una imagen válida');
    }
  }
});

// obtener la informacion de la cita confirmada del Local Storage
const citaConfirmadaJSON = localStorage.getItem('citaConfirmada');
if (citaConfirmadaJSON) {
  const citaConfirmada = JSON.parse(citaConfirmadaJSON);

  // mostrar la informacion en la etiqueta p
  const mensajeCita = document.getElementById('mensaje-cita');
  mensajeCita.textContent = `El Dr. ${citaConfirmada.name} ${citaConfirmada.lastName} 
  tiene cita para: ${citaConfirmada.fecha} a las: ${citaConfirmada.hora}`;
} else {
  // mensajeCita.textContent = 'No hay información de cita confirmada.';
}
