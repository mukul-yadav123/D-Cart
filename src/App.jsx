import './App.css'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from 'react-router-dom'
import { Home,Order,Cart,Dashboard,NoPage, Login, Signup, ProductInfo, AddProduct, UpdateProduct, AllProducts } from './pages'
import MyState from './context/data/MyState'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <MyState>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/order' element={<ProtectedUser>
            <Order/>
          </ProtectedUser>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path="/productinfo/:id" element={<ProductInfo />} />
          <Route path='/allproducts' element={<AllProducts/>}/>
          <Route path="/addproduct" element={
          <ProtectedAdmin>
            <AddProduct />
          </ProtectedAdmin>} />
          <Route path="/updateproduct" element={<ProtectedAdmin>
            <UpdateProduct />
          </ProtectedAdmin>} />
          <Route path='/dashboard' element={<ProtectedAdmin>
            <Dashboard/>
          </ProtectedAdmin>}/>
          <Route path='/*' element={<NoPage/>}/>
        </Routes>
        <ToastContainer/>
      </Router>
    </MyState>
  )
}

export default App

export const ProtectedUser = ({children}) => {
  const user = localStorage.getItem('user');
  if(user)
  return children;
  else
  return <Navigate to={'/login'}/>
}

export const ProtectedAdmin = ({children}) => {
  const admin = JSON.parse(localStorage.getItem('user'));
  if(admin.user.email === 'mukuly2002@gmail.com')
  return children;
  else 
  return <Navigate to={'/login'}/>
}


