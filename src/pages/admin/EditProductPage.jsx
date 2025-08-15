import { AdminLayout } from "@/components/layouts/AdminLayout";
import { axiosBaseURL } from "@/lib/axios";
import { useNavigate, useParams } from "react-router";
import { ProductForm } from "@/components/forms/ProductForm";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

function EditProductPage() {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [product, setProduct] = useState();
  const editHandleProduct = (values) => {
    axiosBaseURL
      .patch(`/products/${productId}`, {
        name: values.name,
        imageUrl: values.imageUrl,
        price: values.price,
        stock: values.stock,
      })
      .then((response) => {
        console.log(response.data);
        alert("Product has been updated!");
        navigate("/admin/products");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await axiosBaseURL.get(`/products/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Failed to fetch product", error);
      }
    };
    getProduct();
  }, [productId]);

  return (
    <AdminLayout title="Edit Product">
      {!product ? (
        <Skeleton className="h-96 w-full rounded-md" />
      ) : (
        <>
          <ProductForm handleOnSubmit={editHandleProduct} product={product} />
        </>
      )}
    </AdminLayout>
  );
}

export default EditProductPage;
