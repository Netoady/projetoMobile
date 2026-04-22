import { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function ModalTrilhaScreen() {
  const router = useRouter();

  const [tipo, setTipo] = useState(''); 
  const [capa, setCapa] = useState(''); 
  const [destaques, setDestaques] = useState(''); 
  const [novelaId, setNovelaId] = useState(''); 

  const handleSalvar = () => {
    
    if (!tipo || !destaques || !novelaId) {
      alert("Por favor, preencha o tipo, as músicas e o ID da novela.");
      return;
    }

    
    console.log("Nova Trilha Vinculada:", { tipo, capa, destaques, novelaId });
    alert("Trilha sonora adicionada com sucesso!");
    router.back(); 
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ThemedText type="title" style={styles.title}>Adicionar Trilha</ThemedText>
        
        <ThemedView style={styles.form}>
          <ThemedText>Tipo de Álbum</ThemedText>
          <TextInput 
            style={styles.input} 
            placeholder="Ex: Nacional ou Internacional" 
            placeholderTextColor="#666"
            value={tipo}
            onChangeText={setTipo}
          />

          <ThemedText>ID da Novela (Vínculo)</ThemedText>
          <TextInput 
            style={styles.input} 
            placeholder="Digite o ID da novela correspondente" 
            placeholderTextColor="#666"
            keyboardType="numeric"
            value={novelaId}
            onChangeText={setNovelaId}
          />

          <ThemedText>Músicas de Destaque</ThemedText>
          <TextInput 
            style={[styles.input, styles.textArea]} 
            placeholder="Ex: Djavan - Oceano; Roupa Nova - Bem Simples" 
            placeholderTextColor="#666"
            multiline
            numberOfLines={4}
            value={destaques}
            onChangeText={setDestaques}
          />


          <TouchableOpacity style={styles.button} onPress={handleSalvar}>
            <ThemedText type="defaultSemiBold" style={{ color: '#FFF' }}>Salvar Trilha</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.back()} style={styles.cancelButton}>
            <ThemedText style={{ color: '#ff4444' }}>Cancelar</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ScrollView>
      <StatusBar style="light" />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: 20, alignItems: 'center' },
  title: { marginBottom: 20, marginTop: 40 },
  form: { width: '100%', gap: 10 },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: '#FFF',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    marginBottom: 10,
  },
  textArea: { height: 100, textAlignVertical: 'top' },
  button: { backgroundColor: '#1D3D47', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 20 },
  cancelButton: { alignItems: 'center', marginTop: 15, paddingBottom: 30 }
});