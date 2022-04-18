import { Link } from "react-router-dom";
import styled from "styled-components";
import Category from "./components/Category";
import Pages from "./components/Pages/Pages";
import Search from "./components/Search";
import {GiKnifeFork} from 'react-icons/gi'

function App() {
  return (
    <div className="App">
      <Nav>
      <GiKnifeFork/>
        <Logo to="/">
        Foodie
        </Logo>
      </Nav>
      <Search/>
      <Category/>
      <Pages />
    </div>
  );
}


const Logo = styled(Link)`
  text-decoration: none;
  font-size:1.2rem;
  font-weight: 400;
  font-family: 'Lobster Two', cursive;

  
  `
const Nav = styled.div`
  padding: 2rem 0 0.5rem;
  display: flex;
  justify-content:flex-start;
  align-items: center;
  svg{
    font-size:2.5rem;
  }
`
export default App;
