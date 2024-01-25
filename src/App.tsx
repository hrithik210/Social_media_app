import { Routes , Route } from "react-router-dom";
import  './global.css'
import { SigninForm } from "./_auth/Forms/SigninForm";
import { SignupForm } from "./_auth/Forms/SignupForm";
import { Home } from "./_root/pages";
import { AuthLayout } from "./_auth/AuthLayout";
import { RootLayout } from "./_root/RootLayout";
import { Toaster } from "@/components/ui/toaster"



const app = () => {
  return (
    <main className= 'flex h-screen'>
        <Routes>
            {/* public routes */}
            <Route element = {<AuthLayout/>}>
             <Route path ='/sign-in' element ={<SigninForm/>} />
             <Route path ='/sign-up' element ={<SignupForm/>} />
            </Route>

            {/* public routes */}
            <Route  element = {<RootLayout />}>
                <Route index element = {<Home />} />
            </Route>
            
        </Routes>
        <Toaster />
          

    </main>
  )
}
export default app;