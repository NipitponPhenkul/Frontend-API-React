import { useEffect, useState } from 'react';
import Config from '../config';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

function Sidebar() {
    const [userName, setUserName] = useState();
    const [level, setLevel] = useState();

    useEffect(() => {
        fetchData();
    }, [])
    const fetchData = async () => {
        try {
            await axios.post(Config.api + '/api/User/GetInfo', null, Config.headers).then(res => {
                setUserName(res.data.name);
                setLevel(res.data.level);
            }).catch(err => {
                throw err.response.data;
            })
        } catch (e) {
            Swal.fire({
                title: 'Error',
                text: e.message,
                icon: 'error'
            })
        }
    }

    return (
        <>
            <aside class="main-sidebar sidebar-dark-primary elevation-4">

                <a href="index3.html" class="brand-link">
                    <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" class="brand-image img-circle elevation-3" style={{opacity: '.8'}} />
                    <span class="brand-text font-weight-light">Back Office</span>
                </a>

                <div class="sidebar">
                    <div class="user-panel mt-3 pb-3 mb-3 d-flex">
                        <div class="image">
                            <img src="dist/img/user2-160x160.jpg" class="img-circle elevation-2" alt="User Image" />
                        </div>
                        <div class="info">
                            <a href="#" class="d-block">{userName} : {level}</a>
                        </div>
                    </div>

                    <div class="form-inline">
                        
                    </div>

                    <nav class="mt-2">
                        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                            <li class="nav-header">Menu</li>
                            <li class="nav-item">
                                <Link to="/home" class="nav-link">
                                    <i class="nav-icon fa fa-home"></i>
                                    <p>
                                        Home
                                    </p>
                                </Link>
                            </li>
                            <li class="nav-item">
                                <Link to="/products" class="nav-link">
                                    <i class="nav-icon fa fa-box"></i>
                                    <p>
                                        Product
                                    </p>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </aside>
        </>
    )
}

export default Sidebar;