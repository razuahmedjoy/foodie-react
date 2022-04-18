import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import ApiLimit from './ApiLimit';
const Recipe = () => {

    const [details, setDetails] = useState({})
    const [activeTab, setActiveTab] = useState("instructions");

    const [apiLimitError,setApiLimitError] = useState("")

    const { name } = useParams()

    useEffect(() => {
        fetchDetails();
    }, [name])

    const fetchDetails = async () => {

        const data = await fetch(`https://api.spoonacular.com/recipes/${name}/information?apiKey=${process.env.REACT_APP_API_KEY}`)
        const detailData = await data.json();
       
        if(detailData.code === 402 ){
            setApiLimitError("As I am using Free Api, The Api limit crossed Today. Please Check again next day. Till Then browse My another projects Please.")

        }
        else{
            setDetails(detailData);
           
        }
    }
    if(apiLimitError){
        return (
            <ApiLimit message={apiLimitError}/>
        )
    }

    return (
        <DetailsWrapper>
            <div>
                <h2>{details.title}</h2>
                <img src={details.image} alt="" />
            </div>
            <Info>
                <Flex>
                
                <Button className={activeTab === 'instructions' ? 'active' : ''} onClick={() => setActiveTab('instructions')}>Instructions</Button>
                <Button className={activeTab === 'ingredients' ? 'active' : ''} onClick={() => setActiveTab('ingredients')}>Ingredients</Button>

                </Flex>
                {activeTab === 'instructions' &&   
                <div>
                    <h3 dangerouslySetInnerHTML={{__html: details.summary}}></h3>
                    <h3 dangerouslySetInnerHTML={{__html: details.instructions}}></h3>
                </div>
                }
              {activeTab === 'ingredients' &&   
                <ul>
                    {details.extendedIngredients.map((ingredient)=>{
                        return (
                            <li key={ingredient.id}>{ingredient.original}</li>
                        )
                    })}
                </ul>
}
            </Info>
        </DetailsWrapper>
    );
};


const DetailsWrapper = styled.div`
    width: 100%;
    margin: 4rem auto;
    display:grid;
    grid-template-columns: repeat(auto-fit,minmax(20rem,1fr));
    grid-gap: 2rem;
    .active{
        background: linear-gradient(35deg, #494949,#313131);
        color: white
    }

    img{
        width: 100%;
    }
    div{
        width: 100%;

    }
   

    h2{
        margin-bottom: 2rem;
    }
    li{
        font-size: 1.2rem;
        line-height: 2.5rem;

    }
    ul{
        margin-top: 2rem;
    }

`
const Flex = styled.div`
    display: flex;
    gap: 10px;
    
`
const Button = styled.button`
    padding: .8rem 1.6rem;
    color: #313131;
    background: white;
    border: 2px solid black;
    
    font-weight: 600;
    cursor: pointer;

`

const Info = styled.div`
    padding: 1rem;
    h3{
        font-size: .8rem;
        line-height: 1.5rem;
    }
  
`
export default Recipe;