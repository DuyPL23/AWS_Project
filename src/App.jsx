import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import About from './pages/About'
import MyLearn from './pages/MyLearn'
import Search from './pages/Search'
import Notification from './pages/Notification'
import Signin from './form/Signin'
import Signup from './form/Signup'
import Profile from './pages/Profile'
import Lesson from './pages/Lesson'
import Toasts from './components/Toast'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/mylearn" element={<MyLearn />} />
          <Route path="/lesson/:id" element={<Lesson />} />
          <Route path="/search" element={<Search />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
      <Toasts />
    </div>
  )
}
