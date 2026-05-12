import { Image } from 'expo-image';
import { useState } from 'react'; 
import { StyleSheet, TouchableOpacity, Alert } from 'react-native'; 
import AsyncStorage from '@react-native-async-storage/async-storage'; // IMPORTANTE

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

import ModalNovela from '@/components/modals/modal'; 
import NovelaListScreen from '@/components/listscreen/novelalistscreen'; // O NOVO COMPONENTE

interface Novela {
  id: string;
  titulo: string;
  anoLancamento: string;
  autor: string;
  emissora: string;
}

export default function TelevisionScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  
  // 1. Iniciamos vazio, pois o NovelaListScreen vai carregar os dados salvos
  const [novelas, setNovelas] = useState<Novela[]>([]);
  const [selectedNovela, setSelectedNovela] = useState<any>(undefined);

  const openEditModal = (novela: any) => {
    setSelectedNovela(novela);
    setModalVisible(true);
  };

  // 2. FUNÇÃO SALVAR (Baseada no Print 110816 do professor)
  const handleSaveNovela = async (nome: string, emissora: string, id?: number) => {
    let listaAtualizada;
    
    if (id && id > 0) {
      // Lógica de Edição (U)
      listaAtualizada = novelas.map(n => n.id === id.toString() ? { ...n, titulo: nome, emissora } : n);
    } else {
      // Lógica de Adição (C)
      const nova: Novela = {
        id: Math.random().toString(),
        titulo: nome,
        anoLancamento: '2026',
        autor: 'Desconhecido',
        emissora,
      };
      listaAtualizada = [...novelas, nova];
    }

    setNovelas(listaAtualizada);
    // Persistindo no AsyncStorage conforme o padrão do professor
    await AsyncStorage.setItem('@NetoTV:novelas', JSON.stringify(listaAtualizada));
    
    setModalVisible(false);
    setSelectedNovela(undefined);
  };

  // 3. FUNÇÃO DELETAR (Baseada no Print 110851 do professor)
  const handleDelete = async (id: number) => {
    const listaRestante = novelas.filter(n => n.id !== id.toString());
    
    setNovelas(listaRestante);
    await AsyncStorage.setItem('@NetoTV:novelas', JSON.stringify(listaRestante));
    
    setModalVisible(false);
    setSelectedNovela(undefined);
  };

  return (
    <ThemedView style={{ flex: 1 }}>
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#1D1D1D', dark: '#1D3D47' }}
        headerImage={
          <Image
            source={require('@/assets/images/telagrade.png')}
            style={styles.headerSoundtrack}
          />
        }>

        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Bem-Vindo a NetoTV!</ThemedText>
          <HelloWave />
        </ThemedView>

        {/* COMPONENTE DE LÓGICA (GPS + LOAD DATA) */}
        <NovelaListScreen setNovelas={setNovelas} />

        <ThemedView style={styles.stepContainer}>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => {
              setSelectedNovela(undefined);
              setModalVisible(true);
            }}
          >
            <ThemedText type="defaultSemiBold" style={{ color: '#FFF' }}>
              + Registrar Nova Obra
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>

        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Sua Central de Consulta</ThemedText>
          <ThemedText>Confira as novelas cadastradas no acervo:</ThemedText>
        </ThemedView>

        {novelas.map((item) => (
          <TouchableOpacity key={item.id} onPress={() => openEditModal(item)}>
            <ThemedView style={styles.card}>
              <ThemedText type="defaultSemiBold">{item.titulo}</ThemedText>
              <ThemedText>{item.emissora} | {item.anoLancamento}</ThemedText>
              <ThemedText style={styles.autorText}>Autor: {item.autor}</ThemedText>
            </ThemedView>
          </TouchableOpacity>
        ))}

        <ModalNovela 
          visible={modalVisible}
          onAdd={handleSaveNovela} // Usando a função unificada com Async
          onCancel={() => {
            setModalVisible(false);
            setSelectedNovela(undefined);
          }}
          onDelete={handleDelete} 
          novela={selectedNovela}
        />
    </ParallaxScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  headerSoundtrack: { height: 190, width: '100%', bottom: 0, left: 0, position: 'absolute', resizeMode: 'contain' },
  titleContainer: { flexDirection: 'row', alignItems: 'center', gap: 8, padding: 16 },
  stepContainer: { gap: 8, marginBottom: 16, paddingHorizontal: 16 },
  button: { backgroundColor: '#1D3D47', padding: 15, borderRadius: 10, alignItems: 'center' },
  card: { 
    backgroundColor: 'rgba(255, 255, 255, 0.05)', 
    padding: 16, 
    borderRadius: 12, 
    marginHorizontal: 16, 
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)'
  },
  autorText: { fontSize: 14, opacity: 0.7, marginTop: 4 }
});