document.addEventListener('DOMContentLoaded', () => {
  const carListSection = document.getElementById('car-list-section');
  const carDetailsSection = document.getElementById('car-details-section');
  const carList = document.getElementById('car-list');
  const carDetailsContainer = document.getElementById('car-details');
  const backToListButton = document.getElementById('back-to-list');
  const neptunKod = 'jeh60c';

  // Függvény az autók lista lekérdezésére a szerverről
  async function getCars() {
      try {
          const response = await fetch(`https://iit-playground.arondev.hu/api/${neptunKod}/car`);
          // Ha a válasz nem sikeres, dobunk egy hibát
          if (!response.ok) {
              throw new Error(`Hiba történt a lekérdezés során: ${response.status}`);
          }
          // A válasz JSON formátumának feldolgozása
          const cars = await response.json();
          // Az autók megjelenítése a listában
          showCarListOnPage(cars);
      } catch (error) {
          console.error('Hiba az autók betöltésekor:', error);
          carList.innerHTML = '<p>Hiba történt az autók betöltésekor.</p>';
      }
  }

  // Függvény az autók lista megjelenítésére a weboldalon
  function showCarListOnPage(cars) {
      carList.innerHTML = ''; // Először töröljük a meglévő listát
      cars.forEach(car => {
          // Létrehozunk egy új listaelem (<li>) minden autóhoz
          const listItem = document.createElement('li');
          listItem.innerHTML = `
              <h3>${car.brand} ${car.model}</h3>
              <button class="view-details-button" data-car-id="${car.id}">Részletek</button>
          `;
          // Megkeressük a "Részletek" gombot az aktuális listaelemben
          const detailsButton = listItem.querySelector('.view-details-button');
          // Eseményfigyelőt adunk a gombhoz, hogy kattintásra megjelenítse az autó részleteit
          detailsButton.addEventListener('click', () => getCarDetails(car.id));
          // Hozzáadjuk a listaelemet a fő autó listához (<ul>)
          carList.appendChild(listItem);
      });
  }

  // Függvény egy adott autó adatainak lekérdezésére
  async function getCarDetails(carId) {
      try {
          const response = await fetch(`https://iit-playground.arondev.hu/api/${neptunKod}/car/${carId}`);
          if (!response.ok) {
              throw new Error(`Hiba történt az autó adatainak lekérdezése során: ${response.status}`);
          }
          const carDetails = await response.json();
          displayCarDetails(carDetails);
      } catch (error) {
          console.error(`Hiba a(z) ${carId} azonosítójú autó adatainak betöltésekor:`, error);
          carDetailsContainer.innerHTML = '<p>Hiba történt az autó adatainak betöltésekor.</p>';
      }
  }

  // Függvény az adott autó részleteinek megjelenítésére a weboldalon
  function displayCarDetails(car) {
      carDetailsContainer.innerHTML = `
          <h3>${car.brand} ${car.model}</h3>
          <p>Azonosító: ${car.id}</p>
          <p>Tulajdonos: ${car.owner}</p>
          <p>Forgalomba helyezés: ${car.dayOfCommission}</p>
          <p>Elektromos: ${car.electric ? 'Igen' : 'Nem'}</p>
          <p>Üzemanyag fogyasztás: ${car.fuelUse}</p>
          <button id="back-to-list-button">Vissza a listához</button>
      `;
      // Megkeressük a "Vissza a listához" gombot a részletek nézetben
      const backButton = carDetailsContainer.querySelector('#back-to-list-button');
      // Eseményfigyelőt adunk a gombhoz, hogy kattintásra visszatérjünk a listához
      backButton.addEventListener('click', showCarListSection);
      // Elrejtjük az autó listát és megjelenítjük a részleteket
      carListSection.classList.add('hidden');
      carDetailsSection.classList.remove('hidden');
  }

  // Függvény az autó lista rész megjelenítésére
  function showCarListSection() {
      carListSection.classList.remove('hidden');
      carDetailsSection.classList.add('hidden');
  }

  // Eseményfigyelő a "Vissza a listához" gombhoz (az alapértelmezett gombhoz, ha már a részletek oldalon vagyunk)
  backToListButton.addEventListener('click', showCarListSection);

  // Az autók lista betöltése az oldal betöltődésekor
  getCars();
});