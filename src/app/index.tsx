import { Text, View, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

export default function Index() {
  const handleNavigateToSettings = () => {
    router.push('/settings');
  };

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="mb-8 text-4xl font-bold text-gray-800">Bem-vindo!</Text>

      <TouchableOpacity
        onPress={handleNavigateToSettings}
        className="rounded-lg bg-blue-600 px-12 py-4"
        activeOpacity={0.8}>
        <Text className="text-base font-semibold text-white">Configurações</Text>
      </TouchableOpacity>
    </View>
  );
}
