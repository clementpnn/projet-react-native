import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Button from "../components/Button";
import Circle from "../components/svg/Circle";
import Cross from "../components/svg/Cross";

const CreateGameScreen = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);

  //SVG IMAGES
  const circleSvg = (
    <Circle height={"50px"} width={"50px"} color={xIsNext ? "#757575" : "#E85454"} />
  );
  const crossSvg = (
    <Cross height={"50px"} width={"50px"} color={xIsNext ? "#6666FF" : "#757575"} />
  );
  const constCircleSvg = (
    <Circle height={"50px"} width={"50px"} color={"#E85454"} />
  );
  const constCrossSvg = <Cross height={"50px"} width={"50px"} color={"#6666FF"} />;

  const handleSquareClick = (index) => {
    if (winner || board[index]) {
      return;
    }
    constCircleSvg;
    constCrossSvg;
    const newBoard = board.slice();
    newBoard[index] = xIsNext ? "X" : "O";

    setBoard(newBoard);
    setXIsNext(!xIsNext);
    setWinner(calculateWinner(newBoard));
  };

  const calculateDraw = () => {
    const isDraw = !board.includes(null) && !winner;
    return isDraw;
  };

  const renderSquare = (index, style) => {
    return (
      <TouchableOpacity
        style={{ ...styles.square, ...style }}
        onPress={() => handleSquareClick(index)}
      >
        <Text style={styles.squareText}>
          {board[index] == "X"
            ? constCrossSvg
            : board[index] == "O"
            ? constCircleSvg
            : ""}
        </Text>
      </TouchableOpacity>
    );
  };

  const status = winner
    ? `${winner} a gagne !`
    : calculateDraw()
    ? "Match nul.."
    : "";

  const restartGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.backContainer}>
        <Button text="Retour" onPress={() => navigation.navigate("Home")} />
      </View>
      
      {/* Only shows when the game is going on */}
      {winner || calculateDraw() ? (
        <View></View>
      ) : (
        <View style={styles.next}>
          {circleSvg}
          {crossSvg}
        </View>
      )}
      {/* Status */}
      <Text
        style={[
          styles.status,
          { color: winner == "X" ? "#6666FF" : winner == "O" ? "#E85454" : "#757575" },
        ]}
      >
        {status}
      </Text>

      <View style={styles.board}>
        <View style={styles.row}>
          {renderSquare(0, { borderTopWidth: 0, borderLeftWidth: 0 })}
          {renderSquare(1, { borderTopWidth: 0 })}
          {renderSquare(2, { borderTopWidth: 0, borderRightWidth: 0 })}
        </View>
        <View style={styles.row}>
          {renderSquare(3, { borderLeftWidth: 0 })}
          {renderSquare(4)}
          {renderSquare(5, { borderRightWidth: 0 })}
        </View>
        <View style={styles.row}>
          {renderSquare(6, { borderBottomWidth: 0, borderLeftWidth: 0 })}
          {renderSquare(7, { borderBottomWidth: 0 })}
          {renderSquare(8, { borderBottomWidth: 0, borderRightWidth: 0 })}
        </View>
      </View>
      {/* after games finished */}
      {(winner || calculateDraw()) && (
        <Button text="Rejouer" onPress={restartGame} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingRight: 20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  status: {
    width: "100%",
    fontSize: 60,
    marginBottom: 60,
    marginTop: 40,
  },
  board: {
    flexDirection: "column",
    marginBottom: 50,
  },
  row: {
    flexDirection: "row",
  },
  square: {
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#A3A3A3",
  },
  squareText: {
    fontSize: 24,
  },
  next: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 40,
    marginBottom: 60,
  },
  backContainer: {
    width: 100,
    alignSelf: "flex-start",
  },
});

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}

export default CreateGameScreen;
