import React, { useState, useEffect } from 'react';
import { Modal, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export type NovelaModalProps = {
  visible: boolean;
  onAdd: (nome: string, emissora: string, id?: number) => void;
  onCancel: () => void;
  onDelete: (id: number) => void;
  novela?: { id: number; nome: string; emissora: string }; // Objeto para edição
};

export default function ModalNovela({ visible, onAdd, onCancel, onDelete, novela }: NovelaModalProps) {
  const [nome, setNome] = useState('');
  const [emissora, setEmissora] = useState('');
  const [id, setId] = useState<number>(0);

  // Função: Monitorar se é edição ou novo
  useEffect(() => {
    if (novela) {
      setNome(novela.nome);
      setEmissora(novela.emissora);
      setId(novela.id);
    } else {
      setNome('');
      setEmissora('');
      setId(0);
    }
  }, [novela, visible]);

  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <View style={styles.overlay}>
        <ThemedView style={styles.container}>
          <ThemedText type="subtitle">{id > 0 ? 'Editar Novela' : 'Nova Novela'}</ThemedText>
          
          <TextInput style={styles.input} placeholder="Nome da Novela" value={nome} onChangeText={setNome} placeholderTextColor="#666" />
          <TextInput style={styles.input} placeholder="Emissora" value={emissora} onChangeText={setEmissora} placeholderTextColor="#666" />

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.buttonSave} onPress={() => onAdd(nome, emissora, id)}>
              <ThemedText style={{ color: '#FFF' }}>Salvar</ThemedText>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.buttonCancel} onPress={onCancel}>
              <ThemedText style={{ color: '#FFF' }}>Cancelar</ThemedText>
            </TouchableOpacity>

            {/* Botão Deletar - Só aparece se for edição (id > 0) */}
            {id > 0 && (
              <TouchableOpacity style={styles.buttonDelete} onPress={() => onDelete(id)}>
                <ThemedText style={{ color: '#FFF' }}>Excluir</ThemedText>
              </TouchableOpacity>
            )}
          </View>
        </ThemedView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.7)' },
  container: { width: '85%', padding: 20, borderRadius: 15, gap: 15 },
  input: { backgroundColor: 'rgba(255,255,255,0.1)', color: '#FFF', padding: 12, borderRadius: 8 },
  buttonContainer: { flexDirection: 'row', gap: 10, marginTop: 10 },
  buttonSave: { flex: 1, backgroundColor: '#1D3D47', padding: 15, borderRadius: 8, alignItems: 'center' },
  buttonCancel: { flex: 1, backgroundColor: 'orange', padding: 15, borderRadius: 8, alignItems: 'center' },
  buttonDelete: { flex: 1, backgroundColor: 'red', padding: 15, borderRadius: 8, alignItems: 'center' },
});