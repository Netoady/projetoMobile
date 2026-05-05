import { Image } from 'expo-image';
import { useState } from 'react'; 
import { StyleSheet, TouchableOpacity, Alert } from 'react-native'; 

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

import ModalNovela from '@/components/modals/modal'; 

interface Novela {
  id: string;
  titulo: string;
  anoLancamento: string;
  autor: string;
  emissora: string;
}

export default function TelevisionScreen() {
  // CONTROLE DO MODAL - Estado para mostrar/esconder
  const [modalVisible, setModalVisible] = useState(false);

  const [novelas, setNovelas] = useState<Novela[]>([
    { id: '1', titulo: 'Tieta', anoLancamento: '1989', autor: 'Aguinaldo Silva', emissora: 'TV Globo' },
    { id: '2', titulo: 'O Clone', anoLancamento: '2001', autor: 'Glória Perez', emissora: 'TV Globo' },
    { id: '3', titulo: 'O Dono do Mundo', anoLancamento: '1991', autor: 'Gilberto Braga', emissora: 'TV Globo' },
    { id: '4', titulo: 'Olho no Olho', anoLancamento: '1993', autor: 'Antônio Calmon', emissora: 'TV Globo' },
    { id: '5', titulo: 'A Proxima Vitima', anoLancamento: '1995', autor: 'Silvio de Abreu', emissora: 'TV Globo' },
  ]);

  const [selectedNovela, setSelectedNovela] = useState<any>(undefined);

  const openEditModal = (novela: any) => {
    setSelectedNovela(novela);
    setModalVisible(true);
  };

  // Função Unificada para Salvar (Adicionar ou Editar)
const handleSaveNovela = (nome: string, emissora: string, id?: number) => {
  if (id && id > 0) {
    // Lógica de Edição (U)
    setNovelas(novelas.map(n => n.id === id.toString() ? { ...n, titulo: nome, emissora } : n));
  } else {
    // Lógica de Adição (C)
    const nova: Novela = {
      id: Math.random().toString(),
      titulo: nome,
      anoLancamento: '2026', // Valor padrão
      autor: 'Desconhecido',
      emissora,
    };
    setNovelas([...novelas, nova]);
  }
  setModalVisible(false);
  setSelectedNovela(undefined); // Limpa seleção
};

// Função para Deletar (D)
const handleDelete = (id: number) => {
  setNovelas(novelas.filter(n => n.id !== id.toString()));
  setModalVisible(false);
  setSelectedNovela(undefined);
};

  // 3. FUNÇÃO PARA ADICIONAR: Recebe os dados do modal e atualiza a lista
  const handleAddNovela = (nome: string, emissora: string, id?: number) => {
    const novaNovela: Novela = {
      id: id?.toString() || Math.random().toString(),
      titulo: nome,
      anoLancamento: '',
      autor: '',
      emissora,
    };

    setNovelas([...novelas, novaNovela]); // Adiciona à lista existente
    setModalVisible(false); // Fecha o modal
    Alert.alert("Sucesso", `${nome} foi cadastrada no acervo!`);
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

        {/* 4. MUDANÇA NO BOTÃO: Agora ele apenas abre o modal via estado */}
        <ThemedView style={styles.stepContainer}>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => setModalVisible(true)}
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

       {/* 5. CHAMADA DO COMPONENTE MODAL: Passando as props necessárias */}
       <ModalNovela 
          visible={modalVisible}
          onAdd={handleAddNovela}
          onCancel={() => {
            setModalVisible(false);
            setSelectedNovela(undefined);
          }}
          onDelete={handleDelete} // Agora passa a função real, sem erro de "not implemented"
          novela={selectedNovela}  // Passa a novela selecionada para o modal preencher os campos
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
  autorText: { fontSize: 14, opacity: 0.7, marginTop: 4 },
  linkText: { color: '#A1CEDC', marginTop: 10, fontWeight: '600' }
});