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
        <div className="full-screen bg-base-100" data-theme={theme}>
          <ProvideBackEnd>
            {/* <Routes>
              <Route path="guest" element={
                <RequireGuest>
                  <div>
                    <Route path='login' element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="verification/:id" element={<Verification />} />
                  </div>
                </RequireGuest>
              } />
              <Route path="/" element={
                <RequireAuth>
                  <Home />
                </RequireAuth>
              } />
            </Routes> */}

            <Routes>
              <Route element={<MainLayout />}>
                <Route path="/home" element={<Home />} />
              </Route>

              <Route path="guest" element={<GuestLayout />}>
                <Route path='login' element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="verification/:id" element={<Verification />} />
              </Route>
            </Routes>
            
          </ProvideBackEnd>
        </div>
      </BrowserRouter>
    </ApolloProvider>
  )
}

function RequireAuth({ children }: { children: JSX.Element }) {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

function RequireGuest({ children }: { children: JSX.Element }) {
  const { user } = useAuth()
  let location = useLocation()

  if (user) return <Navigate to="/home" state={{ from: location }} replace />

  return children
} 