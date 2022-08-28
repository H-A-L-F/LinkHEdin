import { useMutation, useQuery } from "@apollo/client";
import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTE } from "../config/constants";
import { toastError, toastSuccess } from "../config/toast";
import { sendImage } from "../lib/image";
import { CREATE_EDUCATION_MUTATION, DELETE_EDUCATION_MUTATION, UPDATE_EDUCATION_MUTATION } from "../query/education";
import { CREATE_EXPERIENCE_MUTATION, DELETE_EXPERIENCE_MUTATION, UPDATE_EXPERIENCE_MUTATION } from "../query/experience";
import { UPDATE_USER_QUERY, USER_FETCH_QUERY } from "../query/user";
import { useAuth } from "./useAuth";
import { useLoading } from "./useLoading";

const backEndContext = createContext({} as any)

export function ProvideBackEnd({ children }: { children: JSX.Element }) {
    const auth = useProvideBackEnd();
    return <backEndContext.Provider value={auth}>{children}</backEndContext.Provider>;
}

export const useBackEnd = () => {
    return useContext(backEndContext);
};

function useProvideBackEnd() {
    const { setLoading } = useLoading()
    const navigate = useNavigate()
    const { user, setUser } = useAuth()
    const { refetch } = useQuery(USER_FETCH_QUERY);
    const [updateFunc] = useMutation(UPDATE_USER_QUERY)
    const [addEducationFunc] = useMutation(CREATE_EDUCATION_MUTATION)
    const [deleteEducationFunc] = useMutation(DELETE_EDUCATION_MUTATION)
    const [updateEducationFunc] = useMutation(UPDATE_EDUCATION_MUTATION)
    const [addExperienceFunc] = useMutation(CREATE_EXPERIENCE_MUTATION)
    const [deleteExperienceFunc] = useMutation(DELETE_EXPERIENCE_MUTATION)
    const [updateExperienceFunc] = useMutation(UPDATE_EXPERIENCE_MUTATION)

    function errHandle(err: any) {
        toastError(err.message)
        console.log(err)
        setLoading(false)
    }

    function successHandle(msg: string) {
        toastSuccess(msg)
        setLoading(false)
    }

    function login(loginFunc: Promise<any>) {
        setLoading(true)

        loginFunc.then((res) => {
            const user = res.data.login
            console.log(user)
            setUser(user)
            setLoading(false)
            navigate(ROUTE.ROUTE_HOME)
        })

        loginFunc.catch((err) => {
            setLoading(false)
            console.log(err)
            toastError(err)
        })
    }

    function register(registerFunc: Promise<any>) {
        setLoading(true)

        registerFunc.then((res) => {
            toastSuccess("Succesfully created user")
            const data = res.data
            if (data && data.register.token !== undefined) {
                setLoading(false)
                navigate(ROUTE.ROUTE_LOGIN)
            }
        })

        registerFunc.catch((err) => {
            setLoading(false)
            console.log(err.message)
            toastError("Fill all field properly!")
        })
    }

    function validateUser(validateUserFunc: Promise<any>) {
        setLoading(true)

        validateUserFunc.then((res) => {
            setLoading(false)
            navigate(ROUTE.ROUTE_LOGIN)
        })

        validateUserFunc.catch((err) => {
            setLoading(false)
            toastError("Please check your code again!")
        })
    }

    function reqChangePass(reqChangePassFunc: Promise<any>) {
        setLoading(true)

        reqChangePassFunc.then((res) => {
            setLoading(false)
            toastSuccess("Password reset link has been sent to your email.")
        })

        reqChangePassFunc.catch((err) => {
            setLoading(false)
            console.log(err)
            toastError(err)
        })
    }

    function validateChangePassReq(validateChangePassFunc: Promise<any>, setAuthorized: React.Dispatch<React.SetStateAction<boolean>>) {
        setLoading(true)

        validateChangePassFunc.then((res) => {
            setLoading(false)
            toastSuccess("Code correct")
            setAuthorized(true)
            return true
        })

        validateChangePassFunc.catch((err) => {
            setLoading(false)
            toastError(err)
        })
    }

    function changePass(changePassFunc: Promise<any>) {
        setLoading(true)

        changePassFunc.then((res) => {
            setLoading(false)
            toastSuccess("Successfully change password")
            navigate(ROUTE.ROUTE_LOGIN)
        })

        changePassFunc.catch((err) => {
            setLoading(false)
            toastError(err)
            console.log(err)
        })
    }

    function refetchUser() {
        setLoading(true)
        refetch()
            .then((resp) => {
                const newUser = { ...resp.data.whoisme, token: user.token };
                console.log("new user : ", newUser);
                setUser(newUser)
                setLoading(false)
            })
            .catch((err) => {
                setLoading(false)
                console.log(err)
                toastError(err.message);
            });
    }

    function constructUpdateUser(input: { name?: string, email?: string, profpict?: string | void, headline?: string, bgphoto?: string }) {
        const res = {
            Name: input.name ? input.name : "",
            Email: input.email ? input.email : "",
            PhotoProfile: input.profpict ? input.profpict : "",
            Headline: input.headline ? input.headline : "",
            BgPhotoProfile: input.bgphoto ? input.bgphoto : "",
        }
        console.log(input, res)
        return res
    }

    async function updateUser(id: string, input: {}) {
        setLoading(true)
        try {
            const resUpdate = await updateFunc({ variables: { id: id, input: input } })
            refetchUser()
            successHandle("Successfully changed profile picture")
        } catch (err: any) {
            errHandle(err)
        }
    }

    async function setProfilePict(img: any, id: string) {
        setLoading(true)
        try {
            const resUrl = await sendImage(img)
            const input = constructUpdateUser({ profpict: resUrl })
            updateUser(id, input)
        } catch (err: any) {
            toastError(err.message)
            console.log(err)
            setLoading(false)
        }
    }

    async function setBgPict(img: any, id: string) {
        setLoading(true)
        try {
            const resUrl = await sendImage(img)
            const input = constructUpdateUser({ bgphoto: resUrl })
            updateUser(id, input)
        } catch (err: any) {
            errHandle(err)
        }
    }

    async function addEducation(id: string, school: string, degree: string, field: string, start: Int32Array, end: Int32Array, grade: string, activities: string, desc: string) {
        setLoading(true)

        try {
            const resAddEdu = await addEducationFunc({
                variables: {
                    UserID: id,
                    School: school,
                    Degree: degree,
                    FieldOfStudy: field,
                    StartDate: start,
                    EndDate: end,
                    Grade: grade,
                    Activities: activities,
                    Description: desc
                }
            })
            console.log(resAddEdu)
            successHandle("Successfully added education!")
        } catch (err: any) {
            errHandle(err)
        }
    }

    async function delEducation(id: string) {
        setLoading(true)

        try {
            const resDel = await deleteEducationFunc({ variables: { ID: id } })
            successHandle("Succcessfully deleted education")
            return true
        } catch (err: any) {
            errHandle(err)
            return false
        }
    }

    async function updateEducation(id: string, uid: string, school: string, degree: string, field: string, start: Int32Array, end: Int32Array, grade: string, activities: string, desc: string) {
        setLoading(true)

        try {
            const resUd = await updateEducationFunc({
                variables: {
                    id: id,
                    UserID: uid,
                    School: school,
                    Degree: degree,
                    FieldOfStudy: field,
                    StartDate: start,
                    EndDate: end,
                    Grade: grade,
                    Activities: activities,
                    Description: desc
                }
            })
            successHandle("Successfully updated education")
            return true
        } catch (err: any) {
            errHandle(err)
            return false
        }
    }

    async function addExperience(uid: string, title: string, employmentType: string, companyName: string, location: string, active: boolean, startYear: string, endYear: string, industry: string, description: string) {
        setLoading(true)

        try {
            const resC = await addExperienceFunc({
                variables: {
                    UserID: uid,
                    Title: title,
                    EmploymentType: employmentType,
                    CompanyName: companyName,
                    Location: location,
                    Active: active,
                    StartYear: startYear,
                    EndYear: endYear,
                    Industry: industry,
                    Description: description
                }
            })
            successHandle("Successfully added experience")
            return true
        } catch (err: any) {
            errHandle(err)
            return false
        }
    }

    async function delExperience(id: string) {
        setLoading(true)

        try {
            const resDel = await deleteExperienceFunc({ variables: { ID: id } })
            successHandle("Succcessfully removed experience")
            return true
        } catch (err: any) {
            errHandle(err)
            return false
        }
    }

    async function updateExperience(id: string, uid: string, title: string, employmentType: string, companyName: string, location: string, active: boolean, startYear: string, endYear: string, industry: string, description: string) {
        setLoading(true)

        try {
            const resUd = await updateExperienceFunc({
                variables: {
                    id: id,
                    UserID: uid,
                    Title: title,
                    EmploymentType: employmentType,
                    CompanyName: companyName,
                    Location: location,
                    Active: active,
                    StartYear: startYear,
                    EndYear: endYear,
                    Industry: industry,
                    Description: description
                }
            })
            successHandle("Successfully updated experience")
            return true
        } catch (err: any) {
            errHandle(err)
            return false
        }
    }

    return {
        login,
        register,
        validateUser,
        reqChangePass,
        validateChangePassReq,
        changePass,
        setProfilePict,
        setBgPict,
        addEducation,
        delEducation,
        updateEducation,
        addExperience,
        delExperience,
        updateExperience
    }
}