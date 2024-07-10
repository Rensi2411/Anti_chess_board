import React from "react";

const AntiChessGameInfo = ({ currentAntiChessPlayer, openAntiChessModal, restartAntiChessGame }) => {
  return (
    <div className="info">
      <p>
        Current Turn: Player {currentAntiChessPlayer} (
        {currentAntiChessPlayer === 1 ? "White" : "Black"})
      </p>
      <div className="button-group">
        <button className="quit-button" onClick={openAntiChessModal}>
          Quit
        </button>
        <button className="restart-button" onClick={restartAntiChessGame}>
          Restart
        </button>
      </div>
    </div>
  );
};

export default AntiChessGameInfo;
