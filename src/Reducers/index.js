import { combineReducers } from "redux"

import Faker from 'faker'

const competitionList = (list = [], action) => {
    switch(action.type){
        case "GET_COMPETITIONS":
            return action.payload
        default:
            return list
    }
}

const ourCash = (amount=0,action)=>{
    switch(action.type){
        case("MAKE_BET"):
            let totalAmount=amount+(action.payload.amount*0.05)
            return totalAmount
        
        default:
            return amount
    }
}

// const usersCash = (users=[],action)=>{
//     switch(action.type){
//         case ("MAKE_BET"):
//             let newCredits=[...users];
//             newCredits.map((item)=>{
//                 debugger
//                 if(item.id===action.payload.user){
//                     item.credit=item.credit-action.payload.amount
//                 }
//             })
//             //newCredits[action.payload.user]=newCredits[action.payload.user]-action.payload.amount
//             return newCredits
//         default:
//             return users

//     }
// }

const betsList = (betsList={},action)=>{
    switch(action.type){
        case("MAKE_BET"):
        let newBetsList={...betsList}

        newBetsList[action.payload.matchId]=newBetsList[action.payload.matchId]?newBetsList[action.payload.matchId]:{}
        newBetsList[action.payload.matchId][action.payload.user]=
        newBetsList[action.payload.matchId][action.payload.user]?
            newBetsList[action.payload.matchId][action.payload.user]:[]
        newBetsList[action.payload.matchId][action.payload.user].push({
            bet:action.payload.bet,
            amount:action.payload.amount*0.95,
            type:action.payload.type
        })
        return newBetsList
        default:
            return betsList
        
    }
}

const usersList = (users=[],action)=>{
    switch(action.type){
        case "GET_USERS":
            debugger
            let newList=[]
            for(let i=0;i<5;i++){
                
                newList.push(
                    {
                        name:`${Faker.name.firstName()} ${Faker.name.lastName()}`,
                        id:Faker.random.uuid(),
                        credit:1000
                    }
                )
                
            }
            return newList
        case ("MAKE_BET"):
            let newCredits=[...users];
            newCredits=newCredits.map((item)=>{
                if(item.id===action.payload.user){
                    item.credit=item.credit-action.payload.amount
                }
                return item
            })
            //newCredits[action.payload.user]=newCredits[action.payload.user]-action.payload.amount
            return newCredits
        default:
            return users

    }

}

const selectedUser=(user={},action)=>{
    switch(action.type){
        case 'SELECT_USER':
            return action.payload.user
        default:
            return user
    }
}

const selectedMatch=(match={},action)=>{
    switch(action.type){
        case 'SELECT_MATCH':
            return action.payload.match
        default:
            return match
    }
}

export default combineReducers({
    competitionList: competitionList,
    betsList:betsList,
    // creditsList:usersCash,
    ourCash:ourCash,
    users:usersList,
    selectedUser:selectedUser,
    selectedMatch:selectedMatch
})