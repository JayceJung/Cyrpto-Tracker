import styled from "styled-components";

const Coins = () => {
  return <Title>Coins</Title>;
};

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
`;

const Container = styled.div``;
export default Coins;
