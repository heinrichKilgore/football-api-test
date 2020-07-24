import Axios from 'axios'

export default Axios.create({
    baseURL:'https://api.unsplash.com/',
    headers:{
        Authorization:'Client-ID -tAyVytNI4r-zAIwYYFbTxV47d8kJDvv2fY7dqbCssQ'
    }
})