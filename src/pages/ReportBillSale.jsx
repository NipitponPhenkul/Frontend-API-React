import { useEffect, useState } from 'react';
import Template from '../components/Template';
import Swal from 'sweetalert2';
import axios from 'axios';
import Config from '../config';
import * as dayjs from 'dayjs';

function ReportBillSale() {
    const myDate = new Date();
    const y = myDate.getFullYear();
    const m = (myDate.getMonth() + 1).toString().padStart(2, '0');
    const d = myDate.getDate().toString().padStart(2, '0');

    const [fromDate, setFromDate] = useState(() => {
        return `${y}-${m}-01`;
    });
    const [toDate, setToDate] = useState(() => {
        return `${y}-${m}-${d}`;
    });
    const [billSales, setBillSales] = useState([]);

    useEffect(() => {
        handleShowReport();
    }, []);

    const handleShowReport = async () => {
        try {
            const payload = {
                FromDate: fromDate,
                ToDate: toDate
            }
            await axios.post(Config.api + '/api/Report/BillSale', payload, Config.headers).then(res => {
                setBillSales(res.data.results);
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

    return (
        <>
            <Template>
                <div className='card'>
                    <div className='card-body'>
                        <div className='h5'>Bill Sale</div>

                        <div className='row'>
                            <div className='col-4'>
                                <div className='input-group'>
                                    <span className='input-group-text'>Day</span>
                                    <input value={fromDate} onChange={e => setFromDate(e.target.value)} type='date' className='form-control' />
                                </div>
                            </div>
                            <div className='col-4'>
                                <div className='input-group'>
                                    <span className='input-group-text'>To</span>
                                    <input value={toDate} onChange={e => setToDate(e.target.value)} type='date' className='form-control' />
                                </div>
                            </div>
                            <div className='col-4'>
                                <button onClick={handleShowReport} className='btn btn-primary'>
                                    <i className='fa fa-check mr-2'></i>
                                    Show
                                </button>
                            </div>
                        </div>
                        <table className='table table-bordered table-striped mt-2'>
                            <thead>
                                <tr>
                                    <th width="150px"></th>
                                    <th>#</th>
                                    <th>Bill Number</th>
                                    <th>Payment Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                { billSales.length > 0 ? billSales.map((item, index) =>
                                <tr>
                                    <td>
                                        <button className='btn btn-primary'>
                                            <i className='fa fa-file-alt mr-2'></i>
                                            Bill Details
                                        </button>
                                    </td>
                                    <td>{index + 1}</td>
                                    <td>{item.id}</td>
                                    <td>{dayjs(item.pay_at).format('DD/MM/YYYY HH:mm')}</td>
                                </tr>
                                ) : "" }
                            </tbody>
                        </table>
                    </div>
                </div>
            </Template>
        </>
    )
}

export default ReportBillSale;