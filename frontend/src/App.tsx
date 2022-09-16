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
import { ProvideUserProfile } from "./pages/Profile";
import MyNetwork from "./pages/MyNetwork";
import Jobs from "./pages/Jobs";
import Notification from "./pages/Notification";
import { offsetLimitPagination, Reference } from "@apollo/client/utilities";
import Message from "./pages/Message";
import Search from "./pages/Search";

export function App() {
  const { user, theme } = useAuth()

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
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            postInfinity: offsetLimitPagination(),
          },
        },
      },
    }),
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
                <Route path="mynetwork" element={<MyNetwork />} />
                <Route path="jobs" element={<Jobs />} />
                <Route path="notifications" element={<Notification />} />
                <Route path="profile/:id" element={<ProvideUserProfile />} />
                <Route path="messages" element={<Message />} />
                <Route path="search/:input" element={<Search />} />
                <Route path="search/people/:input" element={<Search />} />
                <Route path="search/hashtags/:input" element={<Search />} />
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