import React, { JSX, useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { Audio } from 'expo-av'; // Importa o módulo de áudio do Expo

// Componente principal da tela
export default function GravarAudioScreen(): JSX.Element {
  // Estado para armazenar a instância da gravação
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  // Estado para armazenar a instância do som (reprodução)
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  // Estado para armazenar o caminho (URI) do áudio gravado
  const [audioUri, setAudioUri] = useState<string | null>(null);
  // Estado para indicar se a gravação está em andamento
  const [isRecording, setIsRecording] = useState<boolean>(false);

  // Efeito para descarregar o som da memória quando o componente for desmontado
  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync(); // Libera recursos usados pela reprodução de som
      }
    };
  }, [sound]); // Executa sempre que a instância de som mudar

  // Função para iniciar a gravação de áudio
  const startRecording = async () => {
    try {
      // Solicita permissão do usuário para usar o microfone
      const permission = await Audio.requestPermissionsAsync();

      // Se a permissão for negada, exibe alerta e para aqui
      if (permission.status !== 'granted') {
        Alert.alert('Permissão negada', 'É necessário permitir o uso do microfone.');
        return;
      }

      // Configura o modo de áudio para permitir gravação (principalmente no iOS)
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true, // Permite gravação no iOS
        playsInSilentModeIOS: true, // Permite reprodução no modo silencioso
      });

      // Cria uma nova gravação com configuração de alta qualidade
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );

      // Armazena a gravação no estado e marca que está gravando
      setRecording(recording);
      setIsRecording(true);
    } catch (error) {
      console.error('Erro ao iniciar gravação:', error);
    }
  };

  // Função para parar a gravação
  const stopRecording = async () => {
    try {
      if (!recording) return; // Se não há gravação ativa, sai da função

      await recording.stopAndUnloadAsync(); // Para a gravação e salva o áudio
      const uri = recording.getURI(); // Pega o URI do arquivo de áudio gerado

      // Salva o URI no estado e limpa a instância de gravação
      setAudioUri(uri);
      setRecording(null);
      setIsRecording(false);
    } catch (error) {
      console.error('Erro ao parar gravação:', error);
    }
  };

  // Função para reproduzir o áudio gravado
  const playSound = async () => {
    if (!audioUri) return; // Se não há áudio salvo, não faz nada

    try {
      // Cria uma instância de som a partir do arquivo gravado
      const { sound } = await Audio.Sound.createAsync({ uri: audioUri });
      setSound(sound); // Salva a instância no estado
      await sound.playAsync(); // Inicia a reprodução
    } catch (error) {
      console.error('Erro ao reproduzir áudio:', error);
    }
  };

  // Retorno JSX: interface da tela
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎙️ Gravação de Áudio</Text>

      {/* Botão que muda de função com base no estado de gravação */}
      <Button
        title={isRecording ? 'Parar Gravação' : 'Iniciar Gravação'}
        onPress={isRecording ? stopRecording : startRecording}
      />

      {/* Exibe botão de reprodução somente se houver áudio gravado */}
      {audioUri && (
        <View style={styles.playButton}>
          <Button title="▶️ Reproduzir Áudio" onPress={playSound} />
        </View>
      )}
    </View>
  );
}

// Estilização da interface
const styles = StyleSheet.create({
  container: {
    flex: 1, // Ocupa toda a tela
    padding: 24,
    alignItems: 'center', // Alinha horizontalmente ao centro
    justifyContent: 'center', // Alinha verticalmente ao centro
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    marginBottom: 24,
    fontWeight: 'bold',
  },
  playButton: {
    marginTop: 20,
  },
});
