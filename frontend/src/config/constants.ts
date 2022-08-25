export const ROUTE = {
    ROUTE_LOGIN: "/guest/login",
    ROUTE_REGISTER: "/guest/register",
    ROUTE_VALIDATE: "/guest/validate:id",
    ROUTE_FORGOTPASS: "/guest/forgotpass",
    ROUTE_RESETPASS: "/guest/resetpass",
    ROUTE_HOME: "/home",
    ROUTE_MYNETWORK: "/mynetwork",
    ROUTE_JOBS: "/jobs",
    ROUTE_MESSAGES: "/messages",
    ROUTE_NOTIFICATIONS: "/notifications",
    ROUTE_PROFILE: (id: string) => {return "/profile/" + id}
}