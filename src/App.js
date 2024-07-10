import "./App.css";
import React, { useState, useRef } from "react";
import { Chess } from "chess.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";
import AntiChessboard from "./Components/AntiChessboardComponent";
import AntiChessQuitModal from "./Components/AntiChessQuitModal";
import AntiChessGameInfo from "./Components/AntiChessGameInfo";

Modal.setAppElement("#root");

function App() {
  const [antiChessGame, setAntiChessGame] = useState(new Chess());
  const [currentAntiChessPlayer, setCurrentAntiChessPlayer] = useState(1);
  const [isAntiChessModalOpen, setIsAntiChessModalOpen] = useState(false);
  const [antiChessPossibleMoves, setAntiChessPossibleMoves] = useState([]);
  const antiChessGameRef = useRef(antiChessGame);

  const switchAntiChessTurn = () => {
    setCurrentAntiChessPlayer((prev) => (prev === 1 ? 2 : 1));
  };

  const handleAntiChessMove = (source, target) => {
    let move = null;

    setAntiChessGame((g) => {
      const newGame = { ...g };
      move = newGame.move({
        from: source,
        to: target,
        promotion: "q",
      });
      return newGame;
    });

    setAntiChessPossibleMoves([]);

    if (move === null) {
      toast.error("Illegal move! Try again.", {
        autoClose: 1000,
      });
      return;
    }

    if (antiChessGameRef.current.game_over()) {
      toast.success(`Player ${currentAntiChessPlayer} wins!`, {
        autoClose: 3000,
      });
      return;
    }

    switchAntiChessTurn();
  };

  const onAntiChessDrop = (source, target) => {
    const piece = antiChessGameRef.current.get(source);
    const isWhiteMove = piece && piece.color === "w";

    if (
      (currentAntiChessPlayer === 1 && !isWhiteMove) ||
      (currentAntiChessPlayer === 2 && isWhiteMove)
    ) {
      toast.info("It's not your turn!", {
        autoClose: 1000,
      });
      return;
    }

    handleAntiChessMove(source, target);
  };

  const onAntiChessPieceClick = (square) => {
    const moves = antiChessGameRef.current.moves({ square, verbose: true });
    setAntiChessPossibleMoves(moves.map((move) => move.to));
  };

  const openAntiChessModal = () => {
    setIsAntiChessModalOpen(true);
  };

  const closeAntiChessModal = () => {
    setIsAntiChessModalOpen(false);
  };

  const handleAntiChessQuit = () => {
    toast.warn(
      `Player ${currentAntiChessPlayer} quits. Player ${
        currentAntiChessPlayer === 1 ? 2 : 1
      } wins!`,
      {
        autoClose: 3000,
      }
    );
    closeAntiChessModal();
  };

  const restartAntiChessGame = () => {
    const newGame = new Chess();
    setAntiChessGame(newGame);
    setCurrentAntiChessPlayer(1);
    antiChessGameRef.current = newGame;
    setAntiChessPossibleMoves([]);
    toast.success("Game restarted. Player 1 starts!", {
      autoClose: 3000,
    });
  };

  const onAntiChessPieceHover = (square) => {
    const moves = antiChessGameRef.current.moves({ square, verbose: true });
    setAntiChessPossibleMoves(moves.map((move) => move.to));
  };

  const onAntiChessPieceLeave = () => {
    setAntiChessPossibleMoves([]);
  };

  return (
    
    <div className="app">
       
      <div className="board-container">
    
        <AntiChessboard
          antiChessGame={antiChessGame}
          onAntiChessPieceDrop={onAntiChessDrop}
          onAntiChessPieceClick={onAntiChessPieceClick}
          antiChessPossibleMoves={antiChessPossibleMoves}
          onAntiChessPieceHover={onAntiChessPieceHover}
          onAntiChessPieceLeave={onAntiChessPieceLeave}
        />
      </div>

      <ToastContainer />

      <AntiChessQuitModal
        isAntiChessModalOpen={isAntiChessModalOpen}
        closeAntiChessModal={closeAntiChessModal}
        handleAntiChessQuit={handleAntiChessQuit}
        currentAntiChessPlayer={currentAntiChessPlayer}
      />
      
      <AntiChessGameInfo
        currentAntiChessPlayer={currentAntiChessPlayer}
        openAntiChessModal={openAntiChessModal}
        restartAntiChessGame={restartAntiChessGame}
      />
    </div>
  );
}

export default App;
