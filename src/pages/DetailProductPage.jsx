import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Button } from "@/components/ui/button";
import { TiMinus, TiPlus } from "react-icons/ti";
import { Skeleton } from "@/components/ui/skeleton";
import { axiosBaseURL } from "@/lib/axios";

function DetailProductPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [productIsLoading, setProductIsLoading] = useState(false);

  useEffect(() => {
    async function getProduct() {
      try {
        setProductIsLoading(true);
        const response = await axiosBaseURL.get(`/products/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Failed to fetch product", error);
      } finally {
        setProductIsLoading(false);
      }
    }
    getProduct();
  }, [productId]);

  const increaseQuantity = () => {
    if (product && quantity < product.stock) setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 0) setQuantity(quantity - 1);
  };

  if (productIsLoading || !product) {
    return (
      <main className="max-w-screen-xl min-h-screen mx-auto px-4 py-10">
        {/* Skeleton tampil saat loading */}
        <div className="grid grid-cols-2 gap-8 items-start">
          <Skeleton className="w-full h-[500px] rounded-xl" />
          <div className="flex flex-col gap-4">
            <Skeleton className="h-8 w-1/2" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-screen-xl min-h-screen mx-auto px-4 py-10 bg-gray-50">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start bg-white rounded-2xl shadow-lg p-6 lg:p-8">
        {/* Gambar Produk */}
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-auto max-h-[500px] object-cover rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
        />

        {/* Info Produk */}
        <div className="flex flex-col gap-6">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
            {product.name}
          </h1>

          <p className="text-gray-600 text-sm bg-gray-100 inline-block px-3 py-1 rounded-full w-fit">
            Stok: {product.stock}
          </p>

          <p className="text-3xl font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-lg w-fit">
            Rp {product.price.toLocaleString("id-ID")}
          </p>

          <p className="text-gray-600 text-base leading-relaxed bg-gray-50 p-4 rounded-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
            unde repellat accusantium dolore soluta sequi harum incidunt vitae
            id veniam?
          </p>

          {/* Kontrol Jumlah */}
          <div className="flex items-center gap-3 p-4">
            <span className="text-sm font-medium text-gray-700 mr-2">
              Quantity:
            </span>
            <Button
              size="icon"
              variant="ghost"
              onClick={decreaseQuantity}
              disabled={quantity === 0}
              className="h-10 w-10 rounded-full border-2 border-gray-300 hover:bg-red-50 hover:border-red-300 disabled:opacity-50"
            >
              <TiMinus />
            </Button>
            <span className="text-xl font-bold w-12 text-center bg-white px-4 py-2">
              {quantity}
            </span>
            <Button
              size="icon"
              variant="ghost"
              onClick={increaseQuantity}
              disabled={quantity >= product.stock}
              className="h-10 w-10 rounded-full border-2 border-gray-300 hover:bg-green-50 hover:border-green-300 disabled:opacity-50"
            >
              <TiPlus />
            </Button>
          </div>

          {/* Tombol Add to Cart */}
          <Button
            className="w-full mt-4 h-12 text-lg font-semibold bg-blue-600 disabled:bg-gray-400 hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg"
            disabled={quantity === 0}
          >
            {quantity > 0 ? `Add ${quantity} to Cart` : "Select Quantity"}
          </Button>
        </div>
      </div>
    </main>
  );
}

export default DetailProductPage;
