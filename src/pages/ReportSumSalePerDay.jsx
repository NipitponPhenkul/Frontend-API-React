import { useState } from 'react';
import Template from '../components/Template';

function ReportSumSalePerDay() {
    const myDate = new Date();
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
                                        <select className='form-control'>
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
                                        <select className='form-control'>
                                            { arrMonth.map(item => 
                                                <option value={item.monthIndex} selected={item.selected}>
                                                    {item.value}
                                                </option>
                                            )}
                                        </select>
                                    </div>
                                </div>
                                <div className='col-4'>
                                    <button className='btn btn-primary'>
                                        <i className='fa fa-check mr-2'></i>
                                        Show
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Template>
        </>
    )
}

export default ReportSumSalePerDay;