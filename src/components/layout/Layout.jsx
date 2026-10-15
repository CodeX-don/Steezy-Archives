import { Outlet } from 'react-router-dom'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import Toast from '../ui/Toast.jsx'

export default function Layout() {
  return (
    <div className="min-h-screen bg-primary text-textprimary font-mono no-round">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <Toast />
    </div>
  )
}
