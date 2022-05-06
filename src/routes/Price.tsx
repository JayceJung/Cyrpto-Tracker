import FadeIn from "react-fade-in";
import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchCurrentCoinData } from "../api";
import { ChartProps, IHistoricalData, PriceData } from "../shared/Interface";

const Price = ({ coinId }: ChartProps) => {
  const { isLoading, data } = useQuery<IHistoricalData[]>(
    ["ohlcv", coinId],
    () => fetchCurrentCoinData(coinId)
  );
  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Grid>
          <Info>
            <InfoItem>
              <span>Closing price:</span>
              <span>${data && data[0].close.toFixed(3)}</span>
            </InfoItem>
          </Info>
          <Info>
            <InfoItem>
              <span>Opening price:</span>
              <span>${data && data[0].open.toFixed(3)}</span>
            </InfoItem>
          </Info>
          <Info> High: ${data && data[0].high.toFixed(3)}</Info>
          <Info> Low: ${data && data[0].low.toFixed(3)}</Info>
        </Grid>
      )}
    </div>
  );
};

const Grid = styled.div`
  display: grid;
  grid-template: "a a" "a a";
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-weight: 400;
    margin-bottom: 5px;
  }
`;

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
  margin: 10px;
  height: 70px;
  align-items: center;
  justify-content: center;
`;
export default Price;
