// import { createContext, useContext, useEffect, useState } from 'react'
// // import { IContextType, IUser } from '@/types';
// import { getCurrentUser } from '../appwrite/api';
// import { Navigate, useNavigate } from 'react-router-dom';
// import { IUser } from '@/types';

// const INITIAL_USER = {
//     id: "",
//     username: "",
//     name: "",
//     email: "",
//     password: "",
//     imageUrl: '',
//     bio: '',
// };

// const INITIAL_STATE = {
//     user: INITIAL_USER,
//     isauthenticated: false,
//     isloading: false,
//     setUser: () => { },
//     setisauthenticated: () => { },
//     checkAuthuser: async () => false as boolean,
// };

// type IContextType = {
//     user: IUser;
//     isloading: boolean;
//     setUser: React.Dispatch<React.SetStateAction<IUser>>;
//     isauthenticated: boolean;
//     setisauthenticated: React.Dispatch<React.SetStateAction<boolean>>;
//     checkAuthuser: () => Promise<boolean>; // Corrected the type to a function returning Promise<boolean>
//   };

// const Authcontext = createContext<IContextType>(INITIAL_STATE)


// const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//     const [user, setUser] = useState<IUser>(INITIAL_USER);
//     const [isloading, setisloading] = useState(false);
//     const [isauthenticated, setisauthenticated] = useState(false);

//     const checkAuthuser = async () => {
//         try {
//             const currentAccount = await getCurrentUser();

//             if (currentAccount) {
//                 setUser({
//                     id: currentAccount.$id,
//                     name: currentAccount.name,
//                     username: currentAccount.username,
//                     email: currentAccount.email,
//                     imageUrl: currentAccount.imageUrl,
//                     bio: currentAccount.bio,

//                 });
//                 setisauthenticated(true);
//                 return true;
//             }
//             return false;
//         } catch (error) {
//             console.log(error)
//         }
//     };

//     const navigate = useNavigate();

//     useEffect(() => {
//         if (
//             localStorage.getItem("cookiefallback") === '[]' ||
//             localStorage.getItem('cookiefallback') === null
//         )navigate('/sign-in')

//         checkAuthuser()
//     }, []);

//     const value = {
//         user,
//         setUser,
//         isloading,
//         isauthenticated,
//         setisauthenticated,
//         checkAuthuser,
//       };
//     return (
//         <Authcontext.Provider value={value} >
//             {children}
//         </Authcontext.Provider>
//     )
// }

// export const useUserContext = () => useContext(Authcontext);

// export default AuthProviderl


import { Navigate, useNavigate } from "react-router-dom";
import { createContext, useContext, useEffect, useState } from "react";

import { IUser } from "@/types";
import { getCurrentUser } from "@/lib/appwrite/api";

export const INITIAL_USER = {
    id: "",
    name: "",
    username: "",
    email: "",
    imageUrl: "",
    bio: "",
};

const INITIAL_STATE = {
    user: INITIAL_USER,
    isloading: false,
    isAuthenticated: false,
    setUser: () => { },
    setIsAuthenticated: () => { },
    checkAuthuser: async () => false as boolean,
};

type IContextType = {
    user: IUser;
    isloading: boolean;
    setUser: React.Dispatch<React.SetStateAction<IUser>>;
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    checkAuthuser: () => Promise<boolean>;
};

const AuthContext = createContext<IContextType>(INITIAL_STATE);


export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<IUser>(INITIAL_USER);
    const [isloading, setisloading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const checkAuthuser = async () => {
        try {
            const currentAccount = await getCurrentUser();
            if (currentAccount) {
                setUser({
                    id: currentAccount.$id,
                    name: currentAccount.name,
                    username: currentAccount.username,
                    email: currentAccount.email,
                    imageUrl: currentAccount.imageUrl,
                    bio: currentAccount.bio,
                });
                setIsAuthenticated(true);

                return true;
            }

            return false;
        } catch (error) {
            console.error(error);
            return false;
        }
    };
    const navigate = useNavigate();

    useEffect(() => {
        const cookieFallback = localStorage.getItem("cookieFallback");
        if (
            cookieFallback === "[]" 
            // cookieFallback === null
        ) {
            navigate("/sign-in");
        }

        checkAuthuser();
    }, []);

    const value = {
        user,
        setUser,
        isloading,
        isAuthenticated,
        setIsAuthenticated,
        checkAuthuser,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
export const useUserContext = () => useContext(AuthContext);

