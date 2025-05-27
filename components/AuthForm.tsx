"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import FormField from "./FormField";
import { useRouter } from "next/navigation";
import { auth } from "@/firebase/client";
import { signIn, signUp } from "@/lib/actions/auth.action";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

interface AuthFormProps {
  type: "sign-in" | "sign-up";
}
const authFormSchema = ({ type }: AuthFormProps) => {
  return z.object({
    name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
  });
};
const AuthForm = ({ type }: AuthFormProps) => {
  const router = useRouter();
  const formSchema = authFormSchema({ type });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (type === "sign-up") {
        const { name, email, password } = values;
        const userCredentials = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const result = await signUp({
          email,
          name: name!,
          uid: userCredentials.user.uid,
          password,
        });
        if(!result?.success) {
          toast.error(result?.message || "Failed to create account");
          return;
        }
        toast.success("Account created successfully!");
        router.push("/sign-in");
      } else if(type === "sign-in") {
        const { email, password } = values;
        const userCredentials = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        if (!userCredentials.user) {
          toast.error("Failed to sign in. Please check your credentials.");
          return;
        }
        const idToken = await userCredentials.user.getIdToken();
        await signIn({
          email,
          idToken,
        });
        toast.success("Logged in successfully!");
        router.push("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(`There was an error:${error}`);
    }
  }
  const isSignIn = type === "sign-in";
  return (
    <div className="card-border lg:min-w-[566px]">
      <div className=" flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
          <Image src="/logo_light.svg" alt="logo" width={38} height={32} />
          <h2 className="text-primary">Intervue</h2>
        </div>
        <h3>Practice job interview with AI</h3>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6 mt-4 form"
          >
            {!isSignIn && (
              <FormField
                label="Name"
                placeholder="John Doe"
                name="name"
                type="text"
                control={form.control}
              />
            )}
            <FormField
              label="Email"
              placeholder="johndoe@gmail.com"
              name="email"
              type="email"
              control={form.control}
            />
            <FormField
              label="Password"
              placeholder="********"
              name="password"
              type="password"
              control={form.control}
            />
            <Button className="btn" type="submit">
              {isSignIn ? "Sign In" : "Create Account"}
            </Button>
          </form>
        </Form>
        <p className="text-center">
          {isSignIn ? "Don't have an account?" : "Already have an account?"}{" "}
          <Link
            href={!isSignIn ? "/sign-in" : "/sign-up"}
            className=" font-bold text-user-primary ml-1"
          >
            {isSignIn ? "Sign Up" : "Sign In"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
