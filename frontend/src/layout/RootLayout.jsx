import { Outlet } from "react-router-dom"
import Footer from "../components/Footer/Footer"
import NavBar from "../components/NavBar"

export default function RootLayout() {
    return (
        <div className="root-layout">
            <header>
                <NavBar/>
            </header>
            <main>
                {/* Outlet is a placeholder for the content of children routes */}
                <Outlet />
            </main>
            <Footer/>
        </div>
    )
}