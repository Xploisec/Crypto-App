
import React from "react";
import styled from "styled-components";
import Loader from "react-loader-spinner";

const Container = styled.div`
 position: fixed;
  top: 50%;
  left: 50%;
`;

export default class App extends React.Component {
 
    render() {
    return (
      <Container>
        <Loader
          type="Audio"
          color="#042E47"
          height={40}
          width={40}
          timeout={3000} //3 secs
        />
      </Container>
 
      );
    }
  }