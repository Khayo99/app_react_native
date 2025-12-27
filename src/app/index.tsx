import { Text, View } from 'react-native';
import { router } from 'expo-router';
import { Button } from '../components/Button';

export default function Index() {
  const handleNavigateToSettings = () => {
    router.push('/settings');
  };

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="mb-8 text-4xl font-bold text-gray-800">Bem-vindo!</Text>

      <Button className="px-12 py-4" label="Configurações" onPress={handleNavigateToSettings} />
    </View>
  );
}
