import { useState } from "react";
import { TiMinus, TiPlus } from "react-icons/ti";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(0);

  const increaseQuantity = () => {
    if (quantity < product.stock) setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 0) setQuantity(quantity - 1);
  };

  const handleAddToCart = () => {
    console.log("Add to cart:", {
      productId: product.id,
      quantity,
    });
  };

  return (
    <div className="border rounded-2xl p-4 shadow-sm flex flex-col gap-4">
      <Link to={`/product/${product.id}`}>
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-48 object-cover rounded-lg"
        />

        <div>
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p className="text-primary font-bold text-xl">
            Rp {product.price.toLocaleString("id-ID")}
          </p>
          <p className="text-muted-foreground text-sm">Stok: {product.stock}</p>
        </div>
      </Link>
      <div className="flex items-center gap-2 justify-between">
        <Button
          size="icon"
          variant="ghost"
          onClick={decreaseQuantity}
          disabled={quantity === 0}
        >
          <TiMinus />
        </Button>

        <span className="w-6 text-center">{quantity}</span>

        <Button
          size="icon"
          variant="ghost"
          onClick={increaseQuantity}
          disabled={quantity >= product.stock}
        >
          <TiPlus />
        </Button>
      </div>

      <Button
        className="w-full mt-2"
        onClick={handleAddToCart}
        disabled={quantity === 0}
      >
        Add to Cart
      </Button>
    </div>
  );
};
