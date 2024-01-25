import { useToast } from "@/components/ui/use-toast"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import { SignupValidation } from "@/lib/validation";
import { z } from "zod";
import { Loader } from "lucide-react";
import { Link , useNavigate } from "react-router-dom";
import { useCreateUserAccount, useSigninAccount, } from "@/lib/reactquery/queriesAndMutations";
import { useUserContext } from "@/lib/context/Authcontext";


export const SignupForm = () => {
  const { toast } = useToast();
  const {checkAuthuser , isloading: isUserloading} = useUserContext();
  const { mutateAsync: createUserAccount, isPending: isCreatingAccount } = useCreateUserAccount()
  const navigate = useNavigate();

  const { mutateAsync: SigninAccount, isPending: isSigningIn } = useSigninAccount();
  
  
  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: ""
    },
  });

  // Define a submit handler.
  const onSubmit = async (values: z.infer<typeof SignupValidation>) => {
    //create user
    const newUser = await createUserAccount(values);
    if (!newUser) {
      return toast({
        title: "Sign-up failed, please try again",
      });
    };

  const session = await SigninAccount(
      {
        email: values.email,
        password: values.password
      }
    )

  if (!session) {
    return toast({
      title: "Sign-in failed, please try again",
    });
  };

  const isloggedIn = await checkAuthuser() ; 

  if(isloggedIn){
    form.reset();
    navigate('/')
  }else{
    return toast({
      title: "Sign-up failed, please try again",
    });
  }

  return (

    <Form {...form}>
      <div className="sm-420 flex-center flex-col">
        <img src="/assets/images/logo.svg" alt="logo" />
        <h2 className="h3-bold md:h2-bold pt-3">Create Account</h2>

        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col w-full at mt-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>email</FormLabel>
                <FormControl>
                  <Input type="email" className="shad-input" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <Button type="submit" className="shad-button_primary">
            {isCreatingAccount ? (
              <div className="flex-center gap-2">
                <Loader /> Loading...
              </div>
            ) : "Sign-up"}

          </Button>
          <p className="text-small-regular text-light text-center mt-3">
            Already have an Account?
            <Link to="/sign-in" className="text-primary-500 ml-1">Log in</Link>
          </p>

        </form>
      </div>
    </Form>

  );
};

};
export default SignupForm ; 
