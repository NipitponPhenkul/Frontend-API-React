import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function Navbar() {
    const navigate = useNavigate();
    const logout = () => {
        Swal.fire({
            title: 'logout',
            text: 'you confirm to logout?',
            icon: 'question',
            showCancelButton: true,
            showConfirmButton: true,
            cancelButtonText: 'cancel',
            confirmButtonText: 'confirm'
        }).then(res => {
            if (res.isConfirmed) {
                localStorage.removeItem('token');
                navigate('/');
            }
        })
    }
    return (
        <>
            <nav class="main-header navbar navbar-expand navbar-white navbar-light">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
                    </li>
                </ul>

                <ul class="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link to='/changeProfile' className="btn btn-info mr-2">
                            <i className='fa fa-cog'></i>
                            &nbsp;
                            Setting
                        </Link>
                        <button onClick={logout} className='btn btn-danger'>
                            Logout
                            &nbsp;
                            <i className='fa fa-times'></i>
                        </button>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default Navbar;