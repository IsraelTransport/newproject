const { 
    getBookingsFromDB, 
    getBookingByID, 
    createBookingInDB, 
    updateBookingInDB, 
    deleteBookingFromDB 
} = require('./Bookings.db');
const { getNextSequenceValue } = require('../counters.db');

async function getBookings(req, res) {
    try {
        const bookings = await getBookingsFromDB();
        res.status(200).send(bookings);
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).send({ error: 'Internal server error' });
    }
}

async function getBooking(req, res) {
    const { id } = req.params;
    try {
        const booking = await getBookingByID(id);
        if (booking) {
            res.status(200).send(booking);
        } else {
            res.status(404).send({ error: 'Booking not found' });
        }
    } catch (error) {
        console.error('Error fetching booking:', error);
        res.status(500).send({ error: 'Internal server error' });
    }
}


async function createBooking(req, res) {
    const bookingData = req.body;
    try {
        bookingData.BookingID = await getNextSequenceValue('Bookings');
        console.log(`Creating booking with BookingID: ${bookingData.BookingID}`);
        console.log('Booking data:', bookingData); // Log the booking data being sent
        const createdBookingId = await createBookingInDB(bookingData);
        res.status(201).send({ message: 'Booking created successfully', bookingId: createdBookingId });
    } catch (error) {
        console.error('Error creating booking:', error.message);
        res.status(500).send({ error: 'Internal server error', details: error.message });
    }
}




async function updateBooking(req, res) {
    const { id } = req.params;
    const bookingData = req.body;
    try {
        const updatedBooking = await updateBookingInDB(id, bookingData);
        if (updatedBooking.modifiedCount > 0) {
            res.status(200).send({ message: 'Booking updated successfully' });
        } else {
            res.status(404).send({ error: 'Booking not found' });
        }
    } catch (error) {
        console.error('Error updating booking:', error);
        res.status(500).send({ error: 'Internal server error' });
    }
}

async function deleteBooking(req, res) {
    const { id } = req.params;
    try {
        const deletedBooking = await deleteBookingFromDB(id);
        if (deletedBooking.deletedCount > 0) {
            res.status(200).send({ message: 'Booking deleted successfully' });
        } else {
            res.status(404).send({ error: 'Booking not found' });
        }
    } catch (error) {
        console.error('Error deleting booking:', error);
        res.status(500).send({ error: 'Internal server error' });
    }
}

module.exports = { getBookings, getBooking, createBooking, updateBooking, deleteBooking };


module.exports = { getBookings, getBooking, createBooking, updateBooking, deleteBooking };
