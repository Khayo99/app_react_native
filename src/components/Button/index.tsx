import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  onPress: () => void;
  label: string;
  styleLabel?: string;
}

export function Button({ onPress, label, className, styleLabel, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`rounded-lg bg-blue-600 py-4 ${className || ''}`}
      activeOpacity={0.8}
      {...rest}>
      <Text className={`text-center text-base font-semibold text-white ${styleLabel || ''}`}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}
