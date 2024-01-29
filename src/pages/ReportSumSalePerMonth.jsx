import { useState, useEffect } from 'react';
import Template from '../components/Template';
import Swal from 'sweetalert2';
import axios from 'axios';
import Config from '../config';

function ReportSumSalePerMonth() {
    const myDate = new Date();

    const [months, setMonths] = useState([]);
    const [year, setYear] = useState(myDate.getFullYear());

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

    
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            axios.get(Config.api + '/api/Report/SumSalePerYear/' + year, Config.headers).then(res => {
                setMonths(res.data.results);
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
                        <div className='h5'>Report Bill Sale (Month)</div>

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
                                    <th width='100px'>Month</th>
                                    <th>Sales</th>
                                </tr>
                            </thead>
                            <tbody>
                                { months.length > 0 ? months.map(item => 
                                <tr>
                                    <td>{item.month}</td>
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

export default ReportSumSalePerMonth;