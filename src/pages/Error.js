import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import pageNotFound from "../images/page-not-found.gif";
const Error = () => {
  return (
    <Wrapper>
      <div>
        <h1>404</h1>
        <img
          className="pgnotfound"
          src={pageNotFound}
          alt="pagenotfoundgif"
        ></img>
        <h3>sorry, the page you tried cannot be found</h3>
        <Link className="btn" to={"/"}>
          back home
        </Link>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.main`
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: var(--clr-primary-10);
  text-align: center;
  h1 {
    font-size: 10rem;
  }
  h3 {
    color: var(--clr-grey-3);
    margin-bottom: 1.5rem;
  }
  .pgnotfound {
    height: 200px;
    width: 200px;
    margin:auto;
   
  }
`;
export default Error;
