import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import AuthedPage from "@/components/guard/AuthedPage";
import { useEffect, useState } from "react";
import { axiosBaseURL } from "@/lib/axios";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { fetchCart } from "@/services/cartService";

function CartPage() {
  const [cartItems, setCartItems] = useState([]);

  const cartSelector = useSelector((state) => state.cart);

  const userSelector = useSelector((state) => state.user);

  const total = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

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

  return (
    <AuthedPage>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
        <div className="max-w-screen-md mx-auto px-4 py-8">
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
            <div className="space-y-6">
              {cartSelector.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-6 bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    className="w-24 h-24 object-cover rounded-lg border-2 border-gray-100"
                  />
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">
                      {item.product.name}
                    </h2>
                    <p className="text-sm text-gray-500 mb-1">
                      Quantity: {item.quantity}
                    </p>
                    <p className="text-lg font-bold text-blue-600">
                      Rp{" "}
                      {(item.product.price * item.quantity).toLocaleString(
                        "id-ID"
                      )}
                    </p>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleRemoveItem(item.id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded-lg transition-colors duration-200"
                  >
                    Remove
                  </Button>
                </div>
              ))}

              <Separator className="my-8" />

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex justify-between items-center">
                  <div className="text-2xl font-bold text-gray-800">
                    Total: Rp {total.toLocaleString("id-ID")}
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
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
