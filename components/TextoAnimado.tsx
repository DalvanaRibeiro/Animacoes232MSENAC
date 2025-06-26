import React, { useEffect, useRef } from 'react';  
// Importa React e os hooks useEffect (efeitos colaterais) e useRef (referência persistente)

import { Animated, Text, StyleSheet } from 'react-native';  
// Importa componentes do React Native: Animated para animações, Text para texto e StyleSheet para estilos

// Componente funcional que exibe um texto com animação de fade e movimento horizontal
export default function TextoAnimado() {
  // Cria um valor animado para controlar a opacidade, começa em 0 (invisível)
  const fade = useRef(new Animated.Value(0)).current;

  // Cria um valor animado para controlar o deslocamento horizontal (posição no eixo X), começa em -200 (fora da tela à esquerda)
  const moveX = useRef(new Animated.Value(-200)).current;

  // Hook que executa um efeito ao montar o componente (quando aparece na tela)
  useEffect(() => {
    // Executa duas animações em paralelo: fade e movimento horizontal
    Animated.parallel([
      Animated.timing(fade, {
        toValue: 1,           // Anima o valor de opacidade até 1 (totalmente visível)
        duration: 1000,       // A animação dura 1000 milissegundos (1 segundo)
        useNativeDriver: true // Usa driver nativo para melhorar performance (indicado para propriedades transform e opacidade)
      }),
      Animated.timing(moveX, {
        toValue: 0,           // Anima o deslocamento horizontal até 0 (posição normal)
        duration: 1000,       // Duração de 1 segundo para o movimento
        useNativeDriver: true,
      }),
    ]).start();  // Inicia as animações paralelas
  }, []);       // O array vazio indica que o efeito roda só uma vez ao montar

  return (
    // Animated.View permite aplicar estilos animados (como opacidade e transformações)
    <Animated.View
      style={[
        styles.caixa,  // Aplica o estilo base da caixa
        {
          opacity: fade,               // Controla a opacidade com o valor animado 'fade'
          transform: [{ translateX: moveX }], // Move horizontalmente conforme o valor animado 'moveX'
        },
      ]}
    >
      {/* Texto que será animado */}
      <Text style={styles.titulo}>HTrabalhando com animações</Text>
    </Animated.View>
  );
}

// Estilos do componente, usando StyleSheet para melhor performance
const styles = StyleSheet.create({
  caixa: {
    backgroundColor: '#278ad6', // Cor de fundo azul
    padding: 20,                // Espaçamento interno
    borderRadius: 12,           // Bordas arredondadas para um visual mais suave
    marginBottom: 30,           // Espaço abaixo do componente
    elevation: 5,               // Sombra para Android (para destacar a caixa)
  },
  titulo: {
    fontSize: 20,               // Tamanho da fonte maior para título
    fontWeight: 'bold',         // Texto em negrito
    color: '##4b394f',          // Cor do texto (tem um pequeno erro aqui, veja abaixo)
    textAlign: 'center',        // Centraliza o texto horizontalmente
  },
});
