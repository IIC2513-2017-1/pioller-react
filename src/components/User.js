import styled from "styled-components";

const User = styled.h1`
  font-size: 17px;
  font-weight: 400;
  color: ${props => props.private ? "purple" : "red"};
`;

export default User;
