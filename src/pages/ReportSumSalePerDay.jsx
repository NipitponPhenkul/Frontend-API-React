import { useState, useEffect } from 'react';
import Template from '../components/Template';
import Swal from 'sweetalert2';
import axios from 'axios';
import Config from '../config';

function ReportSumSalePerDay() {
    const myDate = new Date();

    const [days, setDays] = useState([]);
    const [year, setYear] = useState(myDate.getFullYear());
    const [month, setMonth] = useState(myDate.getMonth() + 1);

    const [arrYear, setArrYear] = useState(() => {
        let arr = [];
        let y = myDate.getFullYear();
        let startYear = (y - 5);
        for (let i = startYear; i <= y; i++) {
            arr.push({
                selected: (i === y),
                value: i
            });
        }
        return arr;
    })
    const [arrMonth, setArrMonth] = useState(() => {
        let arr = [
            'January', 'February', 'March', 'April', 'May', 'June', 
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        const currentMonth = myDate.getMonth();
        let newArr = [];
        for (let i = 0; i < arr.length; i++) {
            newArr.push({
                monthIndex: (i + 1),
                value: arr[i],
                selected: (i === currentMonth)
            })
        }
        return newArr;
    })

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            axios.get(Config.api + '/api/Report/SumSalePerMonth/' + year + '/' + month, Config.headers).then(res => {
                setDays(res.data.results);
            }).catch(err => {
                throw err.response.data;
            })
        } catch (e) {
            Swal.fire({
                title: 'error',
                text: e.message,
                icon: 'error'
            })
        }
    }

    return (
        <>
            <Template>
                <div className='card'>
                    <div className='card-body'>
                        <div className='h5'>Report Bill Sale (Day)</div>
                        <div>
                            <div className='row'>
                                <div className='col-4'>
                                    <div className='input-group'>
                                        <span className='input-group-text'>Year</span>
                                        <select className='form-control' onChange={e => setYear(e.target.value)}>
                                            { arrYear.map(item => 
                                                <option value={item.value} selected={item.selected}>
                                                    {item.value}
                                                </option>
                                            )}
                                        </select>
                                    </div>
                                </div>
                                <div className='col-4'>
                                    <div className='input-group'>
                                        <span className='input-group-text'>Month</span>
                                        <select className='form-control' onChange={e => setMonth(e.target.value)}>
                                            { arrMonth.map(item => 
                                                <option value={item.monthIndex} selected={item.selected}>
                                                    {item.value}
                                                </option>
                                            )}
                                        </select>
                                    </div>
                                </div>
                                <div className='col-4'>
                                    <button onClick={fetchData} className='btn btn-primary'>
                                        <i className='fa fa-check mr-2'></i>
                                        Show
                                    </button>
                                </div>
                            </div>
                        </div>
                        <table className='table table-bordered table-striped mt-3'>
                            <thead>
                                <tr>
                                    <th width='100px'>Date</th>
                                    <th>Sales</th>
                                </tr>
                            </thead>
                            <tbody>
                                { days.length > 0 ? days.map(item => 
                                <tr>
                                    <td>{item.day}</td>
                                    <td className='text-right'>{item.totalSum.toLocaleString('th-TH')}</td>
                                </tr>
                                ) : ''}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Template>
        </>
    )
}

export default ReportSumSalePerDay;