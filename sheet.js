// Obtiene el ID de la URL
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

// Obtiene una referencia al elemento donde se mostrara la información
const infoContainer = document.getElementById('info-container');

// Verifica si se proporciono un ID en la URL
if (id) {
  // Obtiene los datos correspondientes al ID desde el Local Storage
  const formDataJSON = localStorage.getItem(id);

  if (formDataJSON) {
    const formData = JSON.parse(formDataJSON);

    // Crea elementos HTML para mostrar la informacion
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <div class="card" style="border:none;">
        <div class="row g-0 m-0">
          <div class="col-3">
            <img src="${formData.photo}" class="card-img-top" alt="...">
          </div>
          <div class="col-2">
            <div class="card-body">
              <h5 class="card-title">${formData.specialty}</h5>
              <p class="card-text">${formData.name} ${formData.lastName}<br>Santiago, Chile.</p>
            </div>
          </div>
          <div class="col-7">
            <div class="card-body">
              <h5 class="card-texts">Fecha: ${formData.fecha}</h5>
              <p class="card-texts">Horas Disponibles:<br></p>
            </div>
          </div>
        </div>
      </div>
    `;

    // Agregar botones para las horas
    formData.horas.forEach((hora, index) => {
      const horaButton = document.createElement('button');
      horaButton.classList.add('btn', 'btn-primary');
      horaButton.textContent = `Hora ${index + 1}: ${hora}`;

      // Comprueba si la hora esta en el registro de horas confirmadas en el Local Storage
      const confirmedHours =
        JSON.parse(localStorage.getItem(`confirmedHours_${id}`)) || [];
      if (confirmedHours.includes(hora)) {
        horaButton.disabled = true; // Si está confirmada, inhabilitar el botón
      }

      // Agrega un evento click a cada boton de hora
      horaButton.addEventListener('click', function () {
        // Verifica si la hora ya ha sido confirmada
        if (confirmedHours.includes(hora)) {
          alert('Esta hora ya ha sido confirmada.');
        } else {
          // Muestra una alerta de confirmacion al hacer clic en el boton
          const confirmCita = confirm(
            `¿Confirma cita el día: ${formData.fecha} a las ${hora}?`
          );

          if (confirmCita) {
            alert('Cita confirmada. ¡Gracias!');

            // Registra la hora confirmada en el Local Storage
            confirmedHours.push(hora);
            localStorage.setItem(
              `confirmedHours_${id}`,
              JSON.stringify(confirmedHours)
            );

            // Envia un mensaje a la pagina admin.html usando el Local Storage
            const citaConfirmada = {
              name: formData.name,
              lastName: formData.lastName,
              fecha: formData.fecha,
              hora: hora,
            };
            localStorage.setItem(
              'citaConfirmada',
              JSON.stringify(citaConfirmada)
            );

            // window.location.href = 'admin.html';

            location.reload();
          }
        }
      });

      card.querySelector('.card-texts:last-child').appendChild(horaButton);
    });

    // Agrega la tarjeta al contenedor
    infoContainer.appendChild(card);
  } else {
    // Mostrar un mensaje si no se encuentra el ID en el Local Storage
    infoContainer.textContent = 'ID no encontrado.';
  }
} else {
  // Mostrar un mensaje si no se proporciono un ID en la URL
  infoContainer.textContent = 'ID no especificado en la URL.';
}
