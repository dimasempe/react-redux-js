import { AdminLayout } from "@/components/layouts/AdminLayout";
import { Button } from "@/components/ui/button";
import { IoMdAdd } from "react-icons/io";
import { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { Link, useSearchParams } from "react-router";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import { BsTrash3 } from "react-icons/bs";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect } from "react";
import { axiosBaseURL } from "@/lib/axios";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

function ProductManagementPage() {
  const [products, setProducts] = useState([]);
  const [nextPage, setNextPage] = useState();
  const [prevPage, setPrevPage] = useState();
  const [searchProduct, setSearchProduct] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [someCheckbox, setSomeCheckbox] = useState([]);

  const handleNextPage = () => {
    searchParams.set("page", Number(searchParams.get("page")) + 1);
    setSearchParams(searchParams);
  };

  const handlePreviousPage = () => {
    searchParams.set("page", Number(searchParams.get("page")) - 1);
    setSearchParams(searchParams);
  };

  const handleSearchProduct = () => {
    if (searchProduct) {
      searchParams.set("search", searchProduct);
      setSearchParams(searchParams);
    } else {
      searchParams.delete("search");
      setSearchParams(searchParams);
    }
  };

  const deleteHandleProduct = (id) => {
    const confirmed = confirm("Are you sure you want to delete this product?");
    if (!confirmed) return;
    axiosBaseURL
      .delete(`/products/${id}`)
      .then(() => {
        alert("Product has been deleted!");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleCheckbox = (checked, id) => {
    if (checked) setSomeCheckbox([...someCheckbox, id]);
    else setSomeCheckbox(someCheckbox.filter((item) => item !== id));

    console.log(someCheckbox);
  };

  const deleteSomeProducts = async () => {
    const confirmed = confirm(
      "Are you sure you want to delete these products?"
    );
    if (!confirmed) return;

    try {
      await Promise.all(
        someCheckbox.map((id) => axiosBaseURL.delete(`/products/${id}`))
      );
      alert("All selected products deleted successfully.");
      searchParams.set("page", 1);
      setSearchParams(searchParams);
      setSomeCheckbox([]);
    } catch (error) {
      console.error("Error deleting products:", error);
      alert("Some deletions may have failed.");
    }
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axiosBaseURL.get("/products", {
          params: {
            _page: Number(searchParams.get("page")),
            _per_page: 5,
            name: searchParams.get("search"),
          },
        });
        // console.log(response.data)
        setNextPage(response.data.next);
        setPrevPage(response.data.prev);
        setProducts(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (searchParams.get("page")) {
      getProducts();
    } else if (!searchParams.get("page")) {
      searchParams.set("page", 1);
      setSearchParams(searchParams);
    }
  }, [searchParams, setSearchParams]);
  return (
    <div>
      <AdminLayout
        title="Product Management"
        description="Manage your products"
        rightSection={
          <div className="flex justify-end gap-4 mb-4">
            {someCheckbox.length > 0 && (
              <Button
                onClick={deleteSomeProducts}
                className="hover:cursor-pointer"
                variant="destructive"
              >
                Delete {someCheckbox.length} Products
              </Button>
            )}
            <Link to="/admin/products/create">
              <Button className="hover:cursor-pointer flex items-center gap-2">
                <IoMdAdd /> Add New Product
              </Button>
            </Link>
          </div>
        }
      >
        <Label htmlFor="table-search" className="text-lg mb-2">
          Search Products
        </Label>
        <div className="flex">
          <Input
            id="table-search"
            type="text"
            placeholder="Search for products..."
            className="mb-4 max-w-xl"
            value={searchProduct}
            onChange={(event) => setSearchProduct(event.target.value)}
          />
          <Button onClick={handleSearchProduct} className="ml-2">
            Search
          </Button>
        </div>

        <Table>
          <TableCaption>list products.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead />
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead className="w-md">Product Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <Checkbox
                    onCheckedChange={(checked) => {
                      handleCheckbox(checked, product.id);
                    }}
                    checked={someCheckbox.includes(product.id)}
                  />
                </TableCell>
                <TableCell className="font-medium">{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>
                  Rp {product.price.toLocaleString("id-ID")}
                </TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>
                  <Link to={`/admin/products/edit/${product.id}`}>
                    <Button variant="outline" className="hover:cursor-pointer">
                      <FiEdit />
                    </Button>
                  </Link>

                  <Button
                    variant="destructive"
                    className="hover:cursor-pointer ml-2.5"
                    onClick={() => deleteHandleProduct(product.id)}
                  >
                    <BsTrash3 />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <Button
                className="text-sm ml-5"
                disabled={!prevPage}
                onClick={handlePreviousPage}
                variant="ghost"
              >
                <MdNavigateBefore /> Previous
              </Button>
            </PaginationItem>
            <PaginationItem className="text-sm">
              Page {searchParams.get("page")}
            </PaginationItem>
            <PaginationItem>
              <Button
                className="text-sm ml-5"
                disabled={!nextPage}
                onClick={handleNextPage}
                variant="ghost"
              >
                Next <MdNavigateNext />
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </AdminLayout>
    </div>
  );
}

export default ProductManagementPage;
