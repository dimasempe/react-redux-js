const Footer = () => {
  return (
    <footer className="w-full border-t border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100 text-gray-700 py-12 mt-16">
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gray-900">MyShop</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Your trusted online marketplace for quality products and exceptional service.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-8 h-8 bg-blue-100 hover:bg-blue-200 rounded-full flex items-center justify-center transition-colors">
                <span className="text-blue-600 text-sm">f</span>
              </a>
              <a href="#" className="w-8 h-8 bg-blue-100 hover:bg-blue-200 rounded-full flex items-center justify-center transition-colors">
                <span className="text-blue-600 text-sm">t</span>
              </a>
              <a href="#" className="w-8 h-8 bg-blue-100 hover:bg-blue-200 rounded-full flex items-center justify-center transition-colors">
                <span className="text-blue-600 text-sm">in</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">Home</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">Products</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">About Us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">Contact</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">Help Center</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">Shipping Info</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">Returns</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">Track Order</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900">Stay Updated</h4>
            <p className="text-gray-600 text-sm">Subscribe to our newsletter for latest updates and offers.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-r-lg transition-colors text-sm font-medium">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-300 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            
            {/* Left: Copyright */}
            <p className="text-gray-600">
              &copy; {new Date().getFullYear()} MyShop. All rights reserved.
            </p>

            {/* Center: Links */}
            <div className="flex gap-6">
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Terms of Service</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Privacy Policy</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Contact Us</a>
            </div>

            {/* Right: Powered by */}
            <p className="text-gray-500 flex items-center gap-1">
              Powered by 
              <span className="font-semibold text-blue-600">React</span> + 
              <span className="font-semibold text-blue-600">shadcn/ui</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;