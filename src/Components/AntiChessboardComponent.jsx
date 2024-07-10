import React from "react";
import { Chessboard } from "react-chessboard";

const AntiChessboard = ({
  antiChessGame,
  onAntiChessPieceDrop,
  onAntiChessPieceClick,
  antiChessPossibleMoves,
  onAntiChessPieceHover,
  onAntiChessPieceLeave,
}) => {
  return (
    <Chessboard
      position={antiChessGame.fen()}
      onPieceDrop={onAntiChessPieceDrop}
      onPieceClick={onAntiChessPieceClick}
      customBoardStyle={{
        borderRadius: "10px",
      }}
      customSquareStyles={antiChessPossibleMoves.reduce((acc, move) => {
        acc[move] = {
          background:
            "radial-gradient(circle, rgba(0,0,0,0.4) 20%, transparent 20%)",
          borderRadius: "50%",
        };
        return acc;
      }, {})}
      onMouseOverSquare={onAntiChessPieceHover}
      onMouseOutSquare={onAntiChessPieceLeave}
    />
  );
};

export default AntiChessboard;
