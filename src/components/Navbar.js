import React, { useState } from "react";
import styled from "styled-components";
import {Link}  from "react-router-dom"
import { FaBars, FaTimes } from "react-icons/fa";

const Nav = styled.div`
  height: 80px;
  display: flex;

  justify-content: center;
  align-items: center;
  font-size: 1rem;
  position: sticky;
  top: 0;
  z-index: 1;
 background-color: #FFFFFF;

  @media screen and (max-width: 960px) {
    transition: 0.8s all ease;
  }
`;
export const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 80px;
  z-index: 1;
  width: 100%;
  padding: 0 24px;
  max-width: 1100px;
`;

export const MobileIcon = styled.div`
  display: none;

  @media screen and (max-width: 968px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 60%);
    font-size: 1.8rem;
    cursor: pointer;
    color: #bcb4b4;
  }
`;
export const NavMenu = styled.ul`
  display: flex;
  justify-content: center;
  list-style: none;
  text-align: center;
  margin-right: -22px;

  @media screen and (max-width: 960px) {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 95vh;
    font-size: 2rem;
    position: absolute;
    top: 80px;
    left: ${({ click }) => (click ? 0 : "-100%")};
    opacity: 1;
    transition: all 0.6s ease;
    background: #fff;
  }
`;
export const NavItem = styled.li`
  height: 80px;
  border-bottom: 2px solid transparent;

  @media screen and (max-width: 960px) {
    width: 100%;

    &:hover {
      border: none;
    }
  }
`;
const Logo = styled(Link)`
color: #071013;
  display: flex;
  font-weight: 600;
 
  align-items: center;
  text-decoration: none;
  padding: 0.5rem 1.8rem;
  height: 100%;
  cursor: pointer;
  font-size: 24px;
`;
export const NavLinks = styled(Link)`
  color: #071013;
  display: flex;

  align-items: center;
  text-decoration: none ;
  padding: 0.5rem 1.8rem;
  height: 100%;
  cursor: pointer;
  font-size: 24px;
  
  &:hover {
    color:#0071BD ;
    font-size: 26px;
    transition: 0.1s all ease-in-out;
    border-bottom: 1px solid #0071BD;
  }

  @media screen and (max-width: 960px) {
    text-align: center;
    padding: 2rem;
    width: 100%;
    display: table;

    &:hover {
      color: #9a9a9a;
      transition: all 0.3s ease;
    }
  }
`;

function Navbar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  return (
    <Nav>
      <NavbarContainer>
      
          <Logo  to="/"> CryptoApp </Logo>

        <MobileIcon onClick={handleClick}>
          {click ? <FaTimes /> : <FaBars />}
        </MobileIcon>

        <NavMenu onClick={handleClick} click={click}>
        <NavItem>
            <NavLinks to="/">Home</NavLinks>
          </NavItem>
          <NavItem>
            <NavLinks to="/markets">Cryptocurrencies</NavLinks>
          </NavItem>
      
    
          <NavItem>
            <NavLinks to="/news">News</NavLinks>
          </NavItem>
    
        </NavMenu>
      </NavbarContainer>
    </Nav>
  );
}

export default Navbar;
