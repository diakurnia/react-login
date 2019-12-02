import axios from 'axios'
import setAuthToken from "../utils/setAuthToken"
import jwt_decode from "jwt-decode"

import * as actionTypes from "./actionTypes"
var url = "http://localhost:3007" || "mongodb+srv://diakurnia:d14kurn14@cluster0-2tzzi.mongodb.net/test?retryWrites=true&w=majority"

//Register User
export const registerUser = (userData, history)=> dispatch => {
    axios.post(`${url}/user/register`, userData)
        .then(res => history.push("/login"))
        .catch(err =>
            dispatch({
                type: actionTypes.GET_ERRORS,
                payload: err.response.data
            }))
}

//login-get user token
export const loginUser = userData => dispatch => {
    axios.post(`${url}/user/login`, userData)
        .then( res => {
            const {token} = res.data;
            //set token lokal storage
            localStorage.setItem("jwtToken", token);
            //set token to auth header
            setAuthToken(token);
            const decoded = jwt_decode(token);
            //set current user
            dispatch(setCurrentUser(decoded))
        })
        .catch(err => dispatch({
            type:actionTypes.GET_ERRORS,
            payload: err.response.data
        }))
}

//set logged in user
export const setCurrentUser = decoded => {
    return{
        type: actionTypes.SET_CURRENT_USER,
        payload: decoded
    }
}



//user loading
export const setUserLoading = () => {
    return{
        type:actionTypes.USER_LOADING
    }
}

//user logout
export const logoutUser = () => dispatch => {
    localStorage.removeItem("jwtToken")
    setAuthToken(false)
    dispatch(setCurrentUser({}))
}