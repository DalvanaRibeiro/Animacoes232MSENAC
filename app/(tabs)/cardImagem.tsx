// Importa o React e os hooks useRef e useState do React
import React, { useRef, useState } from 'react';

// Importa componentes e APIs do React Native
import {
  View,
  Text,
  StyleSheet,
  PanResponder,
  Animated,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';

// Define o tipo dos cartões (id, texto e imagem)
type Card = {
  id: number;
  texto: string;
  imagem: string;
};

// Obtém a largura da tela do dispositivo
const { width } = Dimensions.get('window');

// Cria uma lista fixa de 2 cartões(o exercício pede 5 ou 6)
const cards: Card[] = [
  { id: 1, texto: 'Você gosta de React Native?', imagem: 'https://reactnative.dev/img/tiny_logo.png' },
  { id: 2, texto: 'Você prefere JavaScript ou TypeScript?', imagem: 'https://cdn-icons-png.flaticon.com/512/919/919832.png' },
 
];

// Exporta o componente principal
export default function CartoesArrastaveis() {
  const [index, setIndex] = useState(0);              // Índice do cartão atual
  const [mensagem, setMensagem] = useState('');       // Mensagem de feedback (gostou ou rejeitou)
  const [gostou, setGostou] = useState<Card[]>([]);   // Lista de cartões que o usuário gostou
  const [mostrarResultado, setMostrarResultado] = useState(false); // Indica se deve mostrar a tela final

  const posicao = useRef(new Animated.ValueXY()).current; // Valor animado da posição X e Y do cartão

  // Controla a opacidade do cartão conforme ele é arrastado
  const opacidade = posicao.x.interpolate({
    inputRange: [-200, 0, 200],     // Faixa de movimento no eixo X
    outputRange: [0.3, 1, 0.3],     // Opacidade diminui ao se afastar do centro
    extrapolate: 'clamp',           // Impede que valores extrapolem os limites
  });

  // Controla a rotação do cartão conforme o movimento horizontal
  const rotacao = posicao.x.interpolate({
    inputRange: [-width / 2, 0, width / 2],  // Intervalo de movimento na horizontal (largura da tela)
    outputRange: ['-15deg', '0deg', '15deg'], // Roda o cartão conforme o movimento
    extrapolate: 'clamp',
  });

  // Combina os estilos animados de posição, rotação e opacidade
  const estiloCard = {
    transform: [
      { translateX: posicao.x }, // move horizontalmente
      { translateY: posicao.y }, // move verticalmente
      { rotate: rotacao },       // gira o cartão
    ],
    opacity: opacidade,
  };

  // Cria o panResponder para lidar com o gesto de arrastar
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true, // Permite que o gesto de movimento seja ativado

      // Atualiza a posição do cartão durante o movimento
      onPanResponderMove: Animated.event(
        [null, { dx: posicao.x, dy: posicao.y }],
        { useNativeDriver: false }
      ),

      // Ação ao soltar o cartão
      onPanResponderRelease: (_, gestureState) => {   // onPanResponderRelease: (_, gestureState) => { ... } é a função que executa ações quando o usuário solta o dedo após arrastar(qunado depois de arrastar), usando gestureState para verificar a direção e distância do movimento
        const limite = 120; // Distância mínima para considerar swipe

        if (gestureState.dx > limite) {
          // Swipe para a direita (Gostou)
          setMensagem('✅ Gostou!');
          Animated.timing(posicao, {
            toValue: { x: width, y: gestureState.dy }, // Anima para fora da tela (direita)
            duration: 300,
            useNativeDriver: true,
          }).start(() => {
            setGostou((prev) => [...prev, cards[index]]); // Adiciona o card na lista de gostou
            posicao.setValue({ x: 0, y: 0 });             // Reseta a posição
            setIndex((prev) => prev + 1);                 // Passa para o próximo card
            setMensagem('');                              // Limpa a mensagem
          });
        } else if (gestureState.dx < -limite) {
          // Swipe para a esquerda (Rejeitou)
          setMensagem('❌ Rejeitou!');
          Animated.timing(posicao, {
            toValue: { x: -width, y: gestureState.dy }, // Anima para fora da tela (esquerda)
            duration: 300,
            useNativeDriver: true,
          }).start(() => {
            posicao.setValue({ x: 0, y: 0 });            // Reseta a posição
            setIndex((prev) => prev + 1);                // Próximo card
            setMensagem('');                             // Limpa mensagem
          });
        } else {
          // Volta para o centro se não passou do limite
          Animated.spring(posicao, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  // JSX de retorno do componente
  return (
    <View style={styles.container}>
      {/* Se ainda houver cartões e não for o resultado final */}
      {index < cards.length && !mostrarResultado ? (
        <>
          <Animated.View style={[styles.card, estiloCard]} {...panResponder.panHandlers}>
            {/* Imagem do cartão */}
            <Image
              source={{ uri: cards[index].imagem }}
              style={styles.imagem}
              resizeMode="contain"
            />
            {/* Texto da pergunta */}
            <Text style={styles.pergunta}>{cards[index].texto}</Text>
          </Animated.View>

          {/* Mensagem de feedback (✅ ou ❌) */}
          <Text style={styles.mensagem}>{mensagem}</Text>
        </>
      ) : (
        <>
          {!mostrarResultado ? (
            <>
              {/* Quando termina os cartões, mostra essa mensagem */}
              <Text style={styles.fim}>Você terminou os cards 🎉</Text>

              {/* Botão para ver os resultados */}
              <TouchableOpacity
                style={styles.botao}
                onPress={() => setMostrarResultado(true)}
              >
                <Text style={styles.textoBotao}>Ver Resultado</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              {/* Lista os cartões que o usuário gostou */}
              <Text style={styles.resultadoTitulo}>✅ Pelo jeito, você gostou destes cards 👀:</Text>
              <ScrollView contentContainerStyle={styles.lista}>
                {gostou.map((card) => (
                  <Text key={card.id} style={styles.resultadoItem}>
                    • {card.texto}
                  </Text>
                ))}
              </ScrollView>
            </>
          )}
        </>
      )}
    </View>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFDE7',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  card: {
    width: '85%',
    padding: 24,
    backgroundColor: '#FFF176',
    borderRadius: 16,
    elevation: 5,
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    alignItems: 'center',
  },
  imagem: {
    width: 120,
    height: 120,
    marginBottom: 16,
  },
  pergunta: {
    fontSize: 20,
    color: '#F57F17',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  mensagem: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#33691E',
    marginTop: 320,
  },
  fim: {
    fontSize: 24,
    color: '#455A64',
    textAlign: 'center',
    marginBottom: 16,
  },
  botao: {
    backgroundColor: '#FBC02D',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    elevation: 3,
  },
  textoBotao: {
    fontSize: 18,
    color: '#3E2723',
    fontWeight: 'bold',
  },
  resultadoTitulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#33691E',
    marginBottom: 16,
  },
  lista: {
    paddingHorizontal: 16,
  },
  resultadoItem: {
    fontSize: 18,
    color: '#827717',
    marginBottom: 12,
  },
});
