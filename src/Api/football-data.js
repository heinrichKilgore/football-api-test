import Axios from 'axios'

export default Axios.create({
    baseURL:'https://api.football-data.org',
    headers:{
        'X-Auth-Token':'3198bdc19d294b47b31985ac4e9b9b88'
    }
})