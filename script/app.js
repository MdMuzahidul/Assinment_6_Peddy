function loadData() {
  fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then((res) => res.json())
    .then((data) => display(data));
}
loadData();
function display(animals) {
  //   const petDosplay = document.getElementById("pets-display");
  for (const animal in animals) {
    console.log(animal);
  }
}
