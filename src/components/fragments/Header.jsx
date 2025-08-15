import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, Search } from "lucide-react";
import { Link } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { Separator } from "@/components/ui/separator";
// import { axiosBaseURL } from "@/lib/axios";
// import { useCallback } from "react";
import { useEffect } from "react";
import { fetchCart } from "@/services/cartService";

export const Header = () => {
  // const counterSlice = useSelector((state) => state.counter)
  const userSelector = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const cartSelector = useSelector((state) => state.cart);
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    dispatch({ type: "user/logout" });
  };

  // const fetchCart = useCallback(async () => {
  //   try {
  //     const cartResponse = await axiosBaseURL.get("/carts", {
  //       params: {
  //         userId: userSelector.id,
  //         _embed: "product",
  //       },
  //     });
  //     // console.log(cartResponse.data);
  //     dispatch({
  //       type: "cart/get",
  //       payload: cartResponse.data,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, [userSelector.id, dispatch]);

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <header className="w-full border-b border-gray-200 shadow-lg sticky top-0 bg-gradient-to-r from-white to-gray-50 backdrop-blur-md z-50">
      <div className="max-w-screen-xl mx-auto px-6 py-4 flex items-center justify-between gap-6">
        {/* Logo */}
        <Link to="/" className="transition-transform hover:scale-105">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            MyShop
          </div>
        </Link>

        {/* {counterSlice.counter} */}
        {/* Search Bar */}
        <div className="flex-1 max-w-lg relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Search products..."
            className="pl-12 h-12 rounded-full border-2 border-gray-200 focus:border-blue-500 transition-colors duration-200 shadow-sm hover:shadow-md"
          />
        </div>

        {/* Icons */}
        <div className="flex gap-6 items-center">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="h-12 w-12 rounded-full hover:bg-red-50 hover:text-red-600 transition-all duration-200"
            >
              <Heart className="w-6 h-6" />
            </Button>
            <Link to="/cart">
              <Button
                variant="ghost"
                size="icon"
                className="h-12 w-12 rounded-full hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 relative"
              >
                <ShoppingCart className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartSelector.items.length}
                </span>
              </Button>
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="flex h-12 items-center gap-4">
            {userSelector.username == "" ? (
              <>
                <Link to="/login">
                  <Button
                    variant="outline"
                    className="h-10 px-6 rounded-full border-2 border-gray-300 hover:border-blue-500 hover:text-blue-600 transition-all duration-200"
                  >
                    Sign In
                  </Button>
                </Link>
                <Separator
                  orientation="vertical"
                  decorative={true}
                  className="h-6"
                />
                <Link to="/register">
                  <Button className="h-10 px-6 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg">
                    Sign Up
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <div className="font-semibold text-gray-700 px-3 py-2 bg-gray-100 rounded-full">
                  Hello, {userSelector.username}
                </div>
                <Separator
                  orientation="vertical"
                  decorative={true}
                  className="h-6"
                />
                <Button
                  variant="outline"
                  onClick={handleLogout}
                  className="h-10 px-6 rounded-full border-2 border-red-300 text-red-600 hover:bg-red-50 hover:border-red-500 transition-all duration-200"
                >
                  Logout
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
