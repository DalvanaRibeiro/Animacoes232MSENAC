import React, { useRef, useEffect } from 'react';
import { Animated, StyleSheet } from 'react-native';

// Componente que exibe uma imagem girando continuamente
export default function ImagemGirando() {
  // Valor animado de 0 a 1 para controlar a rotação
  const rotate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Inicia uma animação em loop infinito
    Animated.loop(
      Animated.timing(rotate, {
        toValue: 1, // Vai de 0 até 1
        duration: 4000, // Em 4 segundos
        useNativeDriver: true, // Usa o driver nativo para melhor desempenho
      })
    ).start(); // Inicia o loop
  }, []);

  // Converte o valor de 0 a 1 para 0 a 360 graus
  const rotacao = rotate.interpolate({
    inputRange: [0, 1], // Valor de entrada
    outputRange: ['0deg', '360deg'], // Valor de saída em graus
  });

  return (
    <Animated.Image
      source={{
        uri: 'https://cdn.pixabay.com/photo/2017/10/10/21/46/heart-2837423_1280.png',
      }}
      style={[styles.img, { transform: [{ rotate: rotacao }] }]} // Aplica a rotação
    />
  );
}

const styles = StyleSheet.create({
  img: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
});
