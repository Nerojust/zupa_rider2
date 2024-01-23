import {
  HeaderStyleInterpolators,
  StackCardInterpolationProps,
  StackNavigationOptions,
  TransitionSpecs,
} from '@react-navigation/stack';

// Common configuration for both horizontal and vertical animations
const commonAnimationOptions: Partial<StackNavigationOptions> = {
  headerShown: false,
  detachPreviousScreen: true,
  gestureEnabled: true,
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec,
  },
};

// Horizontal animation configuration
export const horizontalAnimation: StackNavigationOptions = {
  ...commonAnimationOptions,
  gestureDirection: 'horizontal',
  headerStyleInterpolator: HeaderStyleInterpolators.forFade,
  cardStyleInterpolator: ({current, layouts}: StackCardInterpolationProps) => ({
    cardStyle: {
      transform: [
        {
          translateX: current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [layouts.screen.width, 0],
          }),
        },
      ],
    },
  }),
};

// Vertical animation configuration
export const verticalAnimation: StackNavigationOptions = {
  ...commonAnimationOptions,
  gestureDirection: 'vertical',
  headerStyleInterpolator: HeaderStyleInterpolators.forSlideUp,
  cardStyleInterpolator: ({current, layouts}: StackCardInterpolationProps) => ({
    cardStyle: {
      transform: [
        {
          translateY: current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [layouts.screen.height, 0],
          }),
        },
      ],
    },
  }),
};
