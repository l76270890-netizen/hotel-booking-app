import React from 'react';

export default function Payment({ bookingData, formData, onInputChange, onBack, onNext }) {
  const totalAmount = (bookingData.pricePerNight * bookingData.nights) + bookingData.taxesAndFees;

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-100 my-12">
      <h1 className="text-2xl font-bold mb-2 text-gray-800">Secure Payment</h1>
      <p className="text-sm text-gray-500 mb-6 font-medium">
        Amount to charge: <span className="font-bold text-gray-800">${totalAmount.toFixed(2)}</span>
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Cardholder Name</label>
          <input type="text" name="cardName" value={formData.cardName} onChange={onInputChange} className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="John Doe" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Card Number</label>
          <input type="text" name="cardNumber" value={formData.cardNumber} onChange={onInputChange} className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="1234 5678 1234 5678" required />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Expiry Date</label>
            <input type="text" name="expiry" value={formData.expiry} onChange={onInputChange} className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="MM/YY" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">CVC</label>
            <input type="text" name="cvc" value={formData.cvc} onChange={onInputChange} className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="123" required />
          </div>
        </div>

        <div className="pt-4 flex gap-3">
          <button type="button" onClick={onBack} className="w-1/3 border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 rounded-lg font-medium transition">
            Back
          </button>
          <button type="submit" className="w-2/3 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition">
            Pay Now
          </button>
        </div>
      </form>
    </div>
  );
}
