import React from 'react';

export default function BookingConfirmation({ bookingData, formData, onReset }) {
  const totalAmount = (bookingData.pricePerNight * bookingData.nights) + bookingData.taxesAndFees;
  const mockConfirmationNumber = "BK-849204"; // Replace with dynamic id from API if needed

  return (
    <div className="max-w-xl mx-auto p-8 bg-white text-center rounded-xl shadow-md border border-gray-100 my-12">
      <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold">
        ✓
      </div>
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Booking Confirmed!</h1>
      <p className="text-gray-600 mb-6">Thank you, {formData.firstName}. Your reservation is secured.</p>
      
      <div className="bg-gray-50 p-6 rounded-lg text-left mb-6 space-y-3 text-sm text-gray-700">
        <p><strong>Confirmation Number:</strong> #{mockConfirmationNumber}</p>
        <p><strong>Hotel:</strong> {bookingData.hotelName}</p>
        <p><strong>Room:</strong> {bookingData.roomType}</p>
        <p><strong>Dates:</strong> {bookingData.checkIn} to {bookingData.checkOut}</p>
        <p><strong>Total Paid:</strong> ${totalAmount.toFixed(2)}</p>
      </div>

      <p className="text-xs text-gray-400 mb-6">A confirmation email has been sent to {formData.email}</p>
      
      <button onClick={onReset} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition">
        Make Another Booking
      </button>
    </div>
  );
}
