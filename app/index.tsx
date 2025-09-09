import { colors } from '@/constants/theme';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';

const index = () => {
    const router =useRouter();
    useEffect(() => {
  const timer = setTimeout(() => {
    router.replace('/(auth)/welcome');
  }, 2000);
  return () => clearTimeout(timer);
}, []);

  return (
    <View style={styles.container}>
      <Image
      style={styles.logo}      
      resizeMode="contain"
      source={require("../assets/icons/splash.png")}
      />
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:colors.neutral900,
    },
    logo: {
        //width: 100,
        height: "20%",
        aspectRatio: 1,
      },
})