import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";

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
import { Checkbox } from "@/components/ui/checkbox";

import { axiosBaseURL } from "@/lib/axios";
import { useDispatch } from "react-redux";
import GuestPage from "@/components/guard/GuestPage";

const formSchema = z.object({
  username: z.string().min(5, {
    message: "Username must be at least 5 characters.",
  }),
  password: z.string().min(3, {
    message: "Password must be at least 3 characters.",
  }),
});

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const handleLogin = async function (values) {
    try {
      const userResponse = await axiosBaseURL.get("/users", {
        params: {
          username: values.username,
        },
      });

      if (
        userResponse.data.length == 0 ||
        userResponse.data[0].password != values.password
      ) {
        alert("Invalid credentials!");
        return;
      }
      dispatch({
        type: "user/login",
        payload: {
          id: userResponse.data[0].id,
          username: userResponse.data[0].username,
          user: userResponse.data[0].user,
        },
      });
      localStorage.setItem(
        "currentUser",
        JSON.stringify(userResponse.data[0].id)
      );
    //   alert("Success");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <GuestPage>
      <main>
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
          <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleLogin)}
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
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="*****"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="show-password"
                    checked={showPassword}
                    onCheckedChange={(checked) =>
                      setShowPassword(Boolean(checked))
                    }
                  />
                  <label
                    htmlFor="show-password"
                    className="text-sm text-muted-foreground"
                  >
                    Show Password
                  </label>
                </div>

                <Button type="submit" className="w-full">
                  Login
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </main>
    </GuestPage>
  );
}

export default LoginPage;
