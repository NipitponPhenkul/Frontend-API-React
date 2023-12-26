import { useEffect, useState } from 'react';
import Template from '../components/Template';
import Swal from 'sweetalert2';
import axios from 'axios';
import Config from '../config';

function UserProfile() {
    const [name, setName] = useState('');
    const [usr, setUsr] = useState('');
    const [pwd, setPwd] = useState('');

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        try {
            await axios.post(Config.api + '/api/User/GetInfo', null, Config.headers).then(res => {
                    setName(res.data.name);
                    setUsr(res.data.usr);
            }).catch(err => {
                throw err.response.data;
            })
        } catch (err) {
            Swal.fire({
                title: 'error',
                text: err.message,
                icon: 'error'
            })
        }
    }

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const params = {
                name: name,
                usr: usr,
                pwd: pwd
            }
            await axios.post(Config.api + '/api/User/ChangeProfileSave', params, Config.headers).then(res => {
                if (res.data.message === 'success') {
                    Swal.fire({
                        title: 'Save Data',
                        text: 'Save Data Success',
                        icon: 'success',
                        timer: 1000
                    });
                }
            })
        } catch (error) {
            Swal.fire({
                title: 'error',
                text: error.message,
                icon: 'error'
            })
        }
    }

    return(
        <>
            <Template>
                <div className='h5'>Profile Setting</div>
                <div className='card'>
                    <form onSubmit={handleSave} className='card-body'>
                        <div>Name</div>
                        <input value={name} onChange={e => setName(e.target.value)} className='form-control' />
                        <div>Username</div>
                        <input value={usr} onChange={e => setUsr(e.target.value)} className='form-control' />
                        <div>Password</div>
                        <input onChange={e => setPwd(e.target.value)} className='form-control' type='password' />
                        <button onClick={handleSave} className='btn btn-primary mt-2'>
                            Save
                        </button>
                    </form>
                </div>
            </Template>
        </>
    )
}

export default UserProfile;