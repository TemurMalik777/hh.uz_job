import { useMutation} from "@tanstack/react-query";
import { SignIn } from "../types";
import { authService } from "../service/auth.service";

export const useAuth=()=>{
    return useMutation({
        mutationFn:async({data}:{data:SignIn;})=>authService.signIn(data)
    })
}

export const useAuthLogOut = () => {  
    return useMutation({
        mutationFn:async({role}:{role:string})=>authService.signOut(role)
    })
}