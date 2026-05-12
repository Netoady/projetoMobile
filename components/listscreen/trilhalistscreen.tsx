import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';


export default function TrilhaListScreen({ setTrilhas }: any) {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      // Lógica do GPS
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permissão de localização negada');
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);

      // Lógica do AsyncStorage
      try {
        const value = await AsyncStorage.getItem('@NetoTV:trilhas');
        if (value !== null) {
          setTrilhas(JSON.parse(value));
        }
      } catch (e) {
        console.error("Erro ao ler dados", e);
      }
    })();
  }, []);

  // Exibição da localização no topo
  let text = 'Buscando localização...';
  if (errorMsg) text = errorMsg;
  else if (location) {
    text = `Lat: ${location.coords.latitude.toFixed(4)}, Lon: ${location.coords.longitude.toFixed(4)}`;
  }

  return (
    <ThemedView style={{ padding: 10, backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 8, margin: 16 }}>
      <ThemedText style={{ fontSize: 12, textAlign: 'center', opacity: 0.6 }}>
        📍 Localização atual: {text}
      </ThemedText>
    </ThemedView>
  );
}