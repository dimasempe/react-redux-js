import { Button } from "../ui/button";

export const CartItem = ({
  id,
  name,
  quantity,
  price,
  imageUrl,
  handleRemoveItem,
}) => {
  return (
    <div
      key={id}
      className="flex items-center gap-6 bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
    >
      <img
        src={imageUrl}
        alt={name}
        className="w-24 h-24 object-cover rounded-lg border-2 border-gray-100"
      />
      <div className="flex-1">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          {name}
        </h2>
        <p className="text-sm text-gray-500 mb-1">Quantity: {quantity}</p>
        <p className="text-lg font-bold text-blue-600">
          Rp {(price * quantity).toLocaleString("id-ID")}
        </p>
      </div>
      <Button
        variant="destructive"
        size="sm"
        onClick={() => handleRemoveItem(id)}
        className="bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded-lg transition-colors duration-200"
      >
        Remove
      </Button>
    </div>
  );
};
