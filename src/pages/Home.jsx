import Template from '../components/Template';
import React, { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import Config from '../config';
import Swal from 'sweetalert2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function Home() {
    const myDate = new Date();
    const [year, setYear] = useState(myDate.getFullYear());
    const [arrYear, setArrYear] = useState(() => {
        let arr = [];
        let y = myDate.getFullYear();
        let startYear = (y - 5);

        for (let i = startYear; i <= y; i++) {
            arr.push(i);
        }

        return arr;
    })
    const [myData, setMyData] = useState({});
    const [options, setOptions] = useState(() => {
        return {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top'
                }
            }
        }
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            await axios.get(Config.api + '/api/Report/SumSalePerYear/' + year, Config.headers).then(res => {
                const results = res.data.results;
                let arr = [];

                for (let i = 0; i < results.length; i++) {
                    const item = results[i];
                    arr.push(item.totalSum);
                }
                const labels = [
                    'January', 'February', 'March', 'April', 'May', 'June',
                    'July', 'August', 'September', 'October', 'November', 'December'
                ];

                setMyData({
                    labels,
                    datasets: [
                        {
                            label: 'Sales',
                            data: arr,
                            backgroundColors: 'rgba(255, 99, 132, 0.5)'
                        }
                    ]
                });
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
                        <div className='h5'>Dashboard</div>
                        <div className='row mt-2'>
                            <div className='col-4'>
                                <div className='input-group'>
                                    <span className='input-group-text'>year</span>
                                    <select value={year} className='form-control' onChange={e => setYear(e.target.value)}>
                                        {arrYear.length > 0 ? arrYear.map(item =>
                                            <option value={item}>
                                                {item}
                                            </option>
                                        ) : ''}
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
                        <div className='text-center mt-3'>
                            <div className='h5'>Report Summary Sales Per Month and Year {year}</div>
                        </div>
                        <div className='mt-3'>
                            {myData.datasets != null ? <Bar options={options} data={myData} /> : ''}                            
                        </div>
                    </div>
                </div>

            </Template>
        </>
    )
}

export default Home;