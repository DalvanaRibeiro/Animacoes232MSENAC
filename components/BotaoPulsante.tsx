import React, { useRef } from 'react';
// Importa React e useRef para controle da escala animada

import { Animated, Pressable, Text, StyleSheet } from 'react-native';
// Elementos do React Native

import { useRouter } from 'expo-router';
// Importa o roteador para navegação entre telas

// Componente funcional com botão pulsante
export default function BotaoPulsante() {
  const scale = useRef(new Animated.Value(1)).current;
  const router = useRouter(); // Correção: adiciona o roteador
  const animarBotao = () => {
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 1.2,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => {
      router.push('/cardImagem'); // ou '(tabs)/planos' se estiver usando pasta (tabs)
    });
  };

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Pressable onPress={animarBotao} style={styles.botao}>
        <Text style={styles.textoBotao}>Peça já seu capacete da paz!</Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  botao: {
    backgroundColor: '#388e3c',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 12,
  },
  textoBotao: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});