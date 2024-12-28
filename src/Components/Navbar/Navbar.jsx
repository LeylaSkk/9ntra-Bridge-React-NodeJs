import React from 'react';
import './Navbar.css';
import logo from "../Assets/BridgePic.png";
import cart from "../Assets/carticon.jpg";
import { Link } from 'react-router-dom';
import { useCart } from '../../Context/CartContext';
import { useAuth} from '../../Context/AuthContext';


const Navbar = () => {
    const { user, logout } = useAuth();
    const { getCartCount } = useCart();

    return (
        <div className='navbar'>
            <div className='nav-logo'>
                <img src={logo} alt='' />
            </div>
            <div className='nav-login-cart'>
                {user ? (
                    <>
                        <span>Welcome, {user.fullName}</span>
                        <button onClick={logout}>Logout</button>
                    </>
                ) : (
                    <Link to='/login'><button>Login</button></Link>
                )}
                <Link to='/cart'><img src={cart} alt='' /></Link>
                <div className='nav-cart-count'>{getCartCount()}</div>
            </div>
        </div>
    );
};
export default Navbar;