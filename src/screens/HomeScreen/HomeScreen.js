import React from 'react';
import { SafeAreaView, StatusBar, Button } from 'react-native';

const HomeScreen = ({ navigation }) => (
  <>
    <StatusBar barStyle="dark-content" />
    <SafeAreaView>
      <Button
        title="Go to Search"
        onPress={() => navigation.navigate('Search')}
      />
      <Button
        title="Go to Learning Page"
        onPress={() => navigation.navigate('Learn')}
      />
      <Button
        title="Go to Settings"
        onPress={() => navigation.navigate('Settings')}
      />
    </SafeAreaView>
  </>
);

export default HomeScreen;
