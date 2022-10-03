const table = document.querySelector("#table");
console.log(table);

function createCheckersTable(parentElement: Element): void {
  if (parentElement) {
    for (let i = 0; i < 8; i++) {
      parentElement.innerHTML = `<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>`;
    }
  }
}

if (table) {
  createCheckersTable(table);
}
