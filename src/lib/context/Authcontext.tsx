import { createContext, useContext, useEffect, useState } from 'react'
import { IContextType, IUser } from '@/types';
import { getCurrentUser } from '../appwrite/api';
import { Navigate, useNavigate } from 'react-router-dom';

const INITIAL_USER = {
    id: "",
    username: "",
    name: "",
    email: "",
    password: "",
    imageUrl: '',
    bio: '',
};

const INITIAL_STATE = {
    user: INITIAL_USER,
    isauthenticated: false,
    isloading: false,
    setUser: () => { },
    setisAuthenticated: () => { },
    checkAuthuser: async () => false,
};

const Authcontext = createContext<IContextType>(INITIAL_STATE)

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<IUser>(INITIAL_USER);
    const [isloading, setisloading] = useState(false);
    const [isauthenticated, setisauthenticated] = useState(false);

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
                setisauthenticated(true);
                return true;
            }

            return false;
        } catch (error) {
            console.log(error)
        }
    };

    const navigate = useNavigate();

    useEffect(() => {
        if (
            localStorage.getItem("cookiefallback") === '[]' ||
            localStorage.getItem('cookiefallback') === null
        )navigate('/sign-in')

        checkAuthuser()
    }, []);

    const value = {
        user,
        isauthenticated,
        isloading,
        setUser,
        setisauthenticated,
        checkAuthuser,
    }
    return (
        <Authcontext.Provider value={value} >
            {children}
        </Authcontext.Provider>
    )
}

export const useUserContext = () => useContext(Authcontext);

export default AuthProvider;