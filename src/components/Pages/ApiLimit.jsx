import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components'
const ApiLimit = ({message}) => {
    return (
        <ErrorBox>
            <h2>{message}</h2>
            <Link to="/">Go back to Home</Link>
        </ErrorBox>
    );
};

const ErrorBox = styled.div`
    
    margin: 2rem auto;
    padding: 1rem 10%;
    text-align: center;
    h2{
        text-align: center;
        color: red;
        margin-bottom: 2rem;
        
    }
    a{
        padding: 1rem 2rem;
        background-color:#434343;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        text-decoration: none;
       
    }
`


export default ApiLimit;