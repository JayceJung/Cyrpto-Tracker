import { useParams } from "react-router-dom";

interface CoinParams {
  coinId: string;
}

const Coin = () => {
  const { coinId } = useParams<CoinParams>();
  return <h1>Coin: {coinId}</h1>;
};

export default Coin;
