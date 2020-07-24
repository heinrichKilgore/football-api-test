import React from 'react'
import fooballApi from '../../Api/football-data'
import { useEffect } from 'react'
import { useState } from 'react'
import { Container,Row,Col,Image } from 'react-bootstrap'

import Match from '../Match'

const Matches = (props)=>{
    
    

    const[loading,setLoading]=useState(true)
    const [matches,setMatches] = useState([])

    useEffect(()=>{

        const getMatches=async ()=>{
            
            let response= await fooballApi.get(`/v2/competitions/${props.match.params.matchId}/matches`,{
                params:{
                    plan:'TIER_ONE',
                    // dateFrom:'2020-01-01',
                    // dateTo:'2020-07-27'
                    status:'SCHEDULED'
                }
            })

            
            
           
            
            let newMatches=response.data.matches

            newMatches=await Promise.all(newMatches.map(async(item)=>{
                try{
                    response=await fooballApi.get(`/v2/teams/${item.awayTeam.id}`)
                    item.awayTeam.flag=response.data.crestUrl
                }catch(e){

                }
                try{
                    response=await fooballApi.get(`/v2/teams/${item.homeTeam.id}`)
                    item.homeTeam.flag=response.data.crestUrl
                }catch(e){}
                

                return item
            }))

            setMatches(newMatches)

            setLoading(false)
            console.debug(newMatches)
        }

        getMatches()
       
        
    }
    ,[])

    if(loading){
        return <div>Cargando...</div>
    }else{
        return(
            <Container>
               
                {
                    
                    matches.map((match)=>{
                        return (
                            // <Row>
                            //     <Col>{match.homeTeam.name}</Col>
                            //     <Col><Image src={match.homeTeam.flag} thumbnail /></Col>
                                
                            //     <Col>{match.awayTeam.name}</Col>
                            //     <Col><Image src={match.awayTeam.flag} thumbnail /></Col>
                            // </Row>
                            <Match matchId={match.id}
                            homeTeam={{
                                id:match.homeTeam.id,
                                name:match.homeTeam.name,
                                flag:match.homeTeam.flag
                            }
                                
                            }
                            
                            awayTeam={{
                                id:match.awayTeam.id,
                                name:match.awayTeam.name,
                                flag:match.awayTeam.flag
                            }}
                            />
                        )
                    })
                        // <Container>
                        //     <Row>
                        //         <Col>{match.homeTeam.name}</Col>
                        //         <Col></Col>
                        //         <Col>-</Col>
                        //         <Col></Col>
                        //         <Col>{match.awayTeam.name}</Col>
                        //     </Row>
                        // </Container>
                    
                
                
                
                }
            </Container>
        )
    }
    

}

export default Matches