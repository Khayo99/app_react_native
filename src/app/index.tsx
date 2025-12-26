import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-slate-900">
      <Text className="text-xl font-bold text-white">Hello world</Text>

      <StatusBar style="auto" />
    </View>
  );
}
