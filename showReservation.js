const reservedDate = document.getElementById("reservedDate");

function getReservations() {
    const saved = JSON.parse(localStorage.getItem("reservations"));
    if (!saved) return;

    reservedDate.innerHTML = `
        <div class="reservation-detail">📅 <span>Day:</span> ${saved.day}</div>
        <div class="reservation-detail">⏰ <span>Hour:</span> ${saved.hour}</div>
        <div class="reservation-detail">👥 <span>Guests:</span> ${saved.numOfGuests}</div>
    `;
}
getReservations();
