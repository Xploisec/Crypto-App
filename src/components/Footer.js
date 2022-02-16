import React from 'react'
import styled from "styled-components"
 
  const FooterComp = styled.div`
    position: relative;
    bottom: 0;
   width: 100%;
   height: 25px;
   z-index: 99;
   background-color: #1a7fc4 ;
   margin-top: 20px;
`

    const Title = styled.div`
        color: #fff;
        text-align: center;
    
  `

function Footer() {
    return (
       
            <FooterComp>
               <Title>  CryptoApp ©  Osman Ilgin.</Title>
            </FooterComp>
 
    )
}

export default Footer
