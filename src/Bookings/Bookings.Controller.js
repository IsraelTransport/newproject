const { getNextSequenceValue } = require('../Counters/CounterService');
const { createBookingInDB, getBookingsFromDB, getBookingByIDInDB, updateBookingInDB, deleteBookingFromDB } = require('./Bookings.db');
const Booking = require('./Bookings.Model');
const { sendEmail } = require('../EmailVerifying/email'); // Generalized email sending function

async function getBookings(req, res) {
    try {
        const bookings = await getBookingsFromDB();
        res.status(200).send(bookings);
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).send({ error: 'Internal server error' });
    }
}

async function getBookingByID(req, res) {
    const { id } = req.params;
    try {
        const booking = await getBookingByIDInDB(id);
        if (booking) {
            res.status(200).send(booking);
        } else {
            res.status(404).send({ error: 'Booking not found' });
        }
    } catch (error) {
        console.error('Error fetching booking by ID:', error);
        res.status(500).send({ error: 'Internal server error' });
    }
}

async function createBooking(req, res) {
    const { UserID, VehicleID, status, DepartureTime, Passengers, PickupAddress, DropOffAddress, FullName, Email, PhoneNumber, startTrailDate, endTrailDate, stopStations, notes } = req.body;

    if (!UserID || !VehicleID || !status || !DepartureTime || !Passengers || !PickupAddress || !DropOffAddress || !FullName || !Email || !PhoneNumber || !startTrailDate || !endTrailDate) {
        return res.status(400).send({ error: 'All required fields must be provided' });
    }

    try {
        const bookingID = await getNextSequenceValue('Bookings');
        const newBooking = new Booking({
            BookingID: bookingID,
            UserID,
            VehicleID,
            status,
            DepartureTime,
            Passengers,
            PickupAddress,
            DropOffAddress,
            FullName,
            Email,
            PhoneNumber,
            startTrailDate,
            endTrailDate,
            ...(stopStations && { stopStations }),
            notes
        });
        await createBookingInDB(newBooking);
        res.status(201).send({ message: 'Booking created successfully' });
    } catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).send({ error: 'Internal server error' });
    }
}


async function updateBooking(req, res) {
    const { id } = req.params;
    const updateData = req.body;

    try {
        const existingBooking = await getBookingByIDInDB(id);
        if (!existingBooking) {
            return res.status(404).send({ error: 'Booking not found' });
        }

        const isStatusChanged = existingBooking.status !== updateData.status;
        const updatedBooking = { 
            ...existingBooking._doc,
            ...updateData,
            BookingID: existingBooking.BookingID,
            _id: existingBooking._id
        };

        const result = await updateBookingInDB(id, updatedBooking);
        
        if (result.modifiedCount > 0) {
            res.status(200).send({ message: 'Booking updated successfully' });

            // Check if status is "Confirmed" or "Cancelled" and send email if status changed
            if (isStatusChanged && (updateData.status === 'Confirmed' || updateData.status === 'Cancelled')) {
                const emailSubject = `Booking ${updateData.status}`;
                const emailBody = `
                    <p>Dear ${existingBooking.FullName},</p>
                    <p>Your booking  has been ${updateData.status.toLowerCase()}.</p>
                    <p>Thank you for using our service!</p>
                `;
                
                await sendEmail(existingBooking.Email, emailSubject, emailBody);
            }
        } else {
            res.status(404).send({ error: 'Booking not found' });
        }
    } catch (error) {
        console.error('Error updating booking:', error);
        res.status(500).send({ error: 'Internal server error', details: error.message });
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

module.exports = { getBookings, getBookingByID, createBooking, updateBooking, deleteBooking };
