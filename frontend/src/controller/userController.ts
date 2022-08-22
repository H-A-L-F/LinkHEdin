import { useMutation } from "@apollo/client";
import { LOGIN_QUERY, REGISTER_QUERY } from "../query/user";

export function login(email: string, password: string) {
    const [loginFunc, { data, loading, error }] = useMutation(LOGIN_QUERY)
    loginFunc({ variables: { email: email, password: password } })
    return { data, loading, error }
}

export function register(name: string, email: string, password: string) {
    const [registerFunc, { data, loading, error }] = useMutation(REGISTER_QUERY);
    const input = {
        name: name,
        email: email,
        password: password,
    };
    registerFunc({ variables: { input: input } });

    return { data, loading, error }
}