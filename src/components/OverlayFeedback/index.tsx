import { Canvas, Rect } from "@shopify/react-native-skia";
import { useWindowDimensions } from "react-native";
import Animated, {
  useSharedValue,
  withSequence,
  withTiming,
  Easing,
  useAnimatedStyle,
} from "react-native-reanimated";
import { THEME } from "../../styles/theme";
import { useEffect } from "react";

const STATUS = [
  "transparent",
  THEME.COLORS.BRAND_LIGHT,
  THEME.COLORS.DANGER_LIGHT,
];

type Props = {
  status: number;
};

export function OverlayFeedback({ status }: Props) {
  const opacity = useSharedValue(0);
  const color = STATUS[status];
  const { width, height } = useWindowDimensions();

  const styleAnimated = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  useEffect(() => {
    opacity.value = withSequence(
      withTiming(1, { duration: 200, easing: Easing.bounce }),
      withTiming(0, { duration: 200, easing: Easing.bounce })
    );
  }, [status]);

  return (
    <Animated.View
      style={[{ width, height, position: "absolute" }, styleAnimated]}
    >
      <Canvas style={{ flex: 1 }}>
        <Rect x={0} y={0} width={width} height={height} color={color} />
      </Canvas>
    </Animated.View>
  );
}
