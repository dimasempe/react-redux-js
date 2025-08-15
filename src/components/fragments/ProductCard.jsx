import { useState } from "react";
import { TiMinus, TiPlus } from "react-icons/ti";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { useSelector } from "react-redux";
import { axiosBaseURL } from "@/lib/axios";
import { toast } from "sonner";
import { fetchCart } from "@/services/cartService";

export const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(0);
  const userSelector = useSelector((state) => state.user);
  

  const increaseQuantity = () => {
    if (quantity < product.stock) setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 0) setQuantity(quantity - 1);
  };

  

  const handleAddToCart = async () => {
    try {
      const responseCart = await axiosBaseURL.get("/carts", {
        params: { userId: userSelector.id, productId: product.id },
      });
      if (responseCart.data.length > 0) {
        if (responseCart.data[0].quantity + quantity > product.stock) {
          toast.error(
            "Product stock is not enough because the quantities in cart are more than the product stock!"
          );
          return;
        }
        await axiosBaseURL.patch(`/carts/${responseCart.data[0].id}`, {
          quantity: responseCart.data[0].quantity + quantity,
        });
        toast.success("Product added to cart!");
      } else {
        await axiosBaseURL.post("/carts", {
          userId: userSelector.id,
          productId: product.id,
          quantity,
        });
        fetchCart(userSelector.id);
        toast.success("Product added to cart!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="border-2 border-gray-200 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col gap-5 bg-white hover:bg-gray-50 group">
      <Link to={`/product/${product.id}`}>
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-52 object-cover rounded-2xl transition-transform duration-300 group-hover:scale-105"
        />

        <div className="mt-4 space-y-2">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
            {product.name}
          </h3>
          <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Rp {product.price.toLocaleString("id-ID")}
          </p>
          <p className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full inline-block">
            Stok: {product.stock}
          </p>
        </div>
      </Link>

      <div className="flex items-center gap-4 justify-center py-3">
        <Button
          size="icon"
          variant="outline"
          onClick={decreaseQuantity}
          disabled={quantity <= 0}
          className="h-12 w-12 rounded-full border-2 hover:bg-red-50 hover:border-red-300 disabled:opacity-50 transition-all duration-200"
        >
          <TiMinus className="w-5 h-5" />
        </Button>

        <div className="w-16 h-12 flex items-center justify-center font-bold text-lg">
          {quantity}
        </div>

        <Button
          size="icon"
          variant="outline"
          onClick={increaseQuantity}
          disabled={quantity >= product.stock}
          className="h-12 w-12 rounded-full border-2 hover:bg-green-50 hover:border-green-300 disabled:opacity-50 transition-all duration-200"
        >
          <TiPlus className="w-5 h-5" />
        </Button>
      </div>

      <Button
        className="w-full h-12 mt-4 rounded-2xl font-semibold text-base bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-400 transition-all duration-200 shadow-md hover:shadow-lg"
        disabled={quantity <= 0}
        onClick={handleAddToCart}
        type="button"
      >
        {quantity > 0 ? `Add ${quantity} to Cart` : "Select Quantity"}
      </Button>
    </div>
  );
};
