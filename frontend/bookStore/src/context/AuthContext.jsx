import { createContext, useCallback, useEffect, useState } from "react";
import { baseUrl, postRequest } from "../utils/services";
import * as yup from "yup";

export const AuthContext = createContext();



export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userRegisterStatus, setUserRegisterStatus] = useState(false);
    const [registerError, setRegisterError] = useState('');
    const [isRegisterLoading, setIsRegisterLoading] = useState();
    const [registerInfo, setRegisterInfo] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    const [LoginInfo, setLoginInfo] = useState({
        email: "",
        password: "",
    });
    const [loginError, setLoginError] = useState();
    const [isLoginLoading, setIsLoginLoading] = useState();

    const validationSchema = yup.object({
        username: yup
            .string()
            .required("username is required"),
        email: yup
            .string()
            .required("Email is required")
            .email("Please enter valid email"),
        password: yup
            .string()
            .required("password is required")
            .min(8, "password should be at least 8 characters"),
        confirmPassword: yup
            .string()
            .required("confirm password is required")
            .oneOf([yup.ref("password")], "password does not match"),
    });



    console.log("User", user);
    console.log("loginInfo", LoginInfo);

    useEffect(() => {
        const user = localStorage.getItem("User");
        setUser(JSON.parse(user));
    }, [])

    const updateRegisterInfo = useCallback((info) => {
        setRegisterInfo(info)
    }, [])

    const updateLoginInfo = useCallback((info) => {
        setLoginInfo(info)
    }, [])


    const registerUser = useCallback(async (e) => {
        e.preventDefault();
        console.log('post request')
        setIsRegisterLoading(true);
        setRegisterError('')
        try {
            const response = await postRequest(`${baseUrl}/register`, JSON.stringify({
                username: registerInfo.username,
                email: registerInfo.email,
                password: registerInfo.password,
            }))
            setIsRegisterLoading(false);
            if (response.error) {
                return setRegisterError(response);
            }
            localStorage.setItem("User", JSON.stringify(response));
            setUserRegisterStatus(true);
        } catch (e) {
            console.log(e.message)
        }
    }, [registerInfo])


    const LoginUser = useCallback(async (e) => {
        e.preventDefault();
        setIsLoginLoading(true);
        setLoginError(null);
        try {
            const response = await postRequest(`${baseUrl}/login`, JSON.stringify(LoginInfo))
            setIsLoginLoading(false);
            if (response.error) {
                return setLoginError(response)
            }
            localStorage.setItem("User", JSON.stringify(response));
            setUser(response);
        } catch (e) {
            console.log(e.message);
        }

    }, [LoginInfo])

    const LogoutUser = useCallback(() => {
        localStorage.removeItem("User");
        setUser(null);
        setUserRegisterStatus(false);
    }, [])

    return <AuthContext.Provider
        value={{
            user,
            registerInfo,
            userRegisterStatus,
            updateRegisterInfo,
            registerUser,
            registerError,
            isRegisterLoading,
            LogoutUser,
            LoginUser,
            loginError,
            isLoginLoading,
            updateLoginInfo,
            LoginInfo,
            validationSchema
        }}>{children}</AuthContext.Provider>
}