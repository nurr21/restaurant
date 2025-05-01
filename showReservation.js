const reservedDate = document.getElementById("reservedDate")



function getReservations() {
    const saved = JSON.parse(localStorage.getItem("reservations")); // Note the key should match exactly
    if (!saved) return;

    console.log(saved);
    reservedDate.textContent = `Day: ${saved.day}, Hour: ${saved.hour}, Guests: ${saved.numOfGuests}`;
}
getReservations();