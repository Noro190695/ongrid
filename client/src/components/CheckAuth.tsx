import {ReactNode} from "react";
import SignIn from "./SignIn";

interface ICheckAuth {
    isAuth: boolean
    children: ReactNode
}

export function CheckAuth({isAuth, children}: ICheckAuth){
    if (isAuth) {
        return (
            <>{children}</>
        )
    }
    return  (
        <SignIn />
    )
}