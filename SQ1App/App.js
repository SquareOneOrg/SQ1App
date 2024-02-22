import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Homepage from './components/Homepage.js'
import TopNavBar from './components/TopNavBar.js'
import BotNavBar from './components/BotNavBar.js'
import Library from './components/Library.js'
import Activity from './components/Activity.js'
import LinkCenter from './components/LinkCenter.js';
import Account from './components/Account.js';

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  
  return (
    <View style={styles.container}>
      <TopNavBar />
      {currentView === 'home' && <Homepage />}
      {currentView === 'library' && <Library />}
      {currentView === 'activity' && <Activity />}
      {currentView === 'linkCenter' && <LinkCenter />}
      {currentView === 'account' && <Account />}
      <BotNavBar onNavChange={setCurrentView}/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
    alignItems: 'center',
    justifyContent: 'center',
  },

});
