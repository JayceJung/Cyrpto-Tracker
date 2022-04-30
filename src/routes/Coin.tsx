import { useParams } from "react-router-dom";

interface CoinParams {
  coinId: string;
}

const Coin = () => {
  const { coinId } = useParams<CoinParams>();
  return <div>Coin: {coinId}</div>;
};

export default Coin;
