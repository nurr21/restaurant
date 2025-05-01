import express from 'express';
import cors from 'cors';

const app = express();

const port = 4001;
app.use(express.json())
app.use(cors());

let reservations = [];

app.get('/reservations' , (req,res) => {
    res.json(reservations)
});

app.post('/reservations', (req, res) => {
    const { day, hour, numOfGuests} = req.body;
    console.log("Incoming reservation:", req.body);

    if (!day || !hour || !numOfGuests) {
        return res.status(400).json({ message: "Missing required fields: day or hour." });
    }

    const newReservation = {
        id: reservations.length + 1,
        day: day,
        hour: hour,
        numOfGuests: numOfGuests
    };

    reservations.push(newReservation);8
    res.status(201).json(newReservation);
});

app.delete('/reservations:id' , (req, res) =>{
    const reservationId = parseInt(req.params.id);
    const initialLength = reservations.length;

    reservations = reservations.filter(r => r.id !== reservationId);
    if (reservations.length === initialLength) {
        return res.status(404).json({ error: 'Reservation not found' });
    }
    res.json({ message: 'Your reservation was just deleted' });
})

app.listen(port, () => {
    console.log(`server is running at http://localhost:${port}`)
});