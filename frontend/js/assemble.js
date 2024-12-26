// frontend/js/assemble.js

fetch('http://localhost:5000/api/parts')
  .then((response) => response.json())
  .then((data) => {
    const partsContainer = document.getElementById('parts');
    data.forEach((part) => {
      const partElement = document.createElement('div');
      partElement.className = 'bg-white p-4 rounded shadow-md';
      partElement.innerHTML = `
        <h3 class="font-semibold">${part.name}</h3>
        <p>${part.type}</p>
        <p>$${part.price}</p>
        <p>${part.description}</p>
        <img src="${part.imageUrl}" alt="${part.name}" class="w-full h-40 object-cover rounded mt-4">
      `;
      partsContainer.appendChild(partElement);
    });
  })
  .catch((error) => console.error('Error fetching parts:', error));

