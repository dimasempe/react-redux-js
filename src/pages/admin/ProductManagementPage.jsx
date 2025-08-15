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
import { Toaster } from "@/components/ui/sonner";
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
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== id)
        );
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
          <div className="flex justify-end gap-4 mb-6">
            {someCheckbox.length > 0 && (
              <Button
                onClick={deleteSomeProducts}
                className="hover:cursor-pointer h-11 px-6 rounded-xl font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
                variant="destructive"
              >
                <BsTrash3 className="w-4 h-4 mr-2" />
                Delete {someCheckbox.length} Products
              </Button>
            )}
            <Link to="/admin/products/create">
              <Button className="hover:cursor-pointer flex items-center gap-2 h-11 px-6 rounded-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg">
                <IoMdAdd className="w-5 h-5" /> Add New Product
              </Button>
            </Link>
          </div>
        }
      >
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <Label
            htmlFor="table-search"
            className="text-lg font-semibold mb-3 block text-gray-700"
          >
            Search Products
          </Label>
          <div className="flex gap-3">
            <Input
              id="table-search"
              type="text"
              placeholder="Search for products..."
              className="flex-1 max-w-xl h-12 px-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 transition-colors duration-200"
              value={searchProduct}
              onChange={(event) => setSearchProduct(event.target.value)}
            />
            <Button
              onClick={handleSearchProduct}
              className="h-12 px-6 rounded-xl font-semibold bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Search
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <Table>
            <TableCaption className="text-gray-600 py-4">
              A list of your products.
            </TableCaption>
            <TableHeader>
              <TableRow className="bg-gray-50 border-b-2 border-gray-200">
                <TableHead className="w-12 text-center" />
                <TableHead className="w-[100px] font-semibold text-gray-700">
                  ID
                </TableHead>
                <TableHead className="w-md font-semibold text-gray-700">
                  Product Name
                </TableHead>
                <TableHead className="font-semibold text-gray-700">
                  Price
                </TableHead>
                <TableHead className="font-semibold text-gray-700">
                  Stock
                </TableHead>
                <TableHead className="font-semibold text-gray-700">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product, index) => (
                <TableRow
                  key={product.id}
                  className={`border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150 ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-25"
                  }`}
                >
                  <TableCell className="text-center">
                    <Checkbox
                      onCheckedChange={(checked) => {
                        handleCheckbox(checked, product.id);
                      }}
                      checked={someCheckbox.includes(product.id)}
                      className="w-5 h-5 rounded border-2 border-gray-300"
                    />
                  </TableCell>
                  <TableCell className="font-medium text-gray-600">
                    #{product.id}
                  </TableCell>
                  <TableCell className="font-semibold text-gray-900">
                    {product.name}
                  </TableCell>
                  <TableCell className="font-bold text-green-600">
                    Rp {product.price.toLocaleString("id-ID")}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        product.stock < 10
                          ? "bg-red-100 text-red-700"
                          : product.stock < 20
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {product.stock}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Link to={`/admin/products/edit/${product.id}`}>
                        <Button
                          variant="outline"
                          className="hover:cursor-pointer h-9 w-9 p-0 rounded-lg border-2 border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
                        >
                          <FiEdit className="w-4 h-4" />
                        </Button>
                      </Link>

                      <Button
                        variant="destructive"
                        className="hover:cursor-pointer h-9 w-9 p-0 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                        onClick={() => deleteHandleProduct(product.id)}
                      >
                        <BsTrash3 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-8 flex justify-center">
          <Pagination>
            <PaginationContent className="flex items-center gap-4">
              <PaginationItem>
                <Button
                  className="text-sm h-10 px-4 rounded-xl font-semibold"
                  disabled={!prevPage}
                  onClick={handlePreviousPage}
                  variant="link"
                >
                  <MdNavigateBefore className="w-4 h-4 mr-1" /> Previous
                </Button>
              </PaginationItem>
              <PaginationItem className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent px-4 py-2 rounded-xl bg-gray-50">
                Page {searchParams.get("page")}
              </PaginationItem>
              <PaginationItem>
                <Button
                  className="text-sm h-10 px-4 rounded-xl font-semibold"
                  disabled={!nextPage}
                  onClick={handleNextPage}
                  variant="link"
                >
                  Next <MdNavigateNext className="w-4 h-4 ml-1" />
                </Button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </AdminLayout>
    </div>
  );
}

export default ProductManagementPage;
