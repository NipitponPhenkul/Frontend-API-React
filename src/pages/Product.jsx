import Template from '../components/Template';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Config from '../config';
import Modal from '../components/Modal';

function Product() {
    const [books, setBooks] = useState([]);
    const [book, setBook] = useState({});

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            await axios.get(Config.api + '/api/Book/List', Config.headers).then(res => {
                setBooks(res.data);
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

    const handleSave = async () => {
        try {
            if (book.id == null) {
                await axios.put(Config.api + '/api/Book/Create', book, Config.headers).then(res => {
                    if (res.data.message === 'success') {
                        fetchData();
                        document.getElementById('btnClose').click();
                    }
                }).catch(err => {
                    throw err.response.data
                })
            } else {
                await axios.post(Config.api + '/api/Book/Edit', book, Config.headers).then(res => {
                    if (res.data.message === 'success') {
                        fetchData();
                        document.getElementById('btnClose').click();
                    }
                }).catch(err => {
                    throw err.response.data;
                })
            }
        } catch (error) {
            Swal.fire({
                title: 'error',
                text: error.message,
                icon: 'error'
            })
        }
    }

    const handleDelete = (item) => {
        Swal.fire({
            title: 'Delete Product',
            text: 'Are you sure delete product?',
            icon: 'question',
            showConfirmButton: true,
            showCancelButton: true
        }).then(async res => {
            if (res.isConfirmed) {
                try {
                    await axios.delete(Config.api + '/api/Book/Remove/' + item.id, Config.headers).then(res => {
                        if (res.data.message === 'success') {
                            fetchData();
                        }
                    }).catch(err => {
                        throw err.response.data;
                    })
                } catch (error) {
                    Swal.fire({
                        title: 'error',
                        text: error.message,
                        icon: 'error'
                    })
                }
            }
        })
    }

    const handleNewData = () => {
        setBook({
            name: '',
            isbn: '',
            price: ''
        })
    }

    return (
        <>
            <Template>
                <div className='carc'>
                    <div className='card-body'>
                        <div className='h3'>Product</div>

                        <button onClick={handleNewData} className='btn btn-primary' data-target='#modalForm' data-toggle='modal'>
                            <i className='fa fa-plus' style={{ marginRight: '10px'}}></i>
                            Create Product
                        </button>

                        {books.length > 0 ?
                            <table className='table table-bordered table-stiped mt-2'>
                                <thead>
                                    <tr>
                                        <th>id</th>
                                        <th>isbn</th>
                                        <th>name</th>
                                        <th>price</th>
                                        <th width="200px"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {books.map(item =>
                                        <tr>
                                            <td>{item.id}</td>
                                            <td>{item.isbn}</td>
                                            <td>{item.name}</td>
                                            <td>{item.price}</td>
                                            <td className='text-center'>
                                                <button data-toggle='modal' data-target='#modalForm' onClick={e => setBook(item)} className='btn btn-info' style={{ marginRight: '3px' }}>
                                                    <i className='fa fa-pen'></i>
                                                </button>
                                                <button onClick={e => setBook(item)} data-toggle='modal' data-target='#modalInfo' className='btn btn-success' style={{ marginRight: '3px' }}>
                                                    <i className='fa fa-file'></i>
                                                </button>
                                                <button onClick={e => handleDelete(item)} className='btn btn-danger'>
                                                    <i className='fa fa-times'></i>
                                                </button>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                            :
                            ''}
                    </div>
                </div>
            </Template>
            <Modal id='modalForm' title='book data' >
                <div>
                    <label>isbn</label>
                    <input value={book.isbn} onChange={e => setBook({ ...book, isbn: e.target.value })} className='form-control'></input>
                </div>
                <div className='mt-2'>
                    <label>name</label>
                    <input value={book.name} onChange={e => setBook({ ...book, name: e.target.value })} className='form-control'></input>
                </div>
                <div className='mt-2'>
                    <label>price</label>
                    <input value={book.price} onChange={e => setBook({ ...book, price: e.target.value })} className='form-control'></input>
                </div>
                <div className='mt-2'>
                    <button onClick={handleSave} className='btn btn-primary'>
                        <i className='fa fa-check' style={{ marginRight: '10px' }}></i>
                        Save
                    </button>
                </div>
            </Modal>

            <Modal id='modalInfo' title='book data'>
                <div className='row'>
                    <div className='col-2'>isbn</div>
                    <div className='col-10'>{book.isbn}</div>
                </div>                        
                <div className='row mt-2'>
                    <div className='col-2'>name</div>
                    <div className='col-10'>{book.name}</div>
                </div>                        
                <div className='row mt-2'>
                    <div className='col-2'>price</div>
                    <div className='col-10'>{book.price}</div>
                </div>                        
            </Modal>
        </>
    )
}

export default Product;