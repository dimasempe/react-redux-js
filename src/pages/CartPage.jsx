import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import AuthedPage from "@/components/guard/AuthedPage";
import { useEffect, useState } from "react";
import { axiosBaseURL } from "@/lib/axios";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { fetchCart } from "@/services/cartService";
import { CartItem } from "@/components/fragments/CartItem";

function CartPage() {
  const [cartItems, setCartItems] = useState([]);

  const cartSelector = useSelector((state) => state.cart);

  const userSelector = useSelector((state) => state.user);

  const total = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const tax = total * 0.1;

  const getUserCarts = async () => {
    const storedUserId = JSON.parse(localStorage.getItem("currentUser"));
    await axiosBaseURL
      .get("/carts", {
        params: {
          userId: storedUserId,
          _embed: "product",
        },
      })
      .then((response) => {
        setCartItems(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    getUserCarts();
  }, []);

  const handleRemoveItem = (id) => {
    console.log(id);
    axiosBaseURL
      .delete(`/carts/${id}`)
      .then(() => {
        fetchCart(userSelector.id);
        toast.success("Product removed from cart!");
        setCartItems((prev) => prev.filter((item) => item.id !== id));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleCheckout = async () => {
    for (let i = 0; i < cartItems.length; i++) {
      const currentCartItem = cartSelector.items[i];

      if (currentCartItem.quantity > currentCartItem.product.stock) {
        toast.error("Product stock is not enough!");
        return;
      }
    }

    await axiosBaseURL.post("/transactions", {
      userId: userSelector.id,
      totalPrice: total,
      tax,
      transactionDate: new Date(),
      items: cartSelector.items,
    });

    cartSelector.items.forEach(async (cartItem) => {
      await axiosBaseURL.patch(`/products/${cartItem.product.id}`, {
        stock: cartItem.product.stock - cartItem.quantity,
      });
    });

    cartSelector.items.forEach(async (cartItem) => {
      await axiosBaseURL.delete(`/carts/${cartItem.id}`);
    });

    fetchCart(userSelector.id);
    
  };

  return (
    <AuthedPage>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
        <div className="max-w-screen-lg mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center">
            Your Cart
          </h1>

          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">
                Your cart is empty.
              </p>
            </div>
          ) : (
            <div className="flex gap-4 items-start">
              <div className="w-2/3 space-y-6">
                {cartSelector.items.map((item) => (
                  <CartItem
                    key={item.id}
                    id={item.id}
                    imageUrl={item.product.imageUrl}
                    name={item.product.name}
                    quantity={item.quantity}
                    price={item.product.price}
                    handleRemoveItem={handleRemoveItem}
                  />
                ))}
              </div>
              <div className="w-1/3 bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h1 className="text-3xl font-extrabold text-gray-800 text-center mb-4">
                  Order Summary
                </h1>
                <div className="flex flex-col">
                  <div className="text-2xl font-bold text-gray-800">
                    Sub Total: Rp {total.toLocaleString("id-ID")}
                  </div>
                  <Separator className="my-8" />
                  <div className="text-2xl font-bold text-gray-800">
                    Tax: Rp {(total * 0.1).toLocaleString("id-ID")}
                  </div>
                  <Separator className="my-8" />
                  <div className="text-2xl font-bold text-gray-800 mb-6">
                    Total: Rp {(total + total * 0.1).toLocaleString("id-ID")}
                  </div>
                  <Button
                    onClick={handleCheckout}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    Checkout
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AuthedPage>
  );
}

export default CartPage;
