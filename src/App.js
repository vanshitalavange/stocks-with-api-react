import "./styles.css";
import React, { useState } from "react";
import stocks from "./images/stocks.svg";

export default function App() {
  const [stockName, setStockName] = useState("");
  const [priceOfPurchase, setPurchasePrice] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [currentPrice, setCurrentPrice] = useState("");
  const [result, setResult] = useState("");

  var searchURL =
    "https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=";
  var currentPriceURL =
    "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=";

  function getSearchURL(inputTxt) {
    return searchURL + inputTxt + "&apikey=8NT09YOGTVEE1ZHM";
  }
  function getCurrentPriceURL(symbolOfStock) {
    return currentPriceURL + symbolOfStock + "&apikey=8NT09YOGTVEE1ZHM";
  }
  return (
    <div className="App">
      <div className="container">
        <h1>Know Your Stocks!📉</h1>
        <div className="img-container">
          <img id="hero-img" src={stocks} />
        </div>
        <label>Enter stock name</label>
        <input onChange={searchResults} list="stock-list" id="stock-name" />
        <datalist id="stock-list"></datalist>
        <label>Current Price of Stock</label>
        <input value={currentPrice} id="current-price" readOnly />
        <label>Enter stock purchase price</label>
        <input
          onChange={(event) => setPurchasePrice(event.target.value)}
          id="stock-purchase-price"
          type="number"
        />
        <label>Enter stock quantity</label>
        <input
          onChange={(event) => setStockQuantity(event.target.value)}
          id="stock-quantity"
          type="number"
        />
        <button onClick={clickEventHandler} id="btn-check">
          Check
        </button>
        <div id="output">{result}</div>
      </div>
    </div>
  );
}
