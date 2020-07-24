import React from 'react'
// import { AppBar, Toolbar,IconButton, Button } from '@material-ui/core';
// import MenuIcon from '@material-ui/icons/Menu';

import {BrowserRouter,Link,Route} from 'react-router-dom'
import {Navbar,Nav,Container,Row, Col, NavDropdown,Form,InputGroup} from 'react-bootstrap'

import Matches from '../Matches'
import {connect} from 'react-redux'
import {getCompetitions,getUsers,selectUser} from '../../Actions'
import { useEffect } from 'react'
import Bet1 from '../Bet1'
import FinishBet from '../FinishBet'



const App = (props)=>{

    let competitionsMenu=null;
    let usersMenu=null
    useEffect(()=>{
        props.getCompetitions()
        
        props.getUsers()
        
    },[])

    // useEffect(()=>{
    //     console.debug("props",props)
    //     debugger
    //     usersMenu=props.users.map((item)=>{
    //         return(
    //             <NavDropdown.Item >
    //                 {item.name}
    //             </NavDropdown.Item>
    //         )
    //     })
    // },[props.users])
    

    if(props.competitions){

        competitionsMenu=props.competitions.map((competition)=>{
            return(
                <NavDropdown.Item as={Link} to={`/match/${competition.id}`}>
                    {competition.name}
                </NavDropdown.Item>
            )
        })
        console.debug(props.competitions)
    }

    if(props.users){
        console.debug("props",props)
        
        usersMenu=props.users.map((item)=>{
            return(
                // <NavDropdown.Item onClick={(e)=>{
                //     props.selectUser(item.id)

                // }}>

                    <option value={item.id}>
                    {item.name}
                    </option>
                //    {item.name} 
                // </NavDropdown.Item>
            )
        })
    }

    return(
        // <AppBar position="static">
        //     <Toolbar>
        //         <IconButton>
        //             <MenuIcon/>
                    
        //         </IconButton>
        //         <Button color="inherit">Login</Button>
        //     </Toolbar>
        // </AppBar>
        <BrowserRouter>
                <Navbar bg="dark" variant="dark" expand="lg">
                    <Navbar.Brand as={Link} to="/">Inicio</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav1" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <NavDropdown title="Competencias" id="collasible-nav-dropdown">
                                {competitionsMenu}
                            </NavDropdown>
                           
                        </Nav>
                        <Nav className="mr-auto">
                            <NavDropdown title="Admin" id="collasible-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/bets/finish">
                                Finalizar apuesta
                            </NavDropdown.Item>
                            </NavDropdown>
                           
                        </Nav>
                        <Nav className="mr-auto">
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="basic-addon1">Usuario</InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control as="select" onChange={(e)=>{
                                    props.selectUser(props.users.filter((item)=>
                                        item.id===e.target.value
                                    )[0])
                                    }}>
                                        <option value="-1">-- Seleccione --</option>
                                        {usersMenu}
                                </Form.Control>
                            </InputGroup>
                            
                            
                            
                        </Nav>
                        <Nav className="mr-auto">
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="basic-addon1">Saldo</InputGroup.Text>
                                </InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">{props.user.credit}</InputGroup.Text>
                            </InputGroup>
                            
                            
                            
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                
                <Container>
                    <Row>
                        <Col>
                            <Route path="/match/:matchId" exact component={Matches}>

                            </Route>
                            <Route path="/bet1/:matchId" exact component={Bet1}>

                            </Route>
                            <Route path="/bets/finish" exact component={FinishBet}/>
                            
                        </Col>
                        
                    </Row>
                </Container>
                
                
            </BrowserRouter>

        
    )
}

const mapStateToProps = (state) => {
    console.debug("STATE",state)
    return {
        competitions: state.competitionList,
        users:state.users,
        user:state.selectedUser
    }
}

export default connect(mapStateToProps, {getCompetitions,getUsers,selectUser})(App)