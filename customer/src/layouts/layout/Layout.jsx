import Navbar from '../layoutComponents/navbar/Navbar'
import Footer from '../layoutComponents/footer/Footer'
import { Outlet } from 'react-router-dom'
const Layout = ({ children }) => {
    return (
        <div>
            <Navbar />
            {children}
            <Footer />
        </div>
    )
}

export default Layout
