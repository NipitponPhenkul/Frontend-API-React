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
            <aside className="main-sidebar sidebar-dark-primary elevation-4">

                <a href="index3.html" className="brand-link">
                    <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{opacity: '.8'}} />
                    <span className="brand-text font-weight-light">Back Office</span>
                </a>

                <div className="sidebar">
                    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                        <div className="image">
                            <img src="dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
                        </div>
                        <div className="info">
                            <a href="#" className="d-block">{userName} : {level}</a>
                        </div>
                    </div>

                    <div className="form-inline">
                        
                    </div>

                    <nav className="mt-2">
                        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                            <li className="nav-header">Menu</li>
                            <li className="nav-item">
                                <Link to="/home" className="nav-link">
                                    <i className="nav-icon fa fa-home"></i>
                                    <p>
                                        Dashboard
                                    </p>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/sale" className="nav-link">
                                    <i className="nav-icon fa fa-dollar-sign"></i>
                                    <p>
                                        Sale List
                                    </p>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/reportBillSale' className="nav-link">
                                    <i className="nav-icon fa fa-list-alt"></i>
                                    <p>Bill Sale</p>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/reportSumSalePerDay' className="nav-link">
                                    <i className="nav-icon fa fa-list"></i>
                                    <p>Bill Sale (DAY)</p>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/reportBillSale' className="nav-link">
                                    <i className="nav-icon fa fa-file-alt"></i>
                                    <p>Bill Sale (MONTH)</p>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/products" className="nav-link">
                                    <i className="nav-icon fa fa-box"></i>
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