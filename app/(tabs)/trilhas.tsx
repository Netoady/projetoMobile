import TrilhaListScreen from '@/components/listscreen/trilhalistscreen'; // O NOVO COMPONENTE
import ModalTrilha from '@/components/modals/modalt';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import AsyncStorage from '@react-native-async-storage/async-storage'; // IMPORTANTE
import { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

interface Trilhas {
  id: string;
  tipo: string;
  capaAlbum: string;
  destaques: string;
  novelaId: string;
}

export default function TrilhasScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTrilha, setSelectedTrilha] = useState<Trilhas | undefined>(undefined);

  // 1. Iniciamos vazio para o TrilhaListScreen carregar o que estiver salvo
  const [trilhas, setTrilhas] = useState<Trilhas[]>([]);

  const openEditModal = (trilha: Trilhas) => {
    setSelectedTrilha(trilha);
    setModalVisible(true);
  };

  // 2. SALVAR (C e U) com Persistência - Igual ao padrão do professor
  const handleSaveTrilha = async (tipo: string, destaques: string, novelaId: string, id?: string) => {
    let listaAtualizada;

    if (id) {
      // Editar (Update)
      listaAtualizada = trilhas.map(t => t.id === id ? { ...t, tipo, destaques, novelaId } : t);
    } else {
      // Adicionar (Create)
      const nova = {
        id: Math.random().toString(),
        tipo,
        destaques,
        novelaId,
        capaAlbum: ''
      };
      listaAtualizada = [...trilhas, nova];
    }

    setTrilhas(listaAtualizada);
    // Salva no disco usando a chave específica de trilhas
    await AsyncStorage.setItem('@NetoTV:trilhas', JSON.stringify(listaAtualizada));

    setModalVisible(false);
    setSelectedTrilha(undefined);
  };

  // 3. DELETAR (D) com Persistência
  const handleDelete = async (id: string) => {
    const listaRestante = trilhas.filter(t => t.id !== id);

    setTrilhas(listaRestante);
    await AsyncStorage.setItem('@NetoTV:trilhas', JSON.stringify(listaRestante));

    setModalVisible(false);
    setSelectedTrilha(undefined);
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#1D1D1D', dark: '#1D3D47' }}
      headerImage={
        /* 1. AGORA A IMAGEM APARECE AQUI TAMBÉM */
        <Image
          source={require('@/assets/images/telagrade.png')}
          style={styles.headerSoundtrack}
        />
      }>

      {/* 2. TÍTULO PADRONIZADO COM O 'HELLO WAVE' IGUAL À TELA DE NOVELAS */}
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Trilhas Sonoras</ThemedText>
      </ThemedView>

      <ThemedView style={styles.container}>

        {/* COMPONENTE DE LÓGICA (GPS + LOAD DATA DAS TRILHAS) */}
        <TrilhaListScreen setTrilhas={setTrilhas} />

        <TouchableOpacity
          style={styles.mainButton}
          onPress={() => {
            setSelectedTrilha(undefined);
            setModalVisible(true);
          }}
        >
          {/* 3. TIPO DO TEXTO AJUSTADO PARA defaultSemiBold */}
          <ThemedText type="defaultSemiBold" style={{ color: '#FFF' }}>
            + Nova Trilha
          </ThemedText>
        </TouchableOpacity>

        {trilhas.map((item) => (
          <TouchableOpacity key={item.id} onPress={() => openEditModal(item)} style={styles.card}>
            <ThemedText type="defaultSemiBold">{item.tipo}</ThemedText>
            <ThemedText>{item.destaques}</ThemedText>
            <ThemedText style={{ fontSize: 10, opacity: 0.5 }}>ID Novela: {item.novelaId}</ThemedText>
          </TouchableOpacity>
        ))}
      </ThemedView>

      <ModalTrilha
        visible={modalVisible}
        trilha={selectedTrilha}
        onAdd={handleSaveTrilha}
        onDelete={handleDelete}
        onCancel={() => {
          setModalVisible(false);
          setSelectedTrilha(undefined);
        }}
      />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: { flexDirection: 'row', alignItems: 'center', gap: 8, padding: 16 },
  headerSoundtrack: { height: 190, width: '100%', bottom: 0, left: 0, position: 'absolute' },
  container: { padding: 16, gap: 12 },
  mainButton: { backgroundColor: '#1D3D47', padding: 15, borderRadius: 10, alignItems: 'center', marginBottom: 10 },
  card: { backgroundColor: 'rgba(255, 255, 255, 0.05)', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.1)' }
});