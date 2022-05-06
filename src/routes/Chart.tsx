import { useQuery } from "react-query";
import { fetchCoinHist } from "../api";
import ApexChart from "react-apexcharts";
import FadeIn from "react-fade-in";
import { ChartProps, IHistoricalData } from "../shared/Interface";

const Chart = ({ coinId }: ChartProps) => {
  const { isLoading, data } = useQuery<IHistoricalData[]>(
    ["ohlcv", coinId],
    () => fetchCoinHist(coinId)
  );

  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <FadeIn>
          <ApexChart
            type="line"
            series={[
              {
                name: "Price",
                data: data?.map((price) => [
                  Date.parse(price.time_close),
                  price.close,
                ]) as unknown as number[],
              },
            ]}
            options={{
              theme: {
                mode: "dark",
              },
              chart: {
                height: 500,
                width: 500,
                background: "none",
                toolbar: {
                  show: false,
                },
              },
              grid: { show: false },
              stroke: {
                curve: "smooth",
              },
              yaxis: {
                decimalsInFloat: 2,
                title: {
                  text: "Price (USD)",
                },
              },
              xaxis: {
                type: "datetime",
              },
              fill: {
                type: "gradient",
                gradient: { gradientToColors: ["#01a3a4"], stops: [0, 100] },
              },
              colors: ["#0be881"],
            }}
          />
        </FadeIn>
      )}
    </div>
  );
};

export default Chart;
