import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, Search } from "lucide-react";
import { Link } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { Separator } from "@/components/ui/separator";

export const Header = () => {
  // const counterSlice = useSelector((state) => state.counter)
  const userSelector = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    dispatch({ type: "user/logout" });
  };
  return (
    <header className="w-full border-b shadow-sm sticky top-0 bg-white z-50">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/">
          <div className="text-xl font-bold text-primary">MyShop</div>
        </Link>

        {/* {counterSlice.counter} */}
        {/* Search Bar */}
        <div className="flex-1 max-w-md relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            type="text"
            placeholder="Search products..."
            className="pl-10"
          />
        </div>

        {/* Icons */}
        <div className="flex gap-5 items-center">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Heart className="w-5 h-5" />
            </Button>
            <Link to="/cart">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="w-5 h-5" />
              </Button>
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="flex h-7 items-center gap-2">
            {userSelector.username == "" ? (
              <>
                <Link to="/login">
                  <Button variant="outline">Sign In</Button>
                </Link>
                <Separator orientation="vertical" decorative={true} />
                <Link to="/register">
                  <Button>Sign Up</Button>
                </Link>
              </>
            ) : (
              <>
                <div className="font-semibold">
                  Hello, {userSelector.username}
                </div>
                <Separator orientation="vertical" decorative={true} />
                <Button variant="outline" onClick={handleLogout}>
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
