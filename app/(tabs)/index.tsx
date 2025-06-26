import React from 'react';
import { View, StyleSheet } from 'react-native';

import TextoAnimado from '../../components/TextoAnimado';
import IconeGirando from '../../components/IconeGirando';
import BotaoPulsante from '../../components/BotaoPulsante';

export default function App() {
  return (
    <View style={styles.container}>
      <TextoAnimado />
      <IconeGirando />
      <BotaoPulsante />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b7eb78',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});