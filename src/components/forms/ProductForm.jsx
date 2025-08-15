import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const ProductForm = ({ handleOnSubmit, product = {} }) => {
  const formSchema = z.object({
    name: z
      .string()
      .min(5, {
        message: "Name must be at least 5 characters.",
      })
      .max(25, "Name must be less than 25 characters."),
    imageUrl: z
      .string()
      .min(3, {
        message: "Url must be at least 3 characters.",
      })
      .url("Invalid URL")
    //   .regex(/\.(jpg|jpeg|png|gif|webp)$/i, {
    //     message: "Image URL must end with .jpg, .jpeg, .gif, .webp, .png",
    //   })
    ,
    price: z.coerce
      .number()
      .min(1, { message: "Price must be greater than 0" }),
    stock: z.coerce
      .number()
      .min(1, { message: "Stock must be greater than 0" }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: product.name || "",
      imageUrl: product.imageUrl || "",
      price: product.price || 0,
      stock: product.stock || 0,
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleOnSubmit)}
        className="mx-auto bg-white p-8 rounded-lg shadow-lg space-y-6"
      >
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
           {product.id ? "Edit Product" : "Create Product"} 
          </h2>
          <p className="text-gray-600">Fill in the details below</p>
        </div>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">
                Product Name
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter product name"
                  {...field}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </FormControl>
              <FormDescription className="text-xs text-gray-500 mt-1"></FormDescription>
              <FormMessage className="text-xs text-red-600 mt-1" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">
                Image URL
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="https://example.com/image.jpg"
                  {...field}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </FormControl>
              <FormDescription className="text-xs text-gray-500 mt-1">
                Provide a valid image URL
              </FormDescription>
              <FormMessage className="text-xs text-red-600 mt-1" />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">
                  Price
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="0"
                  />
                </FormControl>
                <FormDescription className="text-xs text-gray-500 mt-1"></FormDescription>
                <FormMessage className="text-xs text-red-600 mt-1" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">
                  Stock
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="0"
                  />
                </FormControl>
                <FormDescription className="text-xs text-gray-500 mt-1"></FormDescription>
                <FormMessage className="text-xs text-red-600 mt-1" />
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-sm hover:shadow-md"
        >
          {product.id ? "Update Product" : "Add Product"}
        </Button>
      </form>
    </Form>
  );
};
