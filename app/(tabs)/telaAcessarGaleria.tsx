// Importa os hooks e componentes do React Native
import React, { useState } from 'react';
import { Button, Image, StyleSheet, View, Alert } from 'react-native';

// Importa o módulo de seleção de imagem do Expo
import * as ImagePicker from 'expo-image-picker';

// Componente principal do aplicativo
export default function App() {
  // Estado para armazenar a URI da imagem selecionada
  const [imageUri, setImageUri] = useState<string | null>(null);

  // Função chamada quando o botão é pressionado
  const pickImage = async () => {
    // Solicita permissão do usuário para acessar a galeria
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    // Se a permissão não for concedida, exibe um alerta e retorna
    if (status !== 'granted') {
      Alert.alert('Permissão negada', 'Você precisa permitir acesso à galeria.');
      return;
    }

    // Abre a galeria para o usuário escolher uma imagem
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // Apenas imagens
      quality: 1, // Qualidade máxima da imagem
    });

    // Se o usuário selecionou uma imagem (não cancelou)
    if (!result.canceled) {
      // Atualiza o estado com a URI da imagem escolhida
      setImageUri(result.assets[0].uri);
    }
  };

  // JSX que representa a interface do aplicativo
  return (
    <View style={styles.container}>
      {/* Botão que chama a função pickImage */}
      <Button title="Selecionar Imagem" onPress={pickImage} />

      {/* Se uma imagem foi selecionada, exibe ela */}
      {imageUri && (
        <Image
          source={{ uri: imageUri }} // URI da imagem vinda da galeria
          style={styles.image} // Estilo da imagem
        />
      )}
    </View>
  );
}

// Estilos para os componentes da interface
const styles = StyleSheet.create({
  container: {
    flex: 1, // Ocupa a tela toda
    paddingTop: 80, // Espaço no topo
    alignItems: 'center', // Centraliza horizontalmente
    backgroundColor: '#fff', // Cor de fundo branca
  },
  image: {
    marginTop: 20, // Espaço acima da imagem
    width: 300, // Largura da imagem
    height: 300, // Altura da imagem
    resizeMode: 'cover', // Cobre todo o espaço mantendo a proporção
    borderRadius: 10, // Bordas arredondadas
  },
});
