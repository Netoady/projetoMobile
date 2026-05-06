import React, { useState, useEffect } from 'react';
import { Modal, StyleSheet, TextInput, TouchableOpacity, View, ScrollView } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export type ModalTrilhaProps = {
  visible: boolean;
  onAdd: (tipo: string, destaques: string, novelaId: string, id?: string) => void;
  onCancel: () => void;
  onDelete: (id: string) => void;
  trilha?: any; // Objeto para edição
};

export default function ModalTrilha({ visible, onAdd, onCancel, onDelete, trilha }: ModalTrilhaProps) {
  const [tipo, setTipo] = useState('');
  const [destaques, setDestaques] = useState('');
  const [novelaId, setNovelaId] = useState('');
  const [id, setId] = useState<string | undefined>(undefined);

  // Sincroniza o modal com a trilha selecionada
  useEffect(() => {
    if (trilha) {
      setTipo(trilha.tipo);
      setDestaques(trilha.destaques);
      setNovelaId(trilha.novelaId);
      setId(trilha.id);
    } else {
      setTipo('');
      setDestaques('');
      setNovelaId('');
      setId(undefined);
    }
  }, [trilha, visible]);

  const handleSalvar = () => {
    onAdd(tipo, destaques, novelaId, id);
  };

  return (

        <ThemedView style={styles.container}>
            <ThemedText type="subtitle" style={styles.title}>
              {id ? 'Editar Trilha' : 'Nova Trilha'}
            </ThemedText>
            
            <ThemedText>Tipo de Álbum</ThemedText>
            <TextInput style={styles.input} value={tipo} onChangeText={setTipo} placeholder="Nacional/Internacional" placeholderTextColor="#666" />

            <ThemedText>ID da Novela</ThemedText>
            <TextInput style={styles.input} value={novelaId} onChangeText={setNovelaId} placeholder="ID da novela vinculada" placeholderTextColor="#666" />

            <ThemedText>Músicas em Destaque</ThemedText>
            <TextInput style={[styles.input, { height: 80 }]} multiline value={destaques} onChangeText={setDestaques} placeholder="Principais músicas" placeholderTextColor="#666" />

            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.btnSave} onPress={handleSalvar}>
                <ThemedText style={styles.btnText}>Salvar</ThemedText>
              </TouchableOpacity>

              <TouchableOpacity style={styles.btnCancel} onPress={onCancel}>
                <ThemedText style={styles.btnText}>Cancelar</ThemedText>
              </TouchableOpacity>

              {id && (
                <TouchableOpacity style={styles.btnDelete} onPress={() => onDelete(id)}>
                  <ThemedText style={styles.btnText}>Excluir</ThemedText>
                </TouchableOpacity>
              )}
            </View>
        </ThemedView>

  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: 'center', backgroundColor: 'rgba(255,255,255,255)' },
  container: { width: '90%', alignSelf: 'center', borderRadius: 15 },
  title: { marginBottom: 15, textAlign: 'center' },
  input: { backgroundColor: 'rgba(255,255,255,255)', color: '#FFF', padding: 12, borderRadius: 8, marginVertical: 8 },
  buttonRow: { flexDirection: 'row', gap: 8, marginTop: 15 },
  btnSave: { flex: 1, backgroundColor: '#1D3D47', padding: 15, borderRadius: 8, alignItems: 'center' },
  btnCancel: { flex: 1, backgroundColor: 'orange', padding: 15, borderRadius: 8, alignItems: 'center' },
  btnDelete: { flex: 1, backgroundColor: 'red', padding: 15, borderRadius: 8, alignItems: 'center' },
  btnText: { color: '#FFF', fontWeight: 'bold' }
});