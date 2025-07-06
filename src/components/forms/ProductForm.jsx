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
      .regex(/\.(jpg|jpeg|png|gif|webp)$/i, {
        message: "Image URL must end with .jpg, .jpeg, .gif, .webp, .png",
      }),
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
      <form onSubmit={form.handleSubmit(handleOnSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="input name's product" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/image.jpg" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="stock"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stock</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full hover:cursor-pointer">
          Submit
        </Button>
      </form>
    </Form>
  );
};
