import React, { useEffect, useRef } from 'react';
// Importa React e os hooks useEffect (para efeitos colaterais) e useRef (para criar referências persistentes)

import { Animated, StyleSheet } from 'react-native';
// Importa Animated para animações e StyleSheet para estilos no React Native

// Componente funcional que exibe uma imagem girando em loop
export default function IconeGirando() {
  // Cria um valor animado que vai de 0 a 1 e permanece entre renderizações usando useRef
  const loopAnim = useRef(new Animated.Value(0)).current;

  // useEffect executa quando o componente é montado
  useEffect(() => {
    // Inicia uma animação em loop infinito que altera loopAnim de 0 para 1 em 3000ms
    Animated.loop(
      Animated.timing(loopAnim, {
        toValue: 1,           // Valor final da animação: 1
        duration: 3000,       // Duração da animação: 3 segundos
        useNativeDriver: true // Usa driver nativo para melhor performance
      })
    ).start();               // Começa a animação em loop
  }, []);                    // Array vazio garante que isso só rode uma vez ao montar o componente

  // Interpola o valor animado para transformar o número (0 a 1) em graus de rotação (0° a 360°)
  const rotateInterpolate = loopAnim.interpolate({
    inputRange: [0, 1],           // Valores de entrada da animação
    outputRange: ['0deg', '360deg'], // Valores de saída correspondentes para rotação
  });

  return (
    // Animated.Image permite aplicar estilos animados na imagem
    <Animated.Image
      source={{
        uri: 'https://cdn-icons-png.flaticon.com/512/1828/1828884.png', // URL da imagem a ser exibida
      }}
      style={[
        styles.icone,  // Aplica os estilos básicos da imagem
        { transform: [{ rotate: rotateInterpolate }] } // Aplica a rotação animada interpolada
      ]}
    />
  );
}

// Estilos do componente usando StyleSheet para performance
const styles = StyleSheet.create({
  icone: {
    width: 80,          // Largura da imagem
    height: 80,         // Altura da imagem
    marginBottom: 30,   // Espaço abaixo da imagem
  },
});
