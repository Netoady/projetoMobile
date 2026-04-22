import { Image } from 'expo-image';
import { useState } from 'react'; // Para gerenciar a lista de novelas
import { StyleSheet, TouchableOpacity } from 'react-native'; // FlatList e TouchableOpacity

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link, useRouter } from 'expo-router'; // useRouter para navegação manual 

interface trilhas {
  id: string;
  tipo: 'Nacional' | 'Internacional'; 
  capaAlbum: string;
  destaques: string;
  novelaId: string;
}

export default function TrilhasScreen() {
  const router = useRouter();

  // Dados iniciais para teste (Mock)
  const [trilhas, setTrilhas] = useState<trilhas[]>([
    { id: '1', tipo: 'Nacional', capaAlbum: 'https://observatoriodatv.com.br/teledramaturgia/wp-content/uploads/2015/02/tietat1.jpg', destaques: 'Tieta - Luis Caldas; No Rancho Fundo - Chitãozinho & Xororó; Eu e Você - Roupa Nova ft José Augusto', novelaId: '1' },
    { id: '2', tipo: 'Internacional', capaAlbum: 'https://observatoriodatv.com.br/teledramaturgia/wp-content/uploads/2015/02/clonet2-2.jpg', destaques: 'Luna - Alessandro Safina; Whenever, Whenever - Shakira; My Lovers Gone - Dido', novelaId: '2' },
    { id: '3', tipo: 'Internacional', capaAlbum: 'https://observatoriodatv.com.br/teledramaturgia/wp-content/uploads/2015/10/donot1.jpg', destaques: 'Unforgettable – Natalie Cole & Nat King Cole; Cry for Help – Rick Astley; You Are Everything - Rod Stewart', novelaId: '3' },
    { id: '4', tipo: 'Internacional', capaAlbum: 'https://observatoriodatv.com.br/teledramaturgia/wp-content/uploads/2015/10/olhonoolhot2.jpg', destaques: 'Whats Up? – 4 Non Blondes; How You Gonna See Me Now – Easy Rider; Cose Della Vitta – Eros Ramazzotti', novelaId: '4' },
    { id: '5', tipo: 'Nacional', capaAlbum: 'https://observatoriodatv.com.br/teledramaturgia/wp-content/uploads/2015/02/proximavitt1.jpg', destaques: 'Sereia – Lulu Santos; Vítima – Rita Lee & Roberto de Carvalho; Catedral (CATHEDRAL SONG) – Zélia Duncan', novelaId: '5' },

  ]);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#1D1D1D', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/telagrade.png')}
          style={styles.headerSoundtrack}
        />
      }>

      {/* Cabeçalho de Boas-vindas */}
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Trilhas Sonoras!</ThemedText>
        <HelloWave />
      </ThemedView>

      
      <ThemedView style={styles.stepContainer}>
        <Link href="/modalt" asChild>
          <TouchableOpacity style={styles.button}>
            <ThemedText type="defaultSemiBold" style={{ color: '#FFF' }}>
              + Registrar Nova Trilha
            </ThemedText>
          </TouchableOpacity>
        </Link>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Sua Biblioteca Musical</ThemedText>
        <ThemedText>*Confira a trilha da sua novela preferida:</ThemedText>
      </ThemedView>

      {/* Listagem de Objetos (O "R" do CRUD) */}
      {trilhas.map((item) => (
        <ThemedView key={item.id} style={styles.card}>
          <ThemedText type="defaultSemiBold">{item.tipo}</ThemedText>
          <ThemedText>{item.destaques} | {item.novelaId}</ThemedText>

        </ThemedView>
      ))}

    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 16,
  },
  headerSoundtrack: {
    height: 190,
    width: '100%',
    bottom: 0,
    left: 0,
    position: 'absolute',
    resizeMode: 'contain',
  },
  // Novos Estilos
  button: {
    backgroundColor: '#1D3D47',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  autorText: {
    fontSize: 12,
    opacity: 0.7,
  },
  linkText: {
    color: '#A1CEDC',
    marginTop: 8,
    fontWeight: 'bold',
  }
});