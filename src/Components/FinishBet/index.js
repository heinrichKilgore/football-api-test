import React from 'react'
import {finishBet} from '../../Actions'
import {connect} from 'react-redux'
import {Container,Row,Col,Button,InputGroup,Image,FormControl} from 'react-bootstrap'
import { createRef } from 'react'

const FinishBet=(props)=>{

    let homeRefs=[]
    let awayRefs=[]
    let matchesList=null
    if(props.bets){
        matchesList=Object.keys(props.bets).map(function(key, index) {
            console.debug(props.bets[key])
            let match=props.bets[key]
            const homeRef=createRef()
            homeRefs.push(homeRef)
            const awayRef=createRef()
            awayRefs.push(awayRef)
            const finishBet=()=>{
                let homeScore=homeRef.current.value
                let awayScore=awayRef.current.value
                props.finishBet(key,{
                    homeScore:homeScore,
                    awayScore:awayScore,
                    bets:props.bets
                })
            }
            return(
                <Row sm={2} className="justify-content-md-center">
                <Col md={5} className="justify-content-md-center">
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">
                                <Image className="flag" src={match.homeTeam.flag} thumbnail />
                            </InputGroup.Text>
                        </InputGroup.Prepend>
                        <InputGroup.Text>
                            {match.homeTeam.name}
                        </InputGroup.Text>
                    </InputGroup>
                </Col>
                <Col md={1}>
                    <InputGroup>
                        <InputGroup.Prepend>
                        <FormControl ref={homeRef} id="homeScore"
                            size="sm"
                        />
                        <FormControl ref={awayRef} id="awayScore"
                            size="sm"
                        />
                        </InputGroup.Prepend>
                    </InputGroup>
                </Col>
                
                
                <Col md={5} className="justify-content-md-center">
                    <InputGroup className="mb-3">
                        <InputGroup.Text>
                            {match.awayTeam.name}
                        </InputGroup.Text>
                        <InputGroup.Append>
                            <InputGroup.Text id="basic-addon2">
                                <Image className="flag" src={match.awayTeam.flag} thumbnail />
                            </InputGroup.Text>
                        </InputGroup.Append>
                    </InputGroup>
                </Col>
                <Col md={1}>
                    <Button onClick={finishBet}>Aceptar</Button>
                </Col>
            </Row>
            )
        });
    }


    return(
        <Container>
            {matchesList}
        </Container>
    )

}

const mapStateToProps = (state) => {
    console.debug("STATE",state)
    return {
        user:state.selectedUser,
        users:state.users,
        bets:state.betsList
    }
}

export default connect(mapStateToProps, {finishBet})(FinishBet)