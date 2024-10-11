const loadData = async () => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/peddy/pets`
  );
  const data = await res.json();
  const animals = data.pets;
  display(animals);
};
const loadCatagory = async (id) => {
  // console.log(id);
  const res = await fetch(
    `https://openapi.programming-hero.com/api/peddy/category/${id}`
  );
  const pet = await res.json();
  const animals = pet.data;
  display(animals);
};
const loadbtn = async () => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/peddy/categories`
  );
  const data = await res.json();
  const animals = data.categories;
  displaybtn(animals);
};

const displayModal = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/peddy/pet/${id}`
  );
  const data = await res.json();
  const animals = data.petData;
  const modalContainer = document.getElementById("modal");

  // Clear existing content
  modalContainer.innerHTML = "";

  const div = document.createElement("div");
  div.innerHTML = `
  <dialog id="my_modal_4" class="modal">
          <div class="modal-box w-11/12 max-w-2xl">
            <div class="h-[50%]">
              <img
                src="${animals.image}"
                alt=""
                class=" w-full rounded-lg"
              />
            </div>
            <div class="space-y-1">
              <h3 class="text-xl font-bold pt-6">${animals.pet_name}</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div>
                  <i class="fa-solid fa-table-cells-large"></i>
                  Breed: ${animals.breed}
                </div>
                <div>
                  <i class="fa-regular fa-calendar"></i>
                  Birth: ${animals.date_of_birth}
                </div>
                <div>
                  <i class="fa-solid fa-venus"></i>
                  Gender: ${animals.gender}
                </div>
                <div>
                  <i class="fa-solid fa-dollar-sign"></i>
                  price:${animals.price}$
                </div>
                <div>
                  <i class="fa-solid fa-venus"></i>
                  Vaccination status:${animals.vaccinated_status}
                </div>
              </div>
            </div>
            <div>
              <div class="my-4">
                <hr />
              </div>
              <div>
                <h3 class="font-semibold mb-3">Detials Information</h3>
                <p class="mb-4">
                  ${animals.pet_details}
                </p>
              </div>
            </div>
            <button id="close_modal" class="btn w-full">Close</button>
          </div>
        </dialog>
  `;

  modalContainer.appendChild(div);

  const modal = document.getElementById("my_modal_4");
  modal.showModal();

  // Add event listener to close the modal
  const closeModalButton = document.getElementById("close_modal");
  closeModalButton.addEventListener("click", () => {
    modal.close();
  });
};

const displaybtn = (data) => {
  const allbtn = document.getElementById("catagory-btn");
  for (const btn of data) {
    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML = `
    <button onclick="loadCatagory('${btn.category}')" class=" border-2 w-full flex justify-center items-center gap-4 h-28 rounded-lg font-bold text-2xl capitalize btn">
     <img src="${btn.category_icon}" alt="" />
          ${btn.category}
    </button>      
    `;
    allbtn.appendChild(buttonContainer);
  }
};

const display = (animals) => {
  const pet = document.getElementById("pets-display");
  const nullSection = document.getElementById("null-section");
  if (animals.length === 0) {
    nullSection.classList.remove("hidden");
    pet.classList.add("hidden");
  } else {
    nullSection.classList.add("hidden");
    pet.classList.remove("hidden");
    pet.innerText = "";
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
                    <button  onclick="displayModal('${animal.petId}')" class="btn rounded-md bg-white text-xl font-bold">
                      Details
                    </button>
                  </div>
                </div>
                
    `;
      pet.appendChild(div);
    }
  }
};

loadData();
loadbtn();
