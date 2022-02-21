import React from "react"
import { Line } from "react-chartjs-2"
import { Col, Row, Typography } from "antd"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js"

const { Title } = Typography

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend)

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const coinsPrice = []
  const coinTImestamp = []

  coinHistory?.data?.history?.forEach((history) => {
    coinsPrice.push(history.price)
    coinTImestamp.push(new Date(history.timestamp).toLocaleDateString())
  })

  const data = {
    labels: coinTImestamp,
    datasets: [
      {
        label: "Price in USD",
        data: coinsPrice,
        fil: false,
        backgroundColor: "#0071bd",
        borderColor: "#0071bd",
      },
    ],
  }

  return (
    <>
      <Row className="line-chart">
        <Title level={2} className="line-chart__title">
          {coinName} Price Chart
        </Title>
        <Col className="line-chart__price">
          <Title className="line-chart__change" level={5}>
            {coinHistory?.data?.change}%
          </Title>
          <Title className="line-chart__current" level={5}>
            Current {coinName} Price: $ {currentPrice}
          </Title>
        </Col>
      </Row>
      <Line data={data} />
    </>
  )
}

export default LineChart
