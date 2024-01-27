var categories = ['Lands', 'Creatures', 'Planeswalkers', 'Artifacts', 'Enchantments', 'Sorceries', 'Instants']; // Add more categories as needed

    var headers = document.getElementById('headers');
    var libraryRow = document.getElementById('libraryRow');
    var revealedRow = document.getElementById('revealedRow');
    var percentageRow = document.getElementById('percentageRow');

    categories.forEach(function(category, index) {
      // Create headers
      var header = document.createElement('th');
      header.textContent = category;
      headers.appendChild(header);

      // Create categories for library row
      var libraryCategory = document.createElement('td');
      /* libraryCategory.innerHTML = `
        <button onclick="decrement(${index}, 'library')">-</button>
        <span id="library-${index}">0</span>
        <button onclick="increment(${index}, 'library')">+</button>
      `; */

      libraryCategory.innerHTML = `
      <div class="plusminus stacked">
      <button onclick="decrement(${index}, 'library')"></button>
      <span id="library-${index}">0</span>
      <button onclick="increment(${index}, 'library')"></button>
      </div>
      `;

      //

        

      libraryRow.appendChild(libraryCategory);

      // Set default values for library row
  var defaultValues = [22, 8, 2, 3, 4, 9, 12]; // Add more default values as needed
  document.getElementById(`library-${index}`).textContent = defaultValues[index];

      // Create categories for revealed row
      var revealedCategory = document.createElement('td');
      /* revealedCategory.innerHTML = `
        <button onclick="decrement(${index}, 'revealed')">-</button>
        <span id="revealed-${index}">0</span>
        <button onclick="increment(${index}, 'revealed')">+</button>
      `; */
      revealedCategory.innerHTML = `
      <div class="plusminus stacked">
      <button onclick="decrement(${index}, 'revealed')"></button>
      <span id="revealed-${index}">0</span>
      <button onclick="increment(${index}, 'revealed')"></button>
      </div>
      `;

  
      revealedRow.appendChild(revealedCategory);

      // Create categories for percentage row
      var percentageCategory = document.createElement('td');
      percentageCategory.innerHTML = `
        <span id="percentage-${index}">0%</span>
      `;
      percentageRow.appendChild(percentageCategory);
    });

    window.increment = function(index, type) {
  var element = document.getElementById(`${type}-${index}`);
  var currentCount = parseInt(element.textContent);
  
  if (type === 'revealed') {
    var libraryCount = parseInt(document.getElementById(`library-${index}`).textContent);
    if (currentCount < libraryCount) {
      element.textContent = currentCount + 1;
      updatePercentages();
    }
  } else {
    element.textContent = currentCount + 1;
    updatePercentages();
  }
};

window.decrement = function(index, type) {
  var element = document.getElementById(`${type}-${index}`);
  var currentCount = parseInt(element.textContent);
  
  if (currentCount > 0) {
    element.textContent = currentCount - 1;
    updatePercentages();
  }
};

    function updatePercentages() {
  var totalLibraryCount = 0;
  var totalRevealedCount = 0;

  categories.forEach(function(category, index) {
    totalLibraryCount += parseInt(document.getElementById(`library-${index}`).textContent);
    totalRevealedCount += parseInt(document.getElementById(`revealed-${index}`).textContent);
  });

  var totalRemainingCount = totalLibraryCount - totalRevealedCount;

  categories.forEach(function(category, index) {
    var libraryCount = parseInt(document.getElementById(`library-${index}`).textContent);
    var revealedCount = parseInt(document.getElementById(`revealed-${index}`).textContent);
    var remainingCount = libraryCount - revealedCount;
    var percentage = totalRemainingCount === 0 ? 0 : Math.round((remainingCount / totalRemainingCount) * 100);
    document.getElementById(`percentage-${index}`).textContent = `${percentage}%`;
  });
}