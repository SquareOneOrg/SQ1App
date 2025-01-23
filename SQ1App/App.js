import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

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
import ExtraResources from './components/ExtraResources.js';


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
      {currentView === 'account' && <Account />}
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
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Main" 
          options={{ headerShown: false }}>
          {(props) => <MainContent currentView={currentView} setCurrentView={setCurrentView} />}
        </Stack.Screen>
        <Stack.Screen name="LibraryBook" component={LibraryBook} />
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