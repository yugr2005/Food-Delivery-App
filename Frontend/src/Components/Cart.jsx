export function CartCard({ data, removeItem }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 flex flex-col md:flex-row justify-between items-center mb-4">
      {/* Image Section */}
      <div className="w-24 h-24 mb-4 md:mb-0 md:mr-4">
        <img
          src={data.image}
          alt={data.nameitem}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      {/* Item Details */}
      <div className="flex-1 text-center md:text-left">
        <h1 className="text-lg font-semibold text-gray-800">{data.nameitem}</h1>
        <p className="text-gray-600">Price: ${data.price}</p>
        <p className="text-gray-600">Quantity: {data.quantity}</p>
      </div>

      {/* Total Price */}
      <div className="text-right mt-4 md:mt-0">
        <p className="text-gray-600">Total:</p>
        <p className="text-xl font-bold text-gray-800">${(data.price * data.quantity).toFixed(2)}</p>
        <button 
          onClick={() => removeItem(data)} 
          className="mt-2  text-red-500 py-1 px-2 rounded"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
