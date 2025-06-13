import { MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const guidelineBaseWidth = 375; 
const guidelineBaseHeight = 812; 
const scale = (size: number) => (SCREEN_WIDTH / guidelineBaseWidth) * size;
const verticalScale = (size: number) => (SCREEN_HEIGHT / guidelineBaseHeight) * size;
const moderateScale = (size: number, factor = 0.5) =>
  size + (scale(size) - size) * factor;

const VideoShoot = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showCountdown, setShowCountdown] = useState(false);
  const [countdownText, setCountdownText] = useState('3');
  const [contentHeight, setContentHeight] = useState(0);
  const [showText, setShowText] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);
  const animationRef = useRef<Animated.CompositeAnimation | null>(null);
  const countdownScale = useRef(new Animated.Value(1)).current;

  const longText = `Hey Good Morning! My name is Himanshu Joshi, and I am a passionate software engineer with over two years of experience in mobile app development. Specializing in React Native, I have built dynamic and user-friendly applications for both iOS and Android platforms. My expertise spans creating responsive UI components, optimizing app performance, and integrating APIs to deliver seamless user experiences. I have successfully delivered projects ranging from e-commerce platforms to interactive forms, including features like real-time scrolling text and dynamic data handling. Beyond coding, I thrive on solving complex problems, collaborating with cross-functional teams, and staying updated with the latest technologies. My commitment to clean code and innovative solutions drives me to create impactful applications that resonate with users.`;

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const onContentSizeChange = (_: number, height: number) => {
    setContentHeight(height);
  };

  const startScrollAnimation = () => {
    if (contentHeight > 0) {
      const windowHeight = SCREEN_HEIGHT;
      const viewHeight = windowHeight * 0.3;
      const scrollDistance = contentHeight + viewHeight / 2;
      const scrollSpeed = moderateScale(20);
      const duration = (scrollDistance / scrollSpeed) * 600;

      scrollY.setValue(viewHeight / 2);

      if (animationRef.current) {
        animationRef.current.stop();
      }

      animationRef.current = Animated.timing(scrollY, {
        toValue: -contentHeight,
        duration: duration,
        easing: Easing.linear,
        useNativeDriver: true,
      });
      animationRef.current.start();
    }
  };

  const startCountdown = () => {
    setShowCountdown(true);
    setCountdownText('3');
    countdownScale.setValue(1);

    const sequence = Animated.sequence([
      Animated.timing(countdownScale, {
        toValue: 0.5,
        duration: 1000,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(countdownScale, {
        toValue: 1,
        duration: 0,
        useNativeDriver: true,
      }),
      Animated.timing(countdownScale, {
        toValue: 0.5,
        duration: 1000,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(countdownScale, {
        toValue: 1,
        duration: 0,
        useNativeDriver: true,
      }),
      Animated.timing(countdownScale, {
        toValue: 0.5,
        duration: 1000,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(countdownScale, {
        toValue: 1,
        duration: 0,
        useNativeDriver: true,
      }),
      Animated.timing(countdownScale, {
        toValue: 0.5,
        duration: 1000,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]);

    sequence.start(() => {
      setShowCountdown(false);
      setShowText(true);
    });

    setTimeout(() => setCountdownText('2'), 1000);
    setTimeout(() => setCountdownText('1'), 2000);
    setTimeout(() => setCountdownText('GO'), 3000);
  };

  useEffect(() => {
    if (showText && contentHeight > 0) {
      startScrollAnimation();
    }
  }, [showText, contentHeight]);

  const handleRestart = () => {
    setShowText(false);
    setContentHeight(0);
    scrollY.setValue(0);
    startCountdown();
  };

  // Handle orientation changes
  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', () => {
      if (showText && contentHeight > 0) {
        startScrollAnimation();
      }
    });
    return () => subscription?.remove();
  }, [showText, contentHeight]);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: isDarkMode ? '#f0f0f0' : '#fff' }]}
    >
      <View style={styles.videoContainer}>
        <View
          style={[
            styles.videoView,
            styles.aspectRatio16_9,
            {
              backgroundColor: isDarkMode ? '#000' : '#fff',
              borderWidth: isDarkMode ? 0 : 2,
              borderColor: isDarkMode ? 'transparent' : '#000',
            },
          ]}
        >
          <TouchableOpacity style={styles.toggleButton} onPress={toggleTheme}>
            <MaterialIcons
              name={isDarkMode ? 'dark-mode' : 'light-mode'}
              size={moderateScale(28)}
              color={isDarkMode ? '#fff' : '#000'}
            />
          </TouchableOpacity>

          <ScrollView
            ref={scrollViewRef}
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            scrollEnabled={false}
            onContentSizeChange={onContentSizeChange}
          >
            <Animated.View style={{ transform: [{ translateY: scrollY }] }}>
              {showText && (
                <Text style={[styles.text, { color: isDarkMode ? '#fff' : '#000' }]}>
                  {longText}
                </Text>
              )}
            </Animated.View>
          </ScrollView>

          {showCountdown && (
            <Animated.View
              style={[styles.countdownContainer, { transform: [{ scale: countdownScale }] }]}
            >
              <Text style={[styles.countdownText, { color: isDarkMode ? '#fff' : '#000' }]}>
                {countdownText}
              </Text>
            </Animated.View>
          )}
        </View>

        <View style={[styles.videoView, styles.aspectRatio9_16, { backgroundColor: '#808080' }]}>
          <Text style={[styles.text, { color: '#000' }]}>Live Video</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cameraButton} onPress={startCountdown}>
              <MaterialIcons name="photo-camera" size={moderateScale(34)} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.restartButton} onPress={handleRestart}>
              <MaterialIcons name="replay" size={moderateScale(34)} color="#000" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoContainer: {
    width: '95%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(5),
    marginTop: verticalScale(-60),
  },
  videoView: {
    borderRadius: moderateScale(10),
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: verticalScale(10),
    width: '100%',
    position: 'relative',
    maxWidth: SCREEN_WIDTH * 0.95,
    maxHeight: SCREEN_HEIGHT * 0.50,
  },
  aspectRatio9_16: {
    aspectRatio: SCREEN_WIDTH < 600 ? 9 / 11 : 9 / 16, 
  },
  aspectRatio16_9: {
    aspectRatio: SCREEN_WIDTH < 600 ? 16 / 9 : 16 / 9, 
  },
  text: {
    fontSize: moderateScale(32),
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: moderateScale(45),
    paddingHorizontal: scale(20),
  },
  toggleButton: {
    position: 'absolute',
    top: moderateScale(10),
    right: moderateScale(10),
    padding: moderateScale(5),
    zIndex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: moderateScale(10),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: scale(20),
    zIndex: 1,
    width: '100%',
    paddingHorizontal: scale(20),
  },
  restartButton: {
    backgroundColor: '#fff',
    borderRadius: moderateScale(25),
    padding: moderateScale(10),
  },
  cameraButton: {
    backgroundColor: '#fff',
    borderRadius: moderateScale(25),
    padding: moderateScale(10),
  },
  scrollView: {
    width: '100%',
    height: '100%',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: verticalScale(20),
  },
  countdownContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    zIndex: 2,
    borderRadius: moderateScale(50),
  },
  countdownText: {
    fontSize: moderateScale(60),
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default VideoShoot;