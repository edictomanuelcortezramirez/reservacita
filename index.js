// recorre los datos almacenados en el Local Storage
for (let i = 1; i <= localStorage.length; i++) {
  const uniqueID = `formDataN°_${i}`;
  const formDataJSON = localStorage.getItem(uniqueID);

  if (formDataJSON) {
    const formData = JSON.parse(formDataJSON);

    // Construir la URL completa de la imagen utilizando la ruta base
    const imageBasePath = 'ruta_de_tus_imagenes/'; // Reemplaza con la ruta correcta
    const imageUrl = imageBasePath + formData.photo;

    // Crear una tarjeta HTML con los datos
    const card = document.createElement('div');
    card.classList.add('col-md-4', 'mb-3');
    card.innerHTML = `
        <div class="card">
          <img src="${formData.imageUrl}" class="card-img-top" alt="...">
          <p class="overlay-text">CS. ${formData.nameCenter}.<br><span>${
      formData.locationCenter
    }.</span></p>
          <img src="${formData.photo}" class="card-img-top-circule" alt="...">
          <a href="sheet.html?id=${encodeURIComponent(
            uniqueID
          )}"> <i class="fa-regular fa-calendar-plus icon-corner"></i></a>
          <div class="card-body">
            <h5 class="card-title">${formData.specialty}</h5>
            <p class="card-text">${formData.name} ${
      formData.lastName
    }<br>Santiago, Chile.</p>
          </div>
        </div>
      `;
    // Agregar la tarjeta al contenedor
    cardContainer.appendChild(card);
  }
}

// <a href="otra_pagina.html?id=${encodeURIComponent(uniqueID)}"> <!-- Agrega el enlace aquí -->
