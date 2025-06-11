import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import HomeIcon from "../../assets/icons/HomeIcon";
import SettingsIcon from '../../assets/icons/SettingsIcons'; // Adjusted to singular "SettingsIcon"
export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'grey', // Explicitly set inactive color to grey
        headerShown: false,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
            backgroundColor: 'rgba(255, 255, 255, 0.8)', // Slight opacity for iOS blur
          },
          default: {
            backgroundColor: '#fff', // Solid white for other platforms
          },
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <HomeIcon color={color} size={25} /> // Use dynamic color and consistent size
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings', // Capitalized for consistency
          tabBarIcon: ({ color }) => (
            <SettingsIcon color={color} size={38} /> 
          ),
        }}
      />
    </Tabs>
  );
}