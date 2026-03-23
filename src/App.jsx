import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Usuarios from './pages/Usuarios'
import PrivateRoute from './components/PrivateRoute'
import Home from './pages/Home'
import MainLayout from "./layouts/MainLayout";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />

                <Route
                    path="/usuarios"
                    element={
                        <PrivateRoute>
                            <MainLayout>
                                <Usuarios />
                            </MainLayout>
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/home"
                    element={
                        <PrivateRoute>
                            <MainLayout>
                                <Home />
                            </MainLayout>
                            
                        </PrivateRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    )
}

export default App
