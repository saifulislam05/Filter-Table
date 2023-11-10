const inputBox = document.getElementById("input_box");
const tableBody = document.getElementById("table_body");

document.addEventListener("DOMContentLoaded", () => {
  renderUi(countries);
});

function renderUi(list) {
  tableBody.innerHTML = "";
  const fragment = document.createDocumentFragment();

  list.forEach((item) => {
    let row = document.createElement("tr");
    // Highlight the matched text in the capital and country columns
    const capitalHtml = highlightMatchedText(item.capital, inputBox.value);
    const countryHtml = highlightMatchedText(item.country, inputBox.value);
    row.innerHTML = `
              <td class="text-base">${capitalHtml}</td>
              <td class="text-base">${countryHtml}</td>
            `;
    fragment.appendChild(row);
  });

  tableBody.appendChild(fragment);
}

function highlightMatchedText(text, searchTerm) {
  // If there's no search term, return the original text
  if (!searchTerm) {
    return text;
  }

  // Create a RegExp to match the search term case-insensitively
  const regex = new RegExp(searchTerm, "ig");

  // Replace the matched text with a span having a specific class for styling
  const highlightedText = text.replace(
    regex,
    (match) => `<span  style="color:#e9ff32">${match}</span>`
  );

  return highlightedText;
}

inputBox.addEventListener("input", filterByInput);

function filterByInput(e) {
  const inputValue = e.target.value.toLowerCase();
  const filteredItems = filterList(countries, inputValue);
  renderUi(filteredItems);
}
function filterList(list, inputValue) {
  return list.filter((item) => {
    const searchTerms = [
      item.capital.toLowerCase(),
      item.country.toLowerCase()
    ];
    return searchTerms.some((term) => term.includes(inputValue));
  });
}