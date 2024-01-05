import Template from '../components/Template';

function ReportBillSale() {
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
                                    <input type='date' className='form-control' />
                                </div>
                            </div>
                            <div className='col-4'>
                                <div className='input-group'>
                                    <span className='input-group-text'>To</span>
                                    <input type='date' className='form-control' />
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
            </Template>
        </>
    )
}

export default ReportBillSale;