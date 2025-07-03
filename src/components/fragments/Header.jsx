import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, Search } from "lucide-react";
import { Link } from "react-router";

export const Header = () => {
  return (
    <header className="w-full border-b shadow-sm sticky top-0 bg-white z-50">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/">
          <div className="text-xl font-bold text-primary">MyShop</div>
        </Link>

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
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Heart className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <ShoppingCart className="w-5 h-5" />
          </Button>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-2">
          <Button variant="outline">Log In</Button>
          <Button>Sign Up</Button>
        </div>
      </div>
    </header>
  );
};
