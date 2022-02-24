import React, { useEffect, useState } from "react";
import Caver from "caver-js";
import Main from "./components/Templates/main";
import "./App.css";

const abi = require("./abi.json");
const caver = new Caver(window["klaytn"]);

export default function App() {
  const [currentAddress, setCurrentAddress] = useState(
    "" || window.klaytn.selectedAddress
  );
  const [maxToken, setMaxToken] = useState(0);

  useEffect(() => {
    const test = async () => {
      try {
        await window.klaytn.enable();
        window.klaytn.on("accountsChanged", function (accounts) {
          setCurrentAddress(accounts);
          console.log("계정정보 변경됨");
        });
      } catch (error) {
        alert("연결된 지갑이 없습니다. Kaikas 지갑 연결을 부탁드립니다.");
      }
    };
    test();
  }, []);

  const contractAddress = "0x739A5B82A2849ab57E41F14096FF0091349D2874";
  const nftContract = new caver.contract(abi, contractAddress);

  const getTotalSupply = async () => {
    const result = await nftContract.methods.totalSupply().call();
    setMaxToken(result);
    console.log(result);
  };
  getTotalSupply();

  const connect = async () => {
    await window.klaytn.enable();
    window.klaytn.on("accountsChanged", function (accounts) {
      setCurrentAddress(accounts);
      console.log("계정정보 변경됨");
    });
  };

  const mint = async () => {
    const transactionParams = {
      type: "SMART_CONTRACT_EXECUTION",
      from: window.klaytn.selectedAddress,
      to: contractAddress,
      value: 0,
      gas: 500000,
      data: nftContract.methods.mintSwan(1).encodeABI(),
    };

    await caver.klay
      .sendTransaction(transactionParams)
      .on("receipt", (receipt) => {
        alert("민팅 성공! OpenSea 계정을 확인해주세요.");
      })
      .on("error", (error) => {
        alert("민팅에 실패하셨습니다.");
      });
  };

  const sendSetup = async () => {
    // const setupInfo = {
    //   newAntibotInterval : '10', // number,
    //   newSwanContract : '0x739A5B82A2849ab57E41F14096FF0091349D2874', // string, swanContractAddress
    //   newMintLimitPerBlock : '50', // number,
    //   newMintLimitPerSale : '1', // number,
    //   newTokenBaseURI : 'https://howootest01.s3.ap-northeast-2.amazonaws.com/metadata/test/', // string,
    //   newMintStartBlockNumber: '83818389', // number,
    //   newMaxSaleAmount: '50', // number,
    //   newMintPrice: '0.00' // number,
    // }

    const tx = {
      type: "SMART_CONTRACT_EXECUTION",
      from: currentAddress,
      to: contractAddress,
      value: 0,
      gas: 500000,
      data: nftContract.methods
        .setupSale(
          "10", // number,
          "0x739A5B82A2849ab57E41F14096FF0091349D2874", // string, swanContractAddress
          "50", // number, 총 발행량
          "1", // number,
          "https://howootest01.s3.ap-northeast-2.amazonaws.com/metadata/test/", // string,
          "83818389", // number,
          "50", // number,
          "0" // number,
        )
        .encodeABI(),
    };

    await caver.klay
      .sendTransaction(tx)
      .on("receipt", (receipt) => {})
      .on("error", (error) => {});
  };

  const props = {
    maxToken,
    connect,
    sendSetup,
    mint,
    currentAddress,
  };

  return <Main {...props} />;
}
