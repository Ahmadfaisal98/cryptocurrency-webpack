import { Space, Typography } from "antd"
import React from "react"
import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <div className="footer">
      <Typography.Title level={5} style={{ color: "white", textAlign: "center" }}>
        Copyright © 2022 by
        <Link to="/"> Ahmad Faisal</Link>
      </Typography.Title>
      <Space>
        <Link to="/">Home</Link>
        <Link to="/cryptocurrencies">Cryptocurrencies</Link>
        <Link to="/news">News</Link>
      </Space>
    </div>
  )
}

export default Footer
