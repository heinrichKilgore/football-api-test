import footballApi from '../Api/football-data'

//Action creator
export const getCompetitions = () => {
    return async (dispatch, getState) => {
        try{
            const respose = await footballApi.get('/v2/competitions',{
                params:{
                    plan:'TIER_ONE'
                }
            })
            let runningCompetitionsList=respose.data.competitions.filter((item)=>{
                
                return item.currentSeason.winner==null
            })

            dispatch({
                type: 'GET_COMPETITIONS',
                payload: runningCompetitionsList
            })
        }
        catch{
            dispatch({
                type: 'ERROR'
            })
        }
    }
}

export const makeBetOnScore = (user,matchId,bet,amount) => {
    return {
        type: 'MAKE_BET',
        payload: {
            user: user,
            matchId:matchId,
            type:1,
            bet:bet,
            amount: amount
        }
    }
}

export const getUsers=()=>{
    return {
        type:'GET_USERS'
    }
}

export const selectUser=(user)=>{
    return{
        type:'SELECT_USER',
        payload:{
            user:user
        }
    }
}

export const selectMatch=(match)=>{
    return{
        type:'SELECT_MATCH',
        payload:{
            match:match
        }
    }
}

