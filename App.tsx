import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  Alert,
  Vibration,
  Image,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');
const GRID_SIZE = 20;
const GAME_SIZE = Math.min(width, height) - 40; // Tamanho da área quadrada
const CELL_SIZE = GAME_SIZE / GRID_SIZE; // Células perfeitamente proporcionais

type Position = {
  x: number;
  y: number;
};

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

export default function App() {
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>({ x: 5, y: 5 });
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [gamePaused, setGamePaused] = useState(false);
  const [lastGesture, setLastGesture] = useState('');
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  // Carregar high score salvo
  useEffect(() => {
    loadHighScore();
  }, []);

  const loadHighScore = async () => {
    try {
      const savedHighScore = await AsyncStorage.getItem('snakeHighScore');
      if (savedHighScore) {
        setHighScore(parseInt(savedHighScore));
      }
    } catch (error) {
      console.log('Erro ao carregar high score:', error);
    }
  };

  const saveHighScore = async (newHighScore: number) => {
    try {
      await AsyncStorage.setItem('snakeHighScore', newHighScore.toString());
    } catch (error) {
      console.log('Erro ao salvar high score:', error);
    }
  };

  const generateFood = () => {
    const newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
    setFood(newFood);
  };

  const moveSnake = () => {
    if (!gameStarted || gameOver) return;

    setSnake((currentSnake) => {
      const newSnake = [...currentSnake];
      const head = { ...newSnake[0] };

      switch (direction) {
        case 'UP':
          head.y = (head.y - 1 + GRID_SIZE) % GRID_SIZE; // Move para cima (Y diminui)
          break;
        case 'DOWN':
          head.y = (head.y + 1) % GRID_SIZE; // Move para baixo (Y aumenta)
          break;
        case 'LEFT':
          head.x = (head.x - 1 + GRID_SIZE) % GRID_SIZE; // Move para esquerda (X diminui)
          break;
        case 'RIGHT':
          head.x = (head.x + 1) % GRID_SIZE; // Move para direita (X aumenta)
          break;
      }

      // Verificar colisão com o próprio corpo
      if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
        handleGameOver();
        return currentSnake;
      }

      newSnake.unshift(head);

      // Verificar se comeu a comida
      if (head.x === food.x && head.y === food.y) {
        setScore(prev => prev + 10);
        Vibration.vibrate(100);
        generateFood();
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  };

  const handleGameOver = () => {
    setGameOver(true);
    setGameStarted(false);
    
    if (score > highScore) {
      setHighScore(score);
      saveHighScore(score);
    }

    Alert.alert(
      'Game Over!',
      `Pontuação: ${score}\nHigh Score: ${Math.max(score, highScore)}`,
      [
        {
          text: 'Jogar Novamente',
          onPress: resetGame,
        },
      ]
    );
  };

  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood({ x: 5, y: 5 });
    setDirection('RIGHT');
    setScore(0);
    setGameOver(false);
    setGameStarted(false);
    setGamePaused(false);
    setLastGesture('');
  };

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setGamePaused(false);
    setLastGesture('');
  };

  const togglePause = () => {
    if (gameStarted && !gameOver) {
      setGamePaused(!gamePaused);
      Vibration.vibrate(50);
    }
  };

  const handleTouchStart = (event: any) => {
    if (!gameStarted) return;
    
    const { locationX, locationY } = event.nativeEvent;
    touchStartRef.current = { x: locationX, y: locationY };
  };

  const handleTouchEnd = () => {
    touchStartRef.current = null;
  };

  useEffect(() => {
    if (gameStarted && !gameOver && !gamePaused) {
      gameLoopRef.current = setInterval(moveSnake, 200);
    } else {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    }

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [gameStarted, gameOver, gamePaused, direction]);

  const renderGrid = () => {
    const gridLines = [];
    for (let i = 0; i <= GRID_SIZE; i++) {
      // Linhas horizontais
      gridLines.push(
        <View
          key={`h-${i}`}
          style={[
            styles.gridLine,
            {
              top: i * CELL_SIZE,
              left: 0,
              right: 0,
              height: 1,
            },
          ]}
        />
      );
      // Linhas verticais
      gridLines.push(
        <View
          key={`v-${i}`}
          style={[
            styles.gridLine,
            {
              left: i * CELL_SIZE,
              top: 0,
              bottom: 0,
              width: 1,
            },
          ]}
        />
      );
    }
    return gridLines;
  };

  const renderSnake = () => {
    return snake.map((segment, index) => (
      <View
        key={index}
        style={[
          styles.snakeSegment,
          {
            left: segment.x * CELL_SIZE,
            top: segment.y * CELL_SIZE,
            backgroundColor: index === 0 ? '#2E7D32' : '#4CAF50',
          },
        ]}
      />
    ));
  };

  const renderFood = () => (
    <View
      style={[
        styles.food,
        {
          left: food.x * CELL_SIZE,
          top: food.y * CELL_SIZE,
        },
      ]}
    />
  );

  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor="#2E7D32" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <Text style={styles.title}>🐍 Você tem 1 real?</Text>
          {gameStarted && (
            <TouchableOpacity
              style={[styles.pauseButton, gamePaused && styles.pauseButtonActive, { marginLeft: 10 }]}
              onPress={togglePause}
            >
              <Text style={styles.pauseButtonText}>
                {gamePaused ? '▶️' : '⏸️'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>Pontuação: {score}</Text>
          <Text style={styles.scoreText}>Recorde: {highScore}</Text>
        </View>
        {gameStarted && lastGesture && (
          <Text style={styles.gestureText}>Último gesto: {lastGesture}</Text>
        )}
        {gamePaused && (
          <Text style={styles.pauseText}>⏸️ JOGO PAUSADO</Text>
        )}
      </View>

      {/* Game Area */}
      <View style={styles.gameArea}>
        {renderGrid()}
        {renderSnake()}
        {renderFood()}
      </View>

      {/* Joystick Virtual */}
      {gameStarted && (
        <View style={styles.dpadContainer}>
          {/* D-Pad visual */}
          <Image
            source={require('./assets/dpad.png')}
            style={styles.dpadImage}
            resizeMode="contain"
          />
          {/* Áreas de toque sobrepostas */}
          {/* Cima */}
          <TouchableOpacity
            style={[styles.dpadTouch, styles.dpadUp]}
            onPress={() => {
              if (direction !== 'DOWN' && !gamePaused) {
                setDirection('UP');
                setLastGesture('⬆️ Cima');
                Vibration.vibrate(50);
              }
            }}
          />
          {/* Baixo */}
          <TouchableOpacity
            style={[styles.dpadTouch, styles.dpadDown]}
            onPress={() => {
              if (direction !== 'UP' && !gamePaused) {
                setDirection('DOWN');
                setLastGesture('⬇️ Baixo');
                Vibration.vibrate(50);
              }
            }}
          />
          {/* Esquerda */}
          <TouchableOpacity
            style={[styles.dpadTouch, styles.dpadLeft]}
            onPress={() => {
              if (direction !== 'RIGHT' && !gamePaused) {
                setDirection('LEFT');
                setLastGesture('⬅️ Esquerda');
                Vibration.vibrate(50);
              }
            }}
          />
          {/* Direita */}
          <TouchableOpacity
            style={[styles.dpadTouch, styles.dpadRight]}
            onPress={() => {
              if (direction !== 'LEFT' && !gamePaused) {
                setDirection('RIGHT');
                setLastGesture('➡️ Direita');
                Vibration.vibrate(50);
              }
            }}
          />
        </View>
      )}

      {/* Start Button */}
      {!gameStarted && (
        <TouchableOpacity style={styles.startButton} onPress={startGame}>
          <Text style={styles.startButtonText}>
            {gameOver ? 'Jogar Novamente' : 'Iniciar Jogo'}
          </Text>
        </TouchableOpacity>
      )}

      {/* Instructions */}
      <View style={styles.instructions}>
        <Text style={styles.instructionText}>
          Use o joystick virtual para controlar a cobra
        </Text>
        <Text style={styles.instructionText}>
          Colete as maçãs para crescer e ganhar pontos!
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1B5E20',
  },
  header: {
    backgroundColor: '#2E7D32',
    paddingTop: 40, // Reduzido de 50 para 40
    paddingBottom: 15, // Reduzido de 20 para 15
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  scoreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 5,
  },
  scoreText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
  },
  gestureText: {
    fontSize: 12,
    color: '#FFD700',
    fontWeight: '500',
  },
  gameArea: {
    width: GAME_SIZE,
    height: GAME_SIZE,
    backgroundColor: '#4CAF50',
    margin: 10,
    borderRadius: 10,
    position: 'relative',
    alignSelf: 'center', // Centraliza horizontalmente
  },
  snakeSegment: {
    position: 'absolute',
    width: CELL_SIZE - 2,
    height: CELL_SIZE - 2,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#2E7D32',
  },
  food: {
    position: 'absolute',
    width: CELL_SIZE - 2,
    height: CELL_SIZE - 2,
    backgroundColor: '#FF5722',
    borderRadius: CELL_SIZE / 2,
    borderWidth: 2,
    borderColor: '#D84315',
  },
  startButton: {
    backgroundColor: '#FF9800',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
    alignSelf: 'center',
    marginBottom: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  startButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  instructions: {
    padding: 15, // Reduzido de 20 para 15
    alignItems: 'center',
  },
  instructionText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 5,
  },
  gridLine: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  dpadContainer: {
    width: 128,
    height: 128,
    alignSelf: 'center',
    marginVertical: 20,
    position: 'relative',
  },
  dpadImage: {
    width: 128,
    height: 128,
  },
  dpadTouch: {
    position: 'absolute',
    width: 64,
    height: 64,
    backgroundColor: 'transparent',
    zIndex: 2,
  },
  dpadUp: {
    left: 32,
    top: 0,
  },
  dpadDown: {
    left: 32,
    bottom: 0,
  },
  dpadLeft: {
    left: 0,
    top: 32,
  },
  dpadRight: {
    right: 0,
    top: 32,
  },
  pauseText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  pauseButton: {
    backgroundColor: '#FF5722',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  pauseButtonActive: {
    backgroundColor: '#4CAF50',
  },
  pauseButtonText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
