import * as React from 'react';
import { StyleSheet, View, Text, Button, ImageBackground } from 'react-native';
import { gameReducer } from '../reducers/gameReducer';
import { createBoard } from '../utils/createBoard';
import Cell from './Cell';

const BOARD_SIZE = 10;
const BOMBS_NUM = 10;

export default function Board() {
  const [gameState, dispatch] = React.useReducer(gameReducer, {
    board: createBoard(BOARD_SIZE, BOARD_SIZE, BOMBS_NUM),
    isGameOver: false,
    numOfOpenCells: 0,
  });

  function handlePress(row, col) {
    dispatch({ type: 'HANDLE_CELL', row, col });
  }

  function handleRestart() {
    dispatch({ type: 'RESTART_GAME' });
  }

  return (
<ImageBackground
      source={{ uri: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw0NDQ0NDQ0NCAgHCA0HBwcIDQ8IDQcNFREWFhURExMYHSggGCYlGxUVITEhMSkrLi4uFx8zODMsNygtLisBCgoKDQ0NDg0PDysZFRkrKys3NysrKystNy0rNysrKy0rKzcrLTctKysrKysrKysrKy0rKysrKysrKysrKysrK//AABEIASwAqAMBIgACEQEDEQH/xAAYAAEBAQEBAAAAAAAAAAAAAAABAAIEB//EABYQAQEBAAAAAAAAAAAAAAAAAAARAf/EABkBAQEBAQEBAAAAAAAAAAAAAAABAgQDBf/EABYRAQEBAAAAAAAAAAAAAAAAAAARAf/aAAwDAQACEQMRAD8A9XCTxfRSC0EEhUNQFQQopG6gKlUyimhAVJUAQqEU1BA7NB0NPBLUBVqQFQIAAjRpaENQQI0XEEhUCBQiEEkhXXqSbcwSQoSSKEgKtCAqBAo1JIBICpICrUkAIQrrSTTnQS0AkNFS1CioIaipIAgkKBSBUkhRqSQCSFdaqTbnqCAVJDUVaCAQQ0WpBCoICkIItIQBVVAVJIHWNVFbc9KGgCEKi0hAKggLTo1AWoLVuoVBAWkIC0oVUKkEFdYCbc9IQqLSKgFI0IWrRqAUhMi0rQKLSgAp0KgWlAIUoVEK6kKK256UKqLUqAFIoWi0iirSFVVG6EWkUIhUhVRaqqBSFKFVFpTNQV1Kihpz0qigWndVAoU1VmqkKaKFSLUhQFI0VC0gbqoU0aFQpoCRaUEFdKrNTbwrQoVCqoCi0oUUKaKKqhVUBoU0IC0jdCCkKgKaqKApQJCuhVmpp5UoUUKahRuhTVRQFNFFGhWqKKBaVQApCoClUUUKUAFaTNRCumqsqq860KFQqQooUoAKQqApAQUgVUKkKlKkEhUhUpSggroqoQxSFQFIqoqlNAqCrUFuhUFQFIQIUqgaJTVQApQQVJIK6EEIkgoQggQgqKoIKkEFVGoaFI1ChSENEpQQUoIK6EkCCQIJAgkCCFES1BRJAEkASQCpJCVIaha6akECKkoEkASGiKpAEkAQSVEkAQpAJJAkEFdOoFFQIBLUBENSBBJQAgEkBCEAVSAJJAkEDpISKkgCBCiBAIHQIEkCCQLQQIgQCSQBJKOlNJlplNAAI1BAZiaCjIbAjIbAMhoaARQjKaAMxNJRkNIR/9k=' }}
      style={styles.container}
    >
      <Text style={styles.text }>
        {gameState.isGameOver ? 'Acabas de perder' : 'Buscaminas'}
      </Text>
      {gameState.board.map((row, rowIdx) => (
        <View key={rowIdx} style={styles.row}>
          {row.map((cell, cellIdx) => (
            <Cell key={cellIdx} handlePress={handlePress} {...cell} />
          ))}
        </View>
      ))}
      <Button title="Intentalo de nuevo
      " onPress={handleRestart} />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  text: {
    color:'black',
    fontWeight: '900',
    fontSize: 32,
  },
});
