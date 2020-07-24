import React from 'react'
import {Row, Col, Image,InputGroup} from 'react-bootstrap'
import {Link} from 'react-router-dom'

import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import './styles.css'

class Match extends React.Component{

    handleClick = (event) => {
        this.setState({anchorEl:event.currentTarget});
    };

    handleClose = () => {
        this.setState({anchorEl:null});
    };

    constructor(props){
        super(props)
        this.state={
            anchorEl:null
        }
        this.handleClick=this.handleClick.bind(this)
        this.handleClose=this.handleClose.bind(this)
    }

    render(){
        return(
            <Row sm={2} className="justify-content-md-center">
                <Col md={5} className="justify-content-md-center">
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">
                                <Image className="flag" src={this.props.homeTeam.flag} thumbnail />
                            </InputGroup.Text>
                        </InputGroup.Prepend>
                        <InputGroup.Text>
                            {this.props.homeTeam.name}
                        </InputGroup.Text>
                    </InputGroup>
                </Col>
                <Col md={1}>

                <IconButton
                        aria-label="more"
                        aria-controls="long-menu"
                        aria-haspopup="true"
                        onClick={this.handleClick}
                    >
                        <MoreVertIcon />
                    </IconButton>
                    <Menu
                    id="simple-menu"
                    anchorEl={this.state.anchorEl}
                    keepMounted
                    open={Boolean(this.state.anchorEl)}
                    onClose={this.handleClose}
                    >
                        <MenuItem component={Link} to={
                            {
                                pathname:`/bet1/${this.props.matchId}`,
                                matchObj:{
                                    homeTeam:this.props.homeTeam,
                                    awayTeam:this.props.awayTeam,
                                    matchId:this.props.matchId
                                }
                            }
                        }>Apostar marcador</MenuItem>
                        {/* <MenuItem>Apostar resultado</MenuItem> */}
                        
                    </Menu>

                </Col>
                
                
                <Col md={5} className="justify-content-md-center">
                    <InputGroup className="mb-3">
                        <InputGroup.Text>
                            {this.props.awayTeam.name}
                        </InputGroup.Text>
                        <InputGroup.Append>
                            <InputGroup.Text id="basic-addon2">
                                <Image className="flag" src={this.props.awayTeam.flag} thumbnail />
                            </InputGroup.Text>
                        </InputGroup.Append>
                    </InputGroup>
                </Col>
            </Row>
        )
    }

}

export default Match