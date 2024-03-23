
import { useNavigate } from 'react-router-dom';

export default function LogoutComponent({setIsLoggedIn}) {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear local storage
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userId');
        // Redirect to login page
        setIsLoggedIn(false);
        navigate('/login');
    };

    // Perform logout action immediately
    // This will execute the logout function when the component renders
    // Instead, you should trigger this function when the user clicks on a logout button or link
    handleLogout();

    // This component doesn't need to render anything
    // You can simply return null
    return null;
}
