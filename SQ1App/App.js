import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';

import Homepage from './components/Homepage.js'
import PersonalData from './components/PersonalData.js'
import TopNavBar from './components/TopNavBar.js'
import BotNavBar from './components/BotNavBar.js'
import Library from './components/Library.js'
import Activity from './components/Activity.js'
import LinkCenter from './components/LinkCenter.js';
import Account from './components/Account.js';
import SleepLog from './components/SleepLog.js';
import ExerciseLog from './components/ExerciseLog.js';
import NutritionLog from './components/NutritionLog.js';
import Calendar from './components/Calendar.js';
import LibraryBook from './components/LibraryBook.js'
import Questionnaire from './components/Questionnaire.js'
import ExtraResources from './components/ExtraResources.js';
import AccountLogin from './components/AccountLogin.js';
import AccountAvatar from './components/AccountAvatar.js';
import AccountParent from './components/AccountParent.js';
import AccountParentEmail from './components/AccountParentEmail.js';

const Stack = createNativeStackNavigator();

function MainContent({ currentView, setCurrentView }) {
  return (
    <View style={styles.container}>
      <TopNavBar />
      {currentView === 'home' && <Homepage />}
      {currentView === 'library' && <Library />}
      {currentView === 'activity' && <Activity onNavChange={setCurrentView} />}
      {currentView === 'linkCenter' && <LinkCenter onNavChange = {setCurrentView} />}
      {currentView === 'extraresources' && <ExtraResources onNavChange = {setCurrentView} />}
      {currentView === 'account' && <Account onNavChange = {setCurrentView} />}
      {currentView === 'accountlogin' && <AccountLogin onNavChange = {setCurrentView} />}
      {currentView === 'accountavatar' && <AccountAvatar onNavChange = {setCurrentView} />}
      {currentView === 'accountparent' && <AccountParent onNavChange = {setCurrentView} />}
      {currentView === 'accountparentemail' && <AccountParentEmail onNavChange = {setCurrentView} />}
      {currentView === 'sleeplog' && <SleepLog />}
      {currentView === 'exerciselog' && <ExerciseLog />}
      {currentView === 'nutritionlog' && <NutritionLog />}
      {currentView === 'calendar' && <Calendar /> }
      {currentView === 'personalData' && <PersonalData /> }
      <BotNavBar onNavChange={setCurrentView}/>
      
      <StatusBar style="auto" />
    </View>
  );
}

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [fontsLoaded] = useFonts({
    'Sniglet': require('./assets/fonts/Sniglet-Regular.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          options={{ headerShown: false }}>
          {(props) => (
            <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
              <MainContent currentView={currentView} setCurrentView={setCurrentView} />
            </View>
          )}
        </Stack.Screen>
        <Stack.Screen name="LibraryBook" component={LibraryBook} />
        <Stack.Screen name="Questionnaire" component={Questionnaire} />
      </Stack.Navigator>
    </NavigationContainer>
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