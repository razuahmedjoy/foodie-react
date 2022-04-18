import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {motion} from 'framer-motion';
import { Link, useParams} from 'react-router-dom';
import ApiLimit from './ApiLimit';

const Cuisine = () => {

    const [cuisine,setCuisine] = useState([])
    const [apiLimitError,setApiLimitError] = useState("")

    let {type} = useParams()


    useEffect(() => {
        getCuisine(type);
    },[type])

    const getCuisine = async (name) => {
        const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&cuisine=${name}`);
        const recipes = await data.json();

        if(recipes.code === 402 ){
            setApiLimitError("As I am using Free Api, The Api limit crossed Today. Please Check again next day. Till Then browse My another projects Please.")

        }
        else{
            setCuisine(recipes.results);
           
        }

    }

    if(apiLimitError){
        return (
            <ApiLimit message={apiLimitError}/>
        )
    }

    return (
        <Grid 
            animate={{opacity: 1}}
            intial={{opacity:0}}
            exit={{opacity:0}}
            transition={{duration:0.5}}

        >
            {cuisine.map((item)=>{
                return(
                    <Card key={item.id}>
                         <Link to={'/recipe/'+item.id}>
                        <img src={item.image} alt={item.title} />
                        <h4>{item.title}</h4>
                        </Link>
                    </Card>
                )
            })}
            
        </Grid>
    );
};


const Grid = styled(motion.div)`
   display: grid;
   grid-template-columns: repeat(auto-fit,minmax(20rem,1fr));
   grid-gap: 3rem;
`

const Card = styled.div`
    cursor:pointer;
    img{
        width: 100%;
        border-radius: 2rem;
    }

    a{
        text-decoration: none;

    }
    h4{
        text-align: center;
        padding: 1rem;
    }
`
export default Cuisine;