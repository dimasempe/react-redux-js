import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

import { axiosBaseURL } from "@/lib/axios";

const formSchema = z
  .object({
    username: z.string().min(5, {
      message: "Username must be at least 5 characters.",
    }),
    password: z.string().min(3, {
      message: "Password must be at least 3 characters.",
    }),
    repeatPassword: z.string().min(3, {
      message: "Password must be at least 3 characters.",
    }),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Passwords don't match",
    path: ["repeatPassword"], // path of error
  });

function RegisterPage() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      repeatPassword: "",
    },
  });

  const handleRegister = async function(values) {
    try {
      const userResponse = await axiosBaseURL.get("/users", {
        username: values.username,
      });
      if (userResponse.data.length > 0) {
        alert("Username already exists!");
        return;
      }

      await axiosBaseURL.post("/users", {
        username: values.username,
        password: values.password,
      });
      alert("Account has been created!");
      form.reset();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-6">
            Create New Account!
          </h2>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleRegister)}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="yourUsername" {...field} />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="*****" {...field} />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="repeatPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Repeat Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="*****" {...field} />
                    </FormControl>
                    <FormDescription>
                      Make sure your password match!
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Register
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </main>
  );
}

export default RegisterPage;
