import React, { useRef } from 'react';
import { Animated, Pressable, Text, StyleSheet } from 'react-native';

// Componente com botão animado que "pulsar" ao ser clicado
export default function BotaoCurtir() {
  // Valor animado para a escala do botão
  const scale = useRef(new Animated.Value(1)).current;

  // Função chamada ao pressionar o botão
  const pulsar = () => {
    // Executa uma sequência de escala menor > maior > normal
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1.05,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Pressable style={styles.botao} onPress={pulsar}>
        <Text style={styles.botaoTexto}>Curtir</Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  botao: {
    backgroundColor: '#00c853',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
