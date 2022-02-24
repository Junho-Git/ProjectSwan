export default function Main({
  maxToken,
  connect,
  sendSetup,
  mint,
  currentAddress,
}) {
  return (
    <div className="main">
      {/* <Header/><Form/> */}
      <div className="content">
        <div>
          <h1>Take a hit, let's make a noise</h1>
        </div>
        <div>
          {maxToken}
          <button onClick={connect}>connect</button>
          <button onClick={sendSetup}>setup</button>
          <button onClick={mint}>mint</button>
        </div>
        <p>연결된 계정의 공개키: {currentAddress}</p>
        <div>
          <button className="btn">Minting</button>
        </div>
      </div>
    </div>
  );
}
