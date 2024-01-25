import { INewUser } from '@/types';
import {
    useQuery,
    useInfiniteQuery,
    useMutation,
    useQueryClient
} from '@tanstack/react-query'
import { createUserAccount, signinAccount } from '../appwrite/api'

export const useCreateUserAccount = () => {
    return useMutation({
        mutationFn: (user: INewUser) => createUserAccount(user)
    })
}



export const useSigninAccount = () => {
    return useMutation({
      mutationFn: (user: { email: string; password: string }) =>
        signinAccount(user),
    });
  };