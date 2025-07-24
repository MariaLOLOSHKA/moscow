const filters = {
	cuisines: ['Русская', 'Итальянская', 'Китайская', 'Грузинская'],
	selected: {
		cuisines: [],
		district: '',
		maxPrice: 2500
	}
};

function initFilters() {
	const cuisineContainer = document.getElementById('cuisineOptions');
	filters.cuisines.forEach(cuisine => {
		const option = document.createElement('div');
		option.className = 'filter-option';
		option.textContent = cuisine;
		option.addEventListener('click', () => toggleCuisine(cuisine));
		cuisineContainer.appendChild(option);
	});
	
	const priceSlider = document.getElementById('priceSlider');
	const priceDisplay = document.getElementById('currentPrice');
	priceSlider.addEventListener('input', (e) => {
		filters.selected.maxPrice = e.target.value;
		priceDisplay.textContent = e.target.value;
	});
	
	document.getElementById('districtInput').addEventListener('input', (e) => {
    filters.selected.district = e.target.value;
	});
	
	document.getElementById('applyFilters').addEventListener('click', applyFilters);
	document.getElementById('resetFilters').addEventListener('click', resetFilters);
}

function toggleCuisine(cuisine) {
  const index = filters.selected.cuisines.indexOf(cuisine);
  if (index === -1) {
    filters.selected.cuisines.push(cuisine);
  } else {
    filters.selected.cuisines.splice(index, 1);
  }
  updateActiveFilters();
}

function applyFilters() {
  console.log('Применены фильтры:', filters.selected);
  // Здесь будет ваша логика фильтрации
  filterDropdown.classList.remove('show');
  
  // Пример: фильтрация массива заведений
  const filtered = places.filter(place => {
    return (
      (filters.selected.cuisines.length === 0 || 
       filters.selected.cuisines.some(c => place.cuisines.includes(c))) &&
      (filters.selected.district === '' || 
       place.district.includes(filters.selected.district)) &&
      place.averagePrice <= filters.selected.maxPrice
    );
  });
  
  displayResults(filtered);
}



function resetFilters() {
  filters.selected = {
    cuisines: [],
    district: '',
    maxPrice: 2500
  };
  document.getElementById('districtInput').value = '';
  document.getElementById('priceSlider').value = 2500;
  document.getElementById('currentPrice').textContent = '2500';
  updateActiveFilters();
}

function displayResults(places) {
  const container = document.getElementById('placesContainer');
  container.innerHTML = '';
  
  places.forEach(place => {
    const card = document.createElement('div');
    card.className = 'place-card';
    card.innerHTML = `
      <h3>${place.name}</h3>
      <p>Кухня: ${place.cuisines.join(', ')}</p>
      <p>Район: ${place.district}</p>
      <p>Средний чек: ${place.averagePrice} ₽</p>
    `;
    container.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', initFilters);