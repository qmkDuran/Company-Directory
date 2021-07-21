// global variables
let employees = []; // employees -- empty array that will hold values from the API
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US` // urlAPI -- string literal that stores the url of the API, complete with desired options.
const gridContainer = document.querySelector(".grid-container"); // gridContainer -- stores the DOM element that is the container for the employees
const overlay = document.querySelector(".overlay"); // overlay -- stores the DOM element that acts as an overlay for the modal.
const modalContainer = document.querySelector(".modal-content"); // modalContainer -- stores the DOM element that is a container for the modal information.
const modalClose = document.querySelector(".modal-close"); // modalClose -- stores the DOM element that is the modal’s close button.

// fetch data from API 
fetch(urlAPI)
    .then(response => response.json())
    // .then(response => console.log(response))
    .then(response => response.results)
    .then(displayEmployees)
    .catch(err => console.log(err))

// display employees function
function displayEmployees(employeeData) {

    employees = employeeData;

    // store the employee HTM: as we create it
    let employeeHTML = '';

    // loop through each employee and create HTML markup
    employees.forEach((employee, index) =>{
        let name = employee.name;
        let email = employee.email;
        let city = employee.location.city;
        let picture = employee.picture;

        // template literals
        employeeHTML += `
            <div class="employeecard" data-index="${index}">
                <img class="avatar" src="${picture.large}">
                <div class="text-container">
                    <h2 class="name">${name.first} ${name.last}</h2>
                    <p class="email">${email}</p> 
                    <p class="address">${city}</p>
                </div>
            </div>        
        `
    });

    gridContainer.innerHTML = employeeHTML;
}

// displayModal function
function displayModal(index) {

    // destructuring
    // let { name, dob, phone, email, location: { city, street, state, postcode}, picture } = employees[index];

    //     let date = new Date(dob.date);

    let picture = employees[index].picture;
    let nameFirst = employees[index].name.first;
    let nameLast = employees[index].name.last;
    let email = employees[index].email;
    let city = employees[index].location.city;
    let phone = employees[index].phone;
    let streetNum = employees[index].location.street.number;
    let streetName = employees[index].location.street.name;
    let state = employees[index].location.state;
    let postCode = employees[index].location.postcode;
    
    let date = new Date(Date.parse(employees[index].dob.date)).toLocaleDateString(navigator.language)

        const modalHTML = `
            <img class="avatar" src="${picture.large}"/>
            <div class="text-container">
                <h2 class="name">${nameFirst} ${nameLast}</h2>
                <p class="email">${email}</p>
                <p class="address">${city}</p>
                <hr/>
                <p class="address">${phone}</p>
                <p class="address">${streetNum} ${streetName}, ${state} ${postCode}</p>
                <p class="address">Birthday:
                ${date}</p>
            </div>
        `;

        overlay.classList.remove("hidden");
        modalContainer.innerHTML = modalHTML;
}

// eventListener for gridContainer

gridContainer.addEventListener('click', e => {

    // make sure the click is not on the grid container itself
    if (e.target !== gridContainer) {

        // select the card element based on its proximity to actual element clicked

        const employeecard = e.target.closest(".employeecard");
        const index = employeecard.getAttribute("data-index");

        displayModal(index);
    }
});

// eventListener for modal overlay

modalClose.addEventListener('click', () => {
    overlay.classList.add("hidden");
});