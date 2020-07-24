import React from 'react'
import {Container, Row, Col,InputGroup,Image,FormControl, Button} from 'react-bootstrap'
import { connect } from 'react-redux'
import { createRef } from 'react'
import {makeBetOnScore} from '../../Actions'
import { useScrollTrigger } from '@material-ui/core'

const Bet1 = (props)=>{

    const homeInput=createRef()
    const awayInput=createRef()
    const amountInput=createRef()

    const makeBet=()=>{
        const homeScore=homeInput.current.value
        const awayScore=awayInput.current.value
        const betAmount=amountInput.current.value
        let bet={...props.location.matchObj}
        bet.homeScore=homeScore
        bet.awayScore=awayScore
        props.makeBetOnScore(props.user.id,props.match.params.matchId,
            bet,betAmount)

    }

    console.debug(props)
    return(
        <Container>
            <Row sm={2} className="justify-content-md-center">
                <Col md={5} className="justify-content-md-center">
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">
                                <Image className="flag" src={props.location.matchObj.homeTeam.flag} thumbnail />
                            </InputGroup.Text>
                        </InputGroup.Prepend>
                        <InputGroup.Text>
                            {props.location.matchObj.homeTeam.name}
                        </InputGroup.Text>
                    </InputGroup>
                </Col>
                <Col md={1}>
                    <InputGroup>
                        <InputGroup.Prepend>
                        <FormControl ref={homeInput} id="homeScore"
                            size="sm"
                        />
                        <FormControl ref={awayInput} id="awayScore"
                            size="sm"
                        />
                        </InputGroup.Prepend>
                    </InputGroup>
                </Col>
                
                
                <Col md={5} className="justify-content-md-center">
                    <InputGroup className="mb-3">
                        <InputGroup.Text>
                            {props.location.matchObj.awayTeam.name}
                        </InputGroup.Text>
                        <InputGroup.Append>
                            <InputGroup.Text id="basic-addon2">
                                <Image className="flag" src={props.location.matchObj.awayTeam.flag} thumbnail />
                            </InputGroup.Text>
                        </InputGroup.Append>
                    </InputGroup>
                </Col>
            </Row>
            <Row>
                <InputGroup>
                    <InputGroup.Prepend>
                        <InputGroup.Text>
                                Monto a apostar
                        </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl ref={amountInput} id="awayScore"/>
                </InputGroup>
                <Button onClick={makeBet}>
                    Apostar
                </Button>
            </Row>
        </Container>
    )
}

const mapStateToProps = (state) => {
    console.debug("STATE",state)
    return {
        user:state.selectedUser,
        users:state.users
    }
}

export default connect(mapStateToProps, {makeBetOnScore})(Bet1)