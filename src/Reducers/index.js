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
    let totalAmount=amount
    switch(action.type){
        case("MAKE_BET"):
            totalAmount=amount+(action.payload.amount*0.05)
            return totalAmount
        case 'FINISH_BET':
            let winningAmount=totalWinnerBetsAmount(action.payload.matchId,action.payload.results)
            if(winningAmount==0){
                totalAmount=amount+totalBetsAmount(action.payload.matchId,action.payload.results.bets)
            }
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
    let newBetsList={...betsList}
    switch(action.type){
        case("MAKE_BET"):
        

        newBetsList[action.payload.matchId]=newBetsList[action.payload.matchId]?newBetsList[action.payload.matchId]:{}
        newBetsList[action.payload.matchId].users=newBetsList[action.payload.matchId].users?newBetsList[action.payload.matchId].users:{}
        newBetsList[action.payload.matchId].users[action.payload.user]=
        newBetsList[action.payload.matchId].users[action.payload.user]?
            newBetsList[action.payload.matchId].users[action.payload.user]:[]

        let betObj=null
        if(action.payload.type===1){
            betObj={
                homeScore:action.payload.bet.homeScore,
                awayScore:action.payload.bet.awayScore
            }
        }
        newBetsList[action.payload.matchId].users[action.payload.user].push({
            bet:betObj,
            amount:action.payload.amount*0.95,
            type:action.payload.type
        })
        newBetsList[action.payload.matchId].homeTeam=action.payload.bet.homeTeam
        newBetsList[action.payload.matchId].awayTeam=action.payload.bet.awayTeam
        return newBetsList
        case "FINISH_BET":
            
            newBetsList={}
            Object.keys(action.payload.results.bets).forEach(key=>{
                if(key!=action.payload.matchId){
                    newBetsList[key]=action.payload.results.bets[key]
                }
            })

            return newBetsList
        default:
            return betsList
        
    }
}

const totalBetsAmount=(matchId,bets)=>{
    
    let totalAmount=0
    Object.keys(bets).forEach(key=>{
        if(bets[key]!=null){
            let gamblers=bets[key].users
            if(gamblers){
                Object.keys(gamblers).forEach(i=>{
                    let gamblerBets=gamblers[i]
                    gamblerBets.forEach((item,i)=>{
                        totalAmount= totalAmount+item.amount
                    })
                })
            }
        }
    })
    return totalAmount

}

const totalWinnerBetsAmount=(matchId,results)=>{
    console.debug(matchId,results)
    let totalAmount=0
    let bets=results.bets
    Object.keys(bets).forEach(key=>{
        if(bets[key]!=null){
            let gamblers=bets[key].users
            if(gamblers){
                Object.keys(gamblers).forEach(i=>{
                    let gamblerBets=gamblers[i]
                    gamblerBets.forEach((item,i)=>{
                        if(results.homeScore==item.bet.homeScore&&results.awayScore==item.bet.awayScore)
                        totalAmount= totalAmount+item.amount
                    })
                })
            }
        }
    })
    console.debug("WINNING AMOUNT",totalAmount)
    return totalAmount
}

const getPayment=(matchId,results,user,totalAmount,totalWinningAmount)=>{
    console.debug(matchId,results,user,totalAmount,totalWinningAmount)
    let payment=0
    let bets=results.bets
    Object.keys(bets).forEach(key=>{
        
        if(bets[key]!=null){
            let gamblers=bets[key].users
            if(gamblers){
                Object.keys(gamblers).forEach(i=>{
                    
                    if(i==user){
                        let gamblerBets=gamblers[i]
                        gamblerBets.forEach((item,i)=>{
                            if(results.homeScore==item.bet.homeScore&&results.awayScore==item.bet.awayScore)
                            payment+= (totalAmount*item.amount/totalWinningAmount)
                        })
                    }
                    
                })
            }
        }
    })
    console.debug("PAYMENT",user,payment)
    return payment
}


const usersList = (users=[],action)=>{
    let newCredits=[...users];
    switch(action.type){
        case "GET_USERS":
            
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
            
            newCredits=newCredits.map((item)=>{
                if(item.id===action.payload.user){
                    item.credit=item.credit-action.payload.amount
                }
                return item
            })
            //newCredits[action.payload.user]=newCredits[action.payload.user]-action.payload.amount
            return newCredits
         case ("FINISH_BET"):
            let total=totalBetsAmount(action.payload.matchId,action.payload.results.bets)
            let winningAmount=totalWinnerBetsAmount(action.payload.matchId,action.payload.results)

            console.debug("TOTAL",total)
        //     action.payload.bets

            newCredits.forEach((item)=>{
                item.credit+=getPayment(action.payload.matchId,action.payload.results,item.id,total,winningAmount)
            })


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