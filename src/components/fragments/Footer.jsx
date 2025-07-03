const Footer = () => {
  return (
    <footer className="w-full border-t bg-muted text-muted-foreground py-6 mt-10">
      <div className="max-w-screen-xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
        
        {/* Left: Copyright */}
        <p>&copy; {new Date().getFullYear()} MyShop. All rights reserved.</p>

        {/* Center: Links */}
        <div className="flex gap-4">
          <a href="#" className="hover:underline">Terms</a>
          <a href="#" className="hover:underline">Privacy</a>
          <a href="#" className="hover:underline">Contact</a>
        </div>

        {/* Right: Powered by */}
        <p>Powered by React + shadcn/ui</p>
      </div>
    </footer>
  );
};

export default Footer;