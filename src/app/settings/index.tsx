import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ToggleSwitch } from '../../components/ToggleSwitch';
import { fetchFeatureFlags, FeatureFlags } from '../../services/featureFlags';
import { Header } from '../../components/Header';
import { Button } from '../../components/Button';

export default function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [signature, setSignature] = useState('');
  const [featureFlags, setFeatureFlags] = useState<FeatureFlags | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeatureFlags();
  }, []);

  const loadFeatureFlags = async () => {
    try {
      const flags = await fetchFeatureFlags();
      setFeatureFlags(flags);
    } catch (error) {
      console.error('Failed to load feature flags:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    console.log('Settings saved:', {
      notifications,
      darkMode,
      signature: featureFlags?.enable_signature ? signature : undefined,
    });
    alert('Configurações salvas com sucesso!');
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 items-center justify-center bg-white">
          <ActivityIndicator size="large" color="#3B82F6" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <Header title="Configurações" />

      <ScrollView className="flex-1 px-4">
        <View className="mt-4">
          <ToggleSwitch
            label="Receber Notificações"
            value={notifications}
            onValueChange={setNotifications}
          />

          <ToggleSwitch label="Modo Dark" value={darkMode} onValueChange={setDarkMode} />
        </View>

        {featureFlags?.enable_signature && (
          <View className="mt-6">
            <Text className="mb-2 text-base text-gray-800">Assinatura do Perfil</Text>
            <TextInput
              className="rounded-lg border border-gray-300 px-4 py-3 text-gray-800"
              placeholder="Digite sua assinatura..."
              placeholderTextColor="#9CA3AF"
              value={signature}
              onChangeText={setSignature}
              multiline
              numberOfLines={2}
            />
          </View>
        )}

        <Button onPress={handleSave} className="mb-8 mt-8" label="Salvar" />
      </ScrollView>
    </View>
  );
}
