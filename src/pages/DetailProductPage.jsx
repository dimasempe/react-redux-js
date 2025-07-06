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
    <main className="max-w-screen-xl min-h-screen mx-auto px-4 py-10">
      <div className="grid grid-cols-2 gap-8 items-start">
        {/* Gambar Produk */}
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-auto max-h-[500px] object-cover rounded-xl"
        />

        {/* Info Produk */}
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-muted-foreground text-sm">Stok: {product.stock}</p>
          <p className="text-2xl font-semibold text-primary">
            Rp {product.price.toLocaleString("id-ID")}
          </p>
          <p className="text-muted-foreground text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
            unde repellat accusantium dolore soluta sequi harum incidunt vitae
            id veniam?
          </p>

          {/* Kontrol Jumlah */}
          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="ghost"
              onClick={decreaseQuantity}
              disabled={quantity === 0}
            >
              <TiMinus />
            </Button>
            <span className="text-lg font-medium w-6 text-center">
              {quantity}
            </span>
            <Button
              size="icon"
              variant="ghost"
              onClick={increaseQuantity}
              disabled={quantity >= product.stock}
            >
              <TiPlus />
            </Button>
          </div>

          {/* Tombol Add to Cart */}
          <Button className="w-full mt-2" disabled={quantity === 0}>
            Add to Cart
          </Button>
        </div>
      </div>
    </main>
  );
}

export default DetailProductPage;
