import { useState } from 'react';
import { StyleSheet, TouchableOpacity, Alert } from 'react-native';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import ModalTrilha from '@/components/modals/modalt';

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
  const [trilhas, setTrilhas] = useState<Trilhas[]>([
    { id: '1', tipo: 'Nacional', capaAlbum: 'https://observatoriodatv.com.br/teledramaturgia/wp-content/uploads/2015/02/tietat1.jpg', destaques: 'Tieta - Luis Caldas; No Rancho Fundo - Chitãozinho & Xororó; Eu e Você - Roupa Nova ft José Augusto', novelaId: '1' },
    { id: '2', tipo: 'Internacional', capaAlbum: 'https://observatoriodatv.com.br/teledramaturgia/wp-content/uploads/2015/02/clonet2-2.jpg', destaques: 'Luna - Alessandro Safina; Whenever, Whenever - Shakira; My Lovers Gone - Dido', novelaId: '2' },
    { id: '3', tipo: 'Internacional', capaAlbum: 'https://observatoriodatv.com.br/teledramaturgia/wp-content/uploads/2015/10/donot1.jpg', destaques: 'Unforgettable – Natalie Cole & Nat King Cole; Cry for Help – Rick Astley; You Are Everything - Rod Stewart', novelaId: '3' },
    { id: '4', tipo: 'Internacional', capaAlbum: 'https://observatoriodatv.com.br/teledramaturgia/wp-content/uploads/2015/10/olhonoolhot2.jpg', destaques: 'Whats Up? – 4 Non Blondes; How You Gonna See Me Now – Easy Rider; Cose Della Vitta – Eros Ramazzotti', novelaId: '4' },
    { id: '5', tipo: 'Nacional', capaAlbum: 'https://observatoriodatv.com.br/teledramaturgia/wp-content/uploads/2015/02/proximavitt1.jpg', destaques: 'Sereia – Lulu Santos; Vítima – Rita Lee & Roberto de Carvalho; Catedral (CATHEDRAL SONG) – Zélia Duncan', novelaId: '5' },

  ]);

  const openEditModal = (trilha: Trilhas) => {
    setSelectedTrilha(trilha);
    setModalVisible(true);
  };

  const handleSaveTrilha = (tipo: string, destaques: string, novelaId: string, id?: string) => {
    if (id) {
      // Editar (Update)
      setTrilhas(trilhas.map(t => t.id === id ? { ...t, tipo, destaques, novelaId } : t));
    } else {
      // Adicionar (Create)
      const nova = { id: Math.random().toString(), tipo, destaques, novelaId, capaAlbum: '' };
      setTrilhas([...trilhas, nova]);
    }
    setModalVisible(false);
    setSelectedTrilha(undefined);
  };

  const handleDelete = (id: string) => {  
    setTrilhas(trilhas.filter(t => t.id !== id)); // Delete
    setModalVisible(false);
    setSelectedTrilha(undefined);
  };

  return (
    <ParallaxScrollView headerBackgroundColor={{ light: '#1D1D1D', dark: '#1D3D47' }} headerImage={<ThemedView />}>
      <ThemedView style={styles.container}>
        <TouchableOpacity style={styles.mainButton} onPress={() => { setSelectedTrilha(undefined); setModalVisible(true); }}>
          <ThemedText style={{ color: '#FFF' }}>+ Nova Trilha</ThemedText>
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
        onCancel={() => { setModalVisible(false); setSelectedTrilha(undefined); }} 
      />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 12 },
  mainButton: { backgroundColor: '#1D3D47', padding: 15, borderRadius: 10, alignItems: 'center', marginBottom: 10 },
  card: { backgroundColor: 'rgba(255, 255, 255, 0.05)', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.1)' }
});