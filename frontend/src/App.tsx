import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"
import { useLocalStorage } from "./hooks/useLocalStorage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');
  
  return (
    <BrowserRouter>
      <ToastContainer />
      <div className="full-screen bg-base-100" data-theme={theme}>
        <Routes>
          <Route path='login' element={<Login />} />
          <Route path="register" element={<Register />}/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
