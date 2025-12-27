import '../styles/global.css';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="auto" />

      <Stack
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          animation: 'slide_from_right',
          gestureDirection: 'horizontal',
        }}>
        <Stack.Screen
          name="index"
          options={{
            title: 'Home',
          }}
        />

        <Stack.Screen
          name="settings/index"
          options={{
            title: 'Configurações',
          }}
        />
      </Stack>
    </SafeAreaView>
  );
}
