import { useState } from 'react'; // Adicionado para os campos
import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router'; // Melhor para fechar o modal após salvar

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function ModalScreen() {
  const router = useRouter();

  const [titulo, setTitulo] = useState('');
  const [ano, setAno] = useState('');
  const [autor, setAutor] = useState('');
  const [emissora, setEmissora] = useState('');

  const handleSalvar = () => {
    // Lógica simples de cadastro solicitada
    if (titulo) {
      console.log("Cadastrando:", { titulo, ano, autor, emissora });
      alert(`${titulo} cadastrada com sucesso!`);
      router.back(); // Volta para a tela de listagem
    } else {
      alert("O título é obrigatório!");
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Registrar Obra</ThemedText>

      {/* Campos de Input */}
      <ThemedView style={styles.form}>
        <TextInput 
          style={styles.input} 
          placeholder="Título da Novela" 
          placeholderTextColor="#999"
          value={titulo}
          onChangeText={setTitulo}
        />
        <TextInput 
          style={styles.input} 
          placeholder="Ano (Ex: 1989)" 
          placeholderTextColor="#999"
          keyboardType="numeric"
          value={ano}
          onChangeText={setAno}
        />
        <TextInput 
          style={styles.input} 
          placeholder="Autor" 
          placeholderTextColor="#999"
          value={autor}
          onChangeText={setAutor}
        />
        <TextInput 
          style={styles.input} 
          placeholder="Emissora" 
          placeholderTextColor="#999"
          value={emissora}
          onChangeText={setEmissora}
        />

        <TouchableOpacity style={styles.button} onPress={handleSalvar}>
          <ThemedText type="defaultSemiBold" style={{ color: '#FFF' }}>Salvar</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.back()} style={styles.link}>
          <ThemedText type="link">Voltar para a Home</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  form: {
    width: '100%',
    marginTop: 20,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: '#FFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  button: {
    backgroundColor: '#1D3D47', 
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
    alignItems: 'center',
  },
});