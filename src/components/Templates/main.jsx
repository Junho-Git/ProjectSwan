const admin = "0xC5b8C18AD93976927a7F3Ffb9998A458efE4bdD4";

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
        <div className="address">
          {currentAddress ? (
            <div>
              {[currentAddress.slice(0, 5), currentAddress.slice(38)].join(
                "..."
              )}
            </div>
          ) : (
            <div className="address-connect" onClick={connect}>
              Connect
            </div>
          )}
        </div>
        <div className="title">
          <h1>
            Project <span>Swan.</span>
          </h1>
        </div>
        <div className="info">
          <h2>
            {maxToken}
            <span>/50</span>
          </h2>
        </div>
        <div className="btn-group">
          <button className="btn" onClick={mint}>
            MINT
          </button>
          {currentAddress === admin && (
            <button className="btn" onClick={sendSetup}>
              setup
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
