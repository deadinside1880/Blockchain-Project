import "./App.css";
import { useEffect, useState } from "react";
import {
  getPrice,
  stake,
  claim,
  auctionStatus,
  getTokens,
} from "./functions.js";

function App() {
  const [ethAmount, setEthAmount] = useState(0);
  const [currentPrice, setPrice] = useState(0);
  const [staked, setStake] = useState("Eth Staked : 0");
  const [claimed, setClaim] = useState("Auction in Progress");
  const [tokenBalance, setTokenBalance] = useState("1000");
  const [status, setStatus] = useState("In Progress");

  async function updatePrice() {
    setPrice(await getPrice());
  }

  async function updateStake() {
    console.log(ethAmount);
    const str = await stake(ethAmount);
    setStake(str);
    if (str === "Auction Time has Elapsed") {
      setClaim("Please Claim Now");
    }
    if (str == "Tokens Sold Out") {
      setClaim("Please Claim Now");
    }
  }

  async function updateClaim() {
    setClaim(await claim());
  }

  async function updateTokenBalance() {
    setTokenBalance(await getTokens());
  }

  async function updateStatus() {
    setStatus(await auctionStatus());
  }
  return (
    <div className="App">
      <div className="title">WFCoin</div>
      <div className="ButtonRow">
        <button className="Button" onClick={updateStatus}>
          Auction Status
        </button>
        <button onClick={updatePrice}>Get Current Price</button>
        <button onClick={updateStake}>Stake Eth</button>
        <button onClick={updateClaim}>Claim Tokens</button>
        <button onClick={updateTokenBalance}>Token Balance</button>
      </div>
      <div className="StatusRow">
        <span>{status}</span>
        <span>{currentPrice} eth/coin</span>
        <span>{staked}</span>
        <span>{claimed}</span>
        <span>{tokenBalance}</span>
      </div>
      <div className="Input">
        <input
          value={ethAmount}
          onInput={(e) => setEthAmount(e.target.value)}
          placeholder="Enter Amount of Eth to stake"
        />
      </div>
    </div>
  );
}

export default App;
