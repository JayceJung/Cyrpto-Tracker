import { useQuery } from "react-query";
import {
  Link,
  Route,
  Switch,
  useLocation,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import styled from "styled-components";
import { fetchCoinInfo, fetchCoinTickers } from "../api";
import {
  CoinParams,
  RouteState,
  InfoData,
  PriceData,
} from "../shared/Interface";
import Chart from "./Chart";
import Price from "./Price";

const Coin = () => {
  const { coinId } = useParams<CoinParams>();
  const { state } = useLocation<RouteState>();
  const priceMatch = useRouteMatch("/:coinId/price");
  const chartMatch = useRouteMatch("/:coinId/chart");
  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
    ["info", coinId],
    () => fetchCoinInfo(coinId)
  );
  const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId),
    {
      refetchInterval: 5000,
    }
  );

  const loading = infoLoading && tickersLoading;

  return (
    <Container>
      <Back to="/">&larr; Back to Coins</Back>
      <Header>
        <Title>
          {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
        </Title>
      </Header>

      {infoLoading && tickersLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Open Source:</span>
              <span>{infoData?.open_source ? "Yes" : "No"}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{tickersData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{tickersData?.max_supply}</span>
            </OverviewItem>
          </Overview>
          <PriceOverview>
            <PriceOverviewItem>
              <span>Current Price:</span>
              <span>${tickersData?.quotes.USD.price.toFixed(3)}</span>
            </PriceOverviewItem>
          </PriceOverview>
          <Description>{infoData?.description}</Description>
          <TabWrap>
            <Tab isActive={priceMatch !== null} to={`/${coinId}/price`}>
              Price
            </Tab>
            <Tab isActive={chartMatch !== null} to={`/${coinId}/chart`}>
              Chart
            </Tab>
          </TabWrap>
          <Switch>
            <Route path={`/:coinId/price`}>
              <Price coinId={coinId} />
            </Route>
            <Route path={`/:coinId/chart`}>
              <Chart coinId={coinId} />
            </Route>
          </Switch>
        </>
      )}
    </Container>
  );
};

const Back = styled(Link)`
  display: flex;
  align-items: center;
  margin: 20px 10px 0;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.div`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
  margin-bottom: 10px;
`;

const PriceOverview = styled.div`
  display: flex;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;

const PriceOverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span {
    font-size: 20px;
  }
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;

const Description = styled.p`
  margin: 20px 0px;
`;

const TabWrap = styled.div`
  display: flex;
  justify-content: space-between;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  margin-bottom: 20px;
`;

const Tab = styled(Link)<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 10px 20px;
  width: 50%;
  border-radius: 10px;
  background-color: ${(props) => (props.isActive ? "#7f8fa6" : "#ffffff00")};
  transition: background-color 0.2s ease-in;
`;
export default Coin;
