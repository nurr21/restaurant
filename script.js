const day = document.getElementById("day")
const hour = document.getElementById("hour")
const submitButton = document.getElementById("submit")
const monthYear = document.getElementById("monthYear")
const numOfGuests = document.getElementById("numOfGuests")
const reserveDate = document.getElementById("reserveDate")
const nextMonth = document.getElementById("nextMonth")
const prevMonth = document.getElementById("prevMonth")

submitButton.onclick = async function saveReservation(event) {
    event.preventDefault();
    const month = updateCalendar().textContent
    await addReservetion(day.value, month, hour.value, numOfGuests.value);
    day.selectedIndex = 0;
};

async function addReservetion(day, month, hour, numOfGuests) {
    try {
        const res = await fetch('http://localhost:4001/reservations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({day, month, hour, numOfGuests})
        });

        const data = await res.json();
        localStorage.setItem("reservations", JSON.stringify(data));
        
        console.log(data);
        if(data.message === "Missing required fields: day or hour." ){
            window.alert("Please fill out all your information")
        }
        else{
            window.alert("Your reservations was successfully reserved")
        }
        return data;

    } catch (err) {
        console.error("Fetch error:", err.message);
        window.alert("An error occured")
    }
}
const date = new Date();
const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
let currentMonth = date.getMonth(); // 0-based
const currentYear = date.getFullYear();
let totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();
console.log(`Days in Month: ${totalDays}`);
monthYear.textContent = monthNames[currentMonth];

function updateCalendar() {
    // Update the month name
    monthYear.textContent = `${monthNames[currentMonth]}`;
    totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();
    generateDayButton();
    return monthYear.textContent;

}

nextMonth.onclick = function (event){
    event.preventDefault();
    currentMonth++;
    if(!(currentMonth < 12)){
        currentMonth = 0;
    }
    updateCalendar();
    const monthName = monthNames[currentMonth]; //to be deleted after testing
    console.log(`Month: ${monthName}`); //to be deleted after testing

}
prevMonth.onclick = function (event){
    event.preventDefault();
    currentMonth--;
    if((currentMonth < 0)){
        currentMonth = 11;
    }
    updateCalendar();
    const monthName = monthNames[currentMonth]; //to be deleted after testing
    console.log(`Month: ${monthName}`); //to be deleted after testing
}

let selectedButton = null;
const daysContainer = document.getElementById("daysContainer");

function generateDayButton (){  
    daysContainer.innerHTML = ''; 

    for (let dayCount = 1; dayCount <= totalDays; dayCount++) {
    const dayButton = document.createElement("button");
    dayButton.type = "button";
    dayButton.textContent = dayCount;
    dayButton.className = "day-button";
    dayButton.onclick = function (e) {
        e.preventDefault();
        day.value = dayCount
        if (selectedButton) {
            selectedButton.classList.remove("active");
        }
        dayButton.classList.add("active");
        selectedButton = dayButton;
        console.log(day.value)
    };
    daysContainer.appendChild(dayButton);
}
}
updateCalendar();
