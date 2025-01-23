import React, { useRef } from "react";
import { Animated, TouchableWithoutFeedback } from "react-native";
import {IconSymbol} from "@/components/ui/IconSymbol";

const AnimatedIcon = ({ size, name, color }) => {
	const scale = useRef(new Animated.Value(1)).current;
	
	const handlePressIn = () => {
		Animated.spring(scale, {
			toValue: 1.2, // Увеличение
			useNativeDriver: true,
		}).start();
	};
	
	const handlePressOut = () => {
		Animated.spring(scale, {
			toValue: 1, // Возвращение к исходному размеру
			useNativeDriver: true,
		}).start();
	};
	
	return (
		<TouchableWithoutFeedback
			onPressIn={handlePressIn}
			onPressOut={handlePressOut}
		>
			<Animated.View style={{ transform: [{ scale }] }}>
				<IconSymbol size={size} name={name} color={color} />
			</Animated.View>
		</TouchableWithoutFeedback>
	);
};

export default AnimatedIcon;
