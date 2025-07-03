import { useEffect, useState } from "react";
import { ProductCard } from "../components/fragments/ProductCard";
import axios from "axios";

const HomePage = () => {
  const [products, setProducts] = useState([]);

  async function getProducts() {
    try {
      const response = await axios.get("http://localhost:3000/products");
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <main className="max-w-screen-xl mx-auto px-4 py-8">
      <div className="grid xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
};

export default HomePage;
