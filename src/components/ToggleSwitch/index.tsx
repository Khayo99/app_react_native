import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface ToggleSwitchProps {
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}

export function ToggleSwitch({ label, value, onValueChange }: ToggleSwitchProps) {
  return (
    <View className="flex-row items-center justify-between border-b border-gray-200 py-4">
      <Text className="text-base text-gray-800">{label}</Text>

      <TouchableOpacity
        onPress={() => onValueChange(!value)}
        className={`h-8 w-14 justify-center rounded-full ${value ? 'bg-green-500' : 'bg-gray-300'}`}
        activeOpacity={0.8}>
        <View className={`h-6 w-6 rounded-full bg-white shadow-md ${value ? 'ml-7' : 'ml-1'}`} />
      </TouchableOpacity>
    </View>
  );
}
