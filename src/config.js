const Config = {
    api: 'https://localhost:7148',
    headers: {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    }
}

export default Config;