import { Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  return (
    <View className="mt-2 flex-row items-center border-b border-gray-200 bg-white px-4 pb-4">
      <TouchableOpacity onPress={() => router.back()} className="mr-4">
        <Text className="text-2xl">←</Text>
      </TouchableOpacity>

      <Text className="text-xl font-semibold text-gray-800">{title}</Text>
    </View>
  );
}
