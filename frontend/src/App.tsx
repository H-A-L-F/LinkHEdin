import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate
} from "react-router-dom"
import { useLocalStorage } from "./hooks/useLocalStorage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import { useAuth } from "./hooks/useAuth";
import { ApolloClient, ApolloLink, ApolloProvider, createHttpLink, InMemoryCache } from "@apollo/client";
import Verification from "./pages/Verification";
import { ProvideBackEnd } from "./hooks/useBackEnd";
import MainLayout from "./layout/MainLayout";
import GuestLayout from "./layout/GuestLayout";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Profile from "./pages/Profile";

export function App() {
  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');
  const { user } = useAuth()

  const main_url = "http://localhost:8080";
  const url = main_url + "/query";

  const authLink = new ApolloLink((operation: any, forward: any) => {
    if (user && user.token !== undefined) {
      operation.setContext({
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      });
    }
    return forward(operation);
  });

  const httpLink = createHttpLink({
    uri: url,
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({}),
  });

  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <ToastContainer />
        <div className="main" data-theme={theme}>
          <ProvideBackEnd>

            <Routes>
              <Route path="/" element={<MainLayout />}>
                <Route path="home" element={<Home />} />
                <Route path="profile/:id" element={<Profile />} />
              </Route>

              <Route path="guest" element={<GuestLayout />}>
                <Route path='login' element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="verification/:id" element={<Verification />} />
                <Route path="forgotpass" element={<ForgotPassword />} />
                <Route path="resetpass/:id" element={<ResetPassword />} />
              </Route>
            </Routes>

          </ProvideBackEnd>
        </div>
      </BrowserRouter>
    </ApolloProvider>
  )
}