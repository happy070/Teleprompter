import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const VideoShoot = () => {
  return (
    <View style={styles.container}>
      <View style={styles.videoContainer}>
           <View style={[styles.videoView, styles.aspectRatio16_9]}>
          <Text style={styles.text}>Scrollable Text</Text>
        </View>
        <View style={[styles.videoView, styles.aspectRatio9_16]}>
          <Text style={styles.text}>Live Video</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  videoContainer: {
    width: '95%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  videoView: {
    backgroundColor: '#000',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    width: '100%',
  },
  aspectRatio9_16: {
    aspectRatio: 9 / 11,
  },
  aspectRatio16_9: {
    aspectRatio: 16 / 9,
  },
  text: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default VideoShoot;