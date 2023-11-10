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
    row.innerHTML = `
              <td class="text-base">${item.capital}</td>
              <td class="text-base">${item.country}</td>
            `;
    fragment.appendChild(row);
  });

  tableBody.appendChild(fragment);
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