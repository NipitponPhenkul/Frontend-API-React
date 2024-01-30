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

    return (
        <>
            <Template>
                <div>Home</div>
            </Template>
        </>
    )
}

export default Home;