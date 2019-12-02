import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logoutUser} from '../../actions/authAction'


class Dashboard extends Component {
    onLogoutClick = e => {
        e.preventDefault()
        this.props.logoutUser()
    }
    render(){
        const {user} = this.props.auth
        return(
            <div style={{height: "72vh"}} className="container ">
                <div className="row">
                    <div className="col s-12 center align">
                        <h4>
                            <b>You are logged in,</b>
                            <strong>{user ? ` ${user.username}` : ''}</strong>
                        </h4>
                        <button
                            style={{
                                width:"150 px",
                                borderRadius:"3px",
                                letterSpacing:"1.5px",
                                marginTop:"1rem"
                            }}
                            className="btn btn-large waves-effect waves-light hoverable light-blue accent-3"
                            onClick = {this.onLogoutClick}>
                            log out 
                        </button>

                    </div>

                </div>

            </div>
        )
    }
}

Dashboard.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({    
    auth: state.auth
})
   

export default connect(mapStateToProps, {logoutUser})(Dashboard)