import { Image } from 'expo-image';
import { useState } from 'react'; // Para gerenciar a lista de novelas
import { StyleSheet, TouchableOpacity } from 'react-native'; // FlatList e TouchableOpacity

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link, useRouter } from 'expo-router'; // useRouter para navegação manual 

interface Novela {
  id: string;
  titulo: string;
  anoLancamento: string;
  autor: string;
  emissora: string;
}

export default function TelevisionScreen() {
  const router = useRouter();

  // Dados iniciais para teste (Mock)
  const [novelas, setNovelas] = useState<Novela[]>([
    { id: '1', titulo: 'Tieta', anoLancamento: '1989', autor: 'Aguinaldo Silva', emissora: 'TV Globo' },
    { id: '2', titulo: 'O Clone', anoLancamento: '2001', autor: 'Glória Perez', emissora: 'TV Globo' },
    { id: '3', titulo: 'O Dono do Mundo', anoLancamento: '1991', autor: 'Gilberto Braga', emissora: 'TV Globo' },
    { id: '4', titulo: 'Olho no Olho', anoLancamento: '1993', autor: 'Antônio Calmon', emissora: 'TV Globo' },
    { id: '5', titulo: 'A Proxima Vitima', anoLancamento: '1995', autor: 'Silvio de Abreu', emissora: 'TV Globo' },

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
        <ThemedText type="title">Bem-Vindo a NetoTV!</ThemedText>
        <HelloWave />
      </ThemedView>

      {/* Botão para Criar Nova Novela */}
      <ThemedView style={styles.stepContainer}>
        <Link href="/modal" asChild>
          <TouchableOpacity style={styles.button}>
            <ThemedText type="defaultSemiBold" style={{ color: '#FFF' }}>
              + Registrar Nova Obra
            </ThemedText>
          </TouchableOpacity>
        </Link>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Sua Central de Consulta</ThemedText>
        <ThemedText>Confira as novelas cadastradas no acervo:</ThemedText>
      </ThemedView>

      {/* Listagem de Objetos (O "R" do CRUD) */}
      {novelas.map((item) => (
        <ThemedView key={item.id} style={styles.card}>
          <ThemedText type="defaultSemiBold">{item.titulo}</ThemedText>
          <ThemedText>{item.emissora} | {item.anoLancamento}</ThemedText>
          <ThemedText style={styles.autorText}>Autor: {item.autor}</ThemedText>

          {/* Link para expandir/ver trilhas no futuro */}
          <TouchableOpacity onPress={() => alert(`Abrir trilhas de ${item.titulo}`)}>
            <ThemedText style={styles.linkText}>Ver Trilhas Sonoras</ThemedText>
          </TouchableOpacity>
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