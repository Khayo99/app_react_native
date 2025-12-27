import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ToggleSwitch } from '../../components/ToggleSwitch';
import { fetchFeatureFlags, FeatureFlags } from '../../services/featureFlags';
import {
  fetchConfigurationByKey,
  updateConfiguration,
  createConfiguration,
} from '../../services/configurations';
import { Header } from '../../components/Header';
import { Button } from '../../components/Button';
import { Configuration } from '../../../types/Configuration';

export default function Settings() {
  const [notifications, setNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [signature, setSignature] = useState('');

  const [featureFlags, setFeatureFlags] = useState<FeatureFlags | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [notificationsConfig, setNotificationsConfig] = useState<Configuration | null>(null);
  const [darkModeConfig, setDarkModeConfig] = useState<Configuration | null>(null);
  const [signatureConfig, setSignatureConfig] = useState<Configuration | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);

      const flags = await fetchFeatureFlags();
      setFeatureFlags(flags);

      const [notifConfig, darkConfig, sigConfig] = await Promise.all([
        fetchConfigurationByKey('notifications'),
        fetchConfigurationByKey('dark_mode'),
        flags.enable_signature ? fetchConfigurationByKey('signature') : Promise.resolve(null),
      ]);

      if (notifConfig) {
        setNotificationsConfig(notifConfig);
        setNotifications(notifConfig.value === 'true');
      }

      if (darkConfig) {
        setDarkModeConfig(darkConfig);
        setDarkMode(darkConfig.value === 'true');
      }

      if (flags.enable_signature && sigConfig) {
        setSignatureConfig(sigConfig);
        setSignature(sigConfig.value);
      }
    } catch (error) {
      console.error('Failed to load data:', error);
      Alert.alert('Erro', 'Não foi possível carregar as configurações');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      if (featureFlags?.enable_signature && signature.trim() === '') {
        Alert.alert('Atenção', 'O campo de assinatura não pode estar vazio.');
        return;
      }

      setSaving(true);

      const updates: Promise<Configuration>[] = [];

      if (notificationsConfig) {
        updates.push(
          updateConfiguration(notificationsConfig.id, {
            value: notifications.toString(),
          })
        );
      } else {
        updates.push(
          createConfiguration({
            key: 'notifications',
            value: notifications.toString(),
            description: 'Receber notificações do aplicativo',
          })
        );
      }

      if (darkModeConfig) {
        updates.push(
          updateConfiguration(darkModeConfig.id, {
            value: darkMode.toString(),
          })
        );
      } else {
        updates.push(
          createConfiguration({
            key: 'dark_mode',
            value: darkMode.toString(),
            description: 'Tema escuro do aplicativo',
          })
        );
      }

      if (featureFlags?.enable_signature) {
        if (signatureConfig) {
          updates.push(
            updateConfiguration(signatureConfig.id, {
              value: signature,
            })
          );
        } else {
          updates.push(
            createConfiguration({
              key: 'signature',
              value: signature,
              description: 'Assinatura do perfil do usuário',
            })
          );
        }
      }

      await Promise.all(updates);

      Alert.alert('Sucesso', 'Configurações salvas com sucesso!');

      await loadData();
    } catch (error) {
      console.error('Failed to save settings:', error);
      Alert.alert('Erro', 'Não foi possível salvar as configurações');
    } finally {
      setSaving(false);
    }
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
            disabled={saving}
          />

          <ToggleSwitch
            label="Modo Dark"
            value={darkMode}
            onValueChange={setDarkMode}
            disabled={saving}
          />
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
              editable={!saving}
            />
          </View>
        )}

        <Button
          onPress={handleSave}
          className="mb-8 mt-8"
          label={saving ? 'Salvando...' : 'Salvar'}
          disabled={saving}
        />
      </ScrollView>
    </View>
  );
}
