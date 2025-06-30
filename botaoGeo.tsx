// Importa o React e o hook useState para gerenciar estados dentro do componente funcional.
import React, { useState } from 'react';

// Importa componentes da UI do React Native.
import { View, Text, Button, StyleSheet } from 'react-native';

// Importa o módulo de localização do Expo, que permite acessar a geolocalização do dispositivo.
import * as Location from 'expo-location';

// Componente principal do aplicativo, exportado como padrão
export default function App() {
  // Estado para armazenar o objeto de localização retornado (pode ser null inicialmente)
  const [location, setLocation] = useState<Location.LocationObject | null>(null);

  // Estado para armazenar mensagens de erro (por exemplo, se a permissão for negada)
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Função chamada quando o usuário clica no botão "Obter Localização"
  const handleGetLocation = async () => {
    // Solicita permissão ao usuário para acessar a localização
    // . async
     // A palavra-chave async é usada para declarar uma função assíncrona. Isso significa que essa função sempre retornará uma Promise, mesmo que não haja await dentro dela.
    const { status } = await Location.requestForegroundPermissionsAsync();
    // await
    // A palavra-chave await só pode ser usada dentro de funções async. Ela é usada para esperar uma Promise ser resolvida antes de continuar com a execução do código.

    // Se a permissão for negada, atualiza o estado com a mensagem de erro e encerra a função
    if (status !== 'granted') {
      setErrorMsg('Permissão de localização negada');
      return;
    }

    // Obtém a localização atual do dispositivo (latitude, longitude, etc.)
    const currentLocation = await Location.getCurrentPositionAsync({});

    // Atualiza o estado com a localização obtida
    setLocation(currentLocation);
  };

  // JSX: o que será exibido na tela
  return (
    <View style={styles.container}>
      {/* Título */}
      <Text style={styles.title}>📍 Localização</Text>

      {/* Botão que, ao ser clicado, chama a função handleGetLocation */}
      <Button title="Obter Localização" onPress={handleGetLocation} />

      {/* Se houver uma mensagem de erro, ela será exibida em vermelho */}
      {errorMsg && <Text style={styles.error}>{errorMsg}</Text>}

      {/* Se a localização estiver disponível, exibe latitude e longitude */}
      {location && (
        <View style={styles.result}>
          <Text>Latitude: {location.coords.latitude}</Text>
          <Text>Longitude: {location.coords.longitude}</Text>
        </View>
      )}
    </View>
  );
}

// Estilos personalizados usando StyleSheet do React Native
const styles = StyleSheet.create({
  // Estilo principal da tela
  container: {
    flex: 1,               // Ocupa toda a tela
    paddingTop: 80,        // Espaço no topo (deixa o conteúdo afastado da borda superior)
    alignItems: 'center',  // Centraliza horizontalmente os elementos
    backgroundColor: '#fff', // Fundo branco
  },
  // Estilo para o título
  title: {
    fontSize: 22,          // Tamanho da fonte
    marginBottom: 20,      // Espaço abaixo do título
    fontWeight: 'bold',    // Deixa o texto em negrito
  },
  // Estilo para mensagens de erro
  error: {
    marginTop: 10,         // Espaço acima do texto de erro
    color: 'red',          // Cor vermelha para indicar erro
  },
  // Estilo da área onde a localização é exibida
  result: {
    marginTop: 20,         // Espaço acima da área
    alignItems: 'center',  // Centraliza os textos
  },
});
