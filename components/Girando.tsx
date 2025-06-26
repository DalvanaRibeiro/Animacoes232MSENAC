import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';

// Componente responsável por exibir uma estrela girando
export default function EstrelaGirando() {
  // Criação do valor animado para rotação
  const rotacao = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Roda a animação em loop contínuo
    Animated.loop(
      Animated.timing(rotacao, {
        toValue: 1,           // Vai de 0 a 1
        duration: 3000,       // Dura 3 segundos para completar
        useNativeDriver: true,
      })
    ).start(); // Inicia o loop
  }, []);

  // Interpolação de valor numérico para graus de rotação
  const angulo = rotacao.interpolate({
    inputRange: [0, 1],         // Entrada de 0 a 1
    outputRange: ['0deg', '360deg'], // Saída: 0 até 360 graus
  });

  return (
    <Animated.Image
      source={{
        uri: 'https://cdn-icons-png.flaticon.com/512/616/616489.png',
      }}
      style={[styles.estrela, { transform: [{ rotate: angulo }] }]} // Aplica a rotação
    />
  );
}

const styles = StyleSheet.create({
  estrela: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
});
