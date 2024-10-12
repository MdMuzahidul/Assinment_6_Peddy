const loadData = () => {
  fetch(`https://openapi.programming-hero.com/api/peddy/pets`)
    .then((res) => res.json())
    .then((animals) => display(animals.pets));
};

const loadCatagory = (id) => {
  fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`)
    .then((res) => res.json())
    .then((animals) => {
      allButton();
      const selectButton = document.getElementById(`btn-${id}`);
      selectButton.classList.remove("rounded-lg", "bg-white", "hover:bg-white");
      selectButton.classList.add("active");
      // console.log(`btn-${id}`);
      display(animals.data);
    });
};
const allButton = () => {
  const allButton = document.getElementsByClassName("btn-class-list");
  for (let btn of allButton) {
    btn.classList.remove("active");
    btn.classList.add("rounded-lg", "bg-white", "hover:bg-white");
  }
};

const loadbtn = () => {
  fetch(`https://openapi.programming-hero.com/api/peddy/categories`)
    .then((res) => res.json())
    .then((animals) => displaybtn(animals.categories));
};

const displayModal = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/peddy/pet/${id}`
  );
  const data = await res.json();
  const animals = data.petData;
  const modalContainer = document.getElementById("modal");
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
                  price: ${animals.price}$
                </div>
                <div>
                  <i class="fa-solid fa-venus"></i>
                  Vaccination status: ${animals.vaccinated_status}
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
    <button id="btn-${btn.category}" onclick="loadCatagory('${btn.category}')" class="bg-white hover:bg-white border-2 w-full flex justify-center items-center gap-4 h-28 rounded-lg font-bold text-2xl capitalize btn btn-class-list">
     <img src="${btn.category_icon}" alt="" />
          ${btn.category}
    </button>      
    `;
    allbtn.appendChild(buttonContainer);
  }
};

const displayImage = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/peddy/pet/${id}`
  );
  const data = await res.json();
  const animals = data.petData;
  const imageContainer = document.getElementById("image-container");
  const div = document.createElement("div");
  div.innerHTML = `
    <img src="${animals.image}" alt="" class="rounded-md" />
  `;
  imageContainer.appendChild(div);
};

const changeText = (petId) => {
  const button = document.querySelector(
    `button[onclick="changeText('${petId}')"]`
  );
  if (button) {
    button.innerText = "Adopted";
    button.disabled = true;
  }
};

const display = (animals) => {
  const loader = document.getElementById("loading-screen");
  const displayAllPets = document.getElementById("display1");
  loader.classList.remove("hidden");
  displayAllPets.classList.add("hidden");
  setTimeout(() => {
    loader.classList.add("hidden");
    displayAllPets.classList.remove("hidden");
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
                      <button onclick="displayImage('${animal.petId}')" class="btn rounded-md bg-white text-xl">
                        <i class="fa-regular fa-thumbs-up"></i>
                      </button>
                      <button onclick="changeText('${animal.petId}')" class="btn rounded-md bg-white text-xl font-bold">
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
  }, 2000);
};
loadData();
loadbtn();
