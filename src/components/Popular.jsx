import { useEffect, useState } from "react";

// styled components
import styled from "styled-components";

// react splide
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { Link } from "react-router-dom";

const Popular = () => {
    const [popular, setPopular] = useState([]);

    // effect when render the component
    useEffect(() => {
        getPopular();
    }, []);

    const getPopular = async () => {

        // set to localstorage
        const check = localStorage.getItem('popular');


        // below code is done so that api call limit does not out.
        // only first time data will load from api and then localstorage
        if (check) {
            setPopular(JSON.parse(check));

        }
        else {

            // call api to get data
            const api = await fetch(
                `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9`
            );
            const data = await api.json();

            // store data in LocalStorage
            localStorage.setItem('popular', JSON.stringify(data.recipes));

            // store data in state
            setPopular(data.recipes);


        }


    };

    return (
        <div>
            <Wrapper>
                <h3>Popular Picks</h3>
                <Splide options={{
                    perPage: 4,
                    breakpoints: {
                        1024: {
                            perPage: 3,

                        },
                        768: {
                            perPage: 2,

                        },
                        640: {
                            perPage: 1,

                        },
                    },
                    arrows: false,
                    pagination: false,
                    drag: 'free',
                    gap: '5rem',
                }}>
                    {popular.map((recipe) => {
                        return (
                            <SplideSlide key={recipe.id}>
                                <Card>
                                    <Link to={'/recipe/'+recipe.id}>
                                    <p>{recipe.title}</p>
                                    <img src={recipe.image} alt={recipe.title} />
                                    <Gradient />
                                    </Link>
                                </Card>
                            </SplideSlide>
                        );
                    })}
                </Splide>
            </Wrapper>
        </div>
    );
};

const Wrapper = styled.div`
  margin: 4rem 0rem;
`;

const Card = styled.div`
  min-height: 20rem;
  border-radius: 2rem;
  overflow: hidden;
  position:relative;

  img {
    border-radius: 2rem;
    position:absolute;
    left:0;
    width:100%;
    height:100%;
    object-fit:cover;
  }
  p{
      position:absolute;
      z-index:10;
      left:50%;
      bottom:0;
      transform:translate(-50%,0);
      color:#fff;
      text-align:center;
      font-weight:600;
      width: 80%;
      font-size:.8rem;
      height:40%;
      display:flex;
      justify-content:center;
      align-items:center;
  }
`;

const Gradient = styled.div`
    z-index: 3;
    position:absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(rgba(0,0,0,0),rgba(0,0,0,.5));


`
export default Popular;
