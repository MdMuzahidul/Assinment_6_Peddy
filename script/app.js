const loadbtn = async () => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/peddy/categories`
  );
  const data = await res.json();
  const animals = data.categories;
  displaybtn(animals);
};

loadbtn();

function displaybtn(catagory) {
  const allbtn = document.getElementById("catagory-btn");
  for (const btn of catagory) {
    const button = document.createElement("button");
    button.classList.add(
      "border-2",
      "flex",
      "justify-center",
      "items-center",
      "gap-4",
      "h-28",
      "rounded-lg",
      "font-bold",
      "text-2xl",
      "capitalize"
    );

    button.innerHTML = `
     <img src="${btn.category_icon}" alt="" />
          ${btn.category}
    `;
    allbtn.appendChild(button);
  }
}

const loadData = async () => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/peddy/pets`
  );
  const data = await res.json();
  const animals = data.pets;
  display(animals);
};

loadData();

function display(animals) {
  const pet = document.getElementById("pets-display");
  // console.log(pet);
  for (const animal of animals) {
    const div = document.createElement("div");
    div.classList.add(
      "border-2",
      "p-6",
      "rounded-xl",
      "md:col-span-6",
      "lg:col-span-4"
    );
    div.innerHTML = `
                <div>
                  <img
                    src="${animal.image}"
                    alt=""
                    class="w-full rounded-lg"
                  />
                </div>
                <div class="space-y-1">
                  <h3 class="text-xl font-bold pt-6">${animal.pet_name}</h3>
                  <div>
                    <i class="fa-solid fa-table-cells-large"></i>
                    Breed:${animal.breed}
                  </div>
                  <div>
                    <i class="fa-regular fa-calendar"></i>
                    Birth:${animal.date_of_birth}
                  </div>
                  <div>
                    <i class="fa-solid fa-venus"></i>
                    Gender:${animal.gender}
                  </div>
                  <div>
                    <i class="fa-solid fa-dollar-sign"></i>
                    price:${animal.price}$
                  </div>
                </div>
                <div>
                  <div class="my-4">
                    <hr />
                  </div>
                  <div class="flex justify-between gap-2 flex-wrap">
                    <button class="btn rounded-md bg-white text-xl">
                      <i class="fa-regular fa-thumbs-up"></i>
                    </button>
                    <button class="btn rounded-md bg-white text-xl font-bold">
                      Adopt
                    </button>
                    <button class="btn rounded-md bg-white text-xl font-bold">
                      Details
                    </button>
                  </div>
                </div>
    `;
    pet.appendChild(div);
  }
}
