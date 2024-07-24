const { getBookingsFromDB, createBookingInDB } = require('./Bookings.db'); // Ensure this matches the file name exactly

async function getBookings(req, res) {
    try {
        const bookings = await getBookingsFromDB();
        res.status(200).send(bookings);
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).send({ error: 'Internal server error' });
    }
}

async function createBooking(req, res) {
    const booking = req.body;

    if (!booking) {
        return res.status(400).send({ error: 'Booking is null.' });
    }

    try {
        const createdBooking = await createBookingInDB(booking);
        res.status(201).send(createdBooking);
    } catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).send({ error: 'Internal server error' });
    }
}

module.exports = { getBookings, createBooking };
