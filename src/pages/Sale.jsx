import { useEffect, useState } from 'react';
import Template from '../components/Template';
import Swal from 'sweetalert2';
import Config from '../config';
import axios from 'axios';
import Modal from '../components/Modal';

function Sale() {
    const [barcode, setBarcode] = useState();
    const [billSaleDetails, setBillSaleDetails] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [billSaleId, setBillSaleId] = useState();
    const [billSaleDetailsId, setBillSaleDetailId] = useState(0);
    const [billSaleDetailQty, setBillSaleDetailQty] = useState(0);

    useEffect(() => {
        fetchLastBill();
    }, []);

    const fetchLastBill = async () => {
        try {
            await axios.get(Config.api + '/api/Book/LastBillSale', Config.headers).then(res => {
                if (res.data.billSaleId !== 0) {
                    fetchData(res.data.billSaleId);
                    setBillSaleId(res.data.billSaleId);
                }
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

    const fetchData = async (billSaleId) => {
        try {
            await axios.get(Config.api + '/api/Book/BillSaleInfo/' + billSaleId, Config.headers).then(res => {
                setBillSaleDetails(res.data.results);
                handleComputePrice(res.data.results);
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

    const handleSale = async (e) => {
        e.preventDefault();
        try {
            await axios.post(Config.api + '/api/Book/Sale?barcode=' + barcode, null, Config.headers).then(res => {
                if (res.data.message === 'success') {
                    setBarcode("");
                    fetchData(res.data.billSaleId);
                }
            })
        } catch (error) {
            Swal.fire({
                title: 'error',
                text: e.message,
                icon: 'error'
            })
        }
    }

    const handleComputePrice = (billSaleDetails) => {
        let sum = 0;
        billSaleDetails.map(item => {
            sum += (item.qty * item.price);
        });

        setTotalPrice(sum);
    }

    const handleDeleteItem = (item) => {
        Swal.fire({
            title: 'ยืนยันการลบ',
            text: 'คุณต้องการลบข้อมูลใช่หรือไม่',
            icon: 'question',
            showCancelButton: true,
            showConfirmButton: true
        }).then(async res => {
            if (res.isConfirmed) {
                await axios.delete(Config.api + '/api/Book/DeleteSaleItem/' + item.id, Config.headers).then(res => {
                    if (res.data.message === 'success') {
                        fetchData(billSaleId);
                    }
                }).catch(err => {
                    throw err.response.data;
                })
            }
        })
    }

    const handleEditQty = (qty, id) => {
        setBillSaleDetailId(id);
        setBillSaleDetailQty(qty);
    }

    const handleEditSave = async () => {
        try {
            const id = billSaleDetailsId;
            const qty = billSaleDetailQty;
            await axios.put(Config.api + '/api/Book/EditSaleItem/' + id + '/' + qty, null, Config.headers).then(res => {
                if (res.data.message === 'success') {
                    document.getElementById('btnClose').click();
                    fetchData(billSaleId)
                }
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

    return(
        <>
            <Template>
                <div className='card'>
                    <div className='card-body'>
                        <div className='h5'>Sale List</div>

                        <div className='text-right'>
                            <span className='alert alert-secondary h5'>
                                {totalPrice.toLocaleString('th-TH')}
                            </span>
                        </div>

                        <div>
                            <form onSubmit={handleSale} className='input-group mt-4'>
                                <span className='input-group-text'>Barcode</span>
                                <input value={barcode} className='form-control' onChange={e => setBarcode(e.target.value)} />
                                <button className='btn btn-primary' onClick={handleSale}>
                                    <i className='fa fa-save'></i>
                                </button>
                            </form>
                        </div>

                        <table className='table table-bordered table-striped mt-3'>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>isbn</th>
                                    <th>list</th>
                                    <th>price</th>
                                    <th>count</th>
                                    <th>summary</th>
                                    <th width='130px'></th>
                                </tr>
                            </thead>
                            <tbody>
                            {billSaleDetails.length > 0 ? billSaleDetails.map((item, index) =>
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{item.isbn}</td>
                                    <td>{item.name}</td>
                                    <td>{item.price.toLocaleString('th-TH')}</td>
                                    <td>{item.qty}</td>
                                    <td>{(item.qty * item.price).toLocaleString('th-TH')}</td>
                                    <td className='text-center'>
                                        <button data-toggle='modal' data-target='#modalEditQty' onClick={e => handleEditQty(item.qty, item.id)} className='btn btn-primary mr-2'>
                                            <i className='fa fa-pen'></i>
                                        </button>
                                        <button onClick={e => handleDeleteItem(item)} className='btn btn-danger'>
                                            <i className='fa fa-times'></i>
                                        </button>
                                    </td>
                                </tr>
                            ) : ''}
                            </tbody>

                        </table>
                    </div>
                </div>
            </Template>

            <Modal title='แก้ไขจำนวน' id='modalEditQty'>
                <div>
                    <label>จำนวน</label>
                    <input value={billSaleDetailQty} 
                        onChange={e => setBillSaleDetailQty(e.target.value)} 
                        className='form-control' 
                    />
                    <div className='mt-3'>
                        <button onClick={handleEditSave} className='btn btn-primary'>
                            Save
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default Sale;