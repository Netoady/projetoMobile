import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        
        {/*Adicionei o animation para garantir o efeito no Android */}
        <Stack.Screen 
          name="modal" 
          options={{ 
            presentation: 'modal', 
            animation: 'slide_from_bottom', // Garante que ele suba por cima
            title: 'Novo Cadastro',
            headerShown: true // Importante para aparecer o botão de fechar no topo
          }} 
        />

        {/* JÁ ADICIONE O DA NOVA ATIVIDADE: */}
        <Stack.Screen 
          name="modalTrilha" 
          options={{ 
            presentation: 'modal', 
            animation: 'slide_from_bottom',
            title: 'Nova Trilha',
            headerShown: true 
          }} 
        />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
