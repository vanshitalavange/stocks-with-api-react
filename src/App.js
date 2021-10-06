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
  function searchResults(event) {
    let symbolOfStock = "";
    let inputTxt = event.target.value;

    if (inputTxt !== "") {
      fetch(getSearchURL(inputTxt))
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          for (let i = 0; i < json.bestMatches.length; i++) {
            var name = json.bestMatches[i];
            console.log("name : ", name);
            var stock = Object.values(name);
            const optionName = document.createElement("option");
            optionName.value = stock[1];
            var stockList = document.getElementById("stock-list");
            stockList.appendChild(optionName);
            setStockName(inputTxt);
            if (inputTxt === stock[1]) {
              symbolOfStock = stock[0];
            }
          }
          console.log(inputTxt);
          console.log(symbolOfStock);

          console.log(stock[1]);

          console.log(symbolOfStock);
          getCurrentPrice(symbolOfStock);
        });

      // console.log(sOS);
    }
  }
  function errorHandler() {
    alert("Server is down. Try again after some time");
  }
  function getCurrentPrice(symbolOfStock) {
    if (symbolOfStock !== "") {
      console.log("getcurrent : ", symbolOfStock);
      fetch(getCurrentPriceURL(symbolOfStock))
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          console.log(getCurrentPriceURL(symbolOfStock));
          var timeseriesdaily = Object.values(json)[1];
          console.log(timeseriesdaily);
          var current = Object.values(timeseriesdaily)[0];
          var price = Object.values(current)[3];
          console.log(price);
          setCurrentPrice(price);
        })
        .catch(errorHandler);
    }
  }
  function clickEventHandler() {
    var purchasePrice = Number(priceOfPurchase);
    var quantityOfStock = Number(stockQuantity);
    var currentPriceOfStock = Number(currentPrice);

    if (stockName === "" || priceOfPurchase === "" || stockQuantity === "") {
      setResult("All the fields are mandatory");
    } else if (purchasePrice <= 0 || quantityOfStock <= 0) {
      setResult("Please enter valid input");
    } else {
      var previousValue = purchasePrice * quantityOfStock;
      var currentValue = currentPriceOfStock * quantityOfStock;

      var amount = (currentValue - previousValue).toFixed(4);
      var percentage = Math.abs(amount / previousValue).toFixed(4) * 100;

      if (amount > 0) {
        setResult(
          "Yayyy! You have gained profit of " +
            Math.abs(percentage).toFixed(2) +
            "%. Your total profit is " +
            Math.abs(amount) +
            " 🤗"
        );
      } else if (amount < 0) {
        setResult(
          "Oops! You lost " +
            Math.abs(percentage).toFixed(2) +
            "%. Your total loss is " +
            Math.abs(amount) +
            " 😔"
        );
      } else {
        setResult("No profit, no loss 😇");
      }
    }
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
