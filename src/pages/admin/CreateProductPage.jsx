import { AdminLayout } from "@/components/layouts/AdminLayout";
import { axiosBaseURL } from "@/lib/axios";
import { useNavigate } from "react-router";
import { ProductForm } from "@/components/forms/ProductForm";




function CreateProductPage () {

  const navigate = useNavigate();

  const createHandleProduct = (values) => {
    axiosBaseURL
      .post("/products", {
        name: values.name,
        imageUrl: values.imageUrl,
        price: values.price,
        stock: values.stock,
      })
      .then((response) => {
        console.log(response.data);
        alert("Product has been created!")
        navigate("/admin/products");
      })
      .catch((error) => {
        console.error(error);
      });
  }


  return (
    <AdminLayout title="Create Product">
      <ProductForm handleOnSubmit={createHandleProduct} />
    </AdminLayout>
  );
};

export default CreateProductPage;
