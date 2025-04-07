import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { useCallback, useState, useContext} from 'react';

import Homepage from './components/Homepage.js'
import PersonalData from './components/PersonalData.js'
import TopNavBar from './components/TopNavBar.js'
import BotNavBar from './components/BotNavBar.js'
import Activity from './components/Activity.js'
import LinkCenter from './components/LinkCenter.js';
import Account from './components/Account.js';
import SleepLog from './components/SleepLog.js';
import ExerciseLog from './components/ExerciseLog.js';
import NutritionLog from './components/NutritionLog.js';
import Calendar from './components/Calendar.js';
import LibraryBook from './components/LibraryBook.js';
import Library from './components/Library.js';
import ResourceTransition from './components/ResourceTransition'
import Questionnaire from './components/Questionnaire.js';
import ExtraResources from './components/ExtraResources.js';
import EndPage from './components/EndPage.js';
import AccountLogin from './components/AccountLogin.js';
import AccountAvatar from './components/AccountAvatar.js';
import AccountParent from './components/AccountParent.js';
import AccountParentEmail from './components/AccountParentEmail.js';
import AccountVerification from './components/AccountVerification.js';
import AccountLoginForgot from './components/AccountLoginForgot.js';
import AccountForgotUsername from './components/AccountForgotUsername.js';
import AccountForgotPassword from './components/AccountForgotPassword.js';
import AccountCreate from './components/AccountCreate.js';
import AccountThanks from './components/AccountThanks.js';
import AccountWelcome from './components/AccountWelcome.js';
import AccountAvatarChange from './components/AccountAvatarChange.js'
import { AppProvider, AppContext } from './AppContext';


const Stack = createNativeStackNavigator();

function MainContent() {
  const { currentView } = useContext(AppContext);
  return (
    <View style={styles.container}>
      {/* <TopNavBar /> */}
      {currentView === 'account' && <Account />}
      {currentView === 'accountavatar' && <AccountAvatar />}
      {currentView === 'accountavatarchange' && <AccountAvatarChange />}
      {currentView === 'accountcreate' && <AccountCreate />}
      {currentView === 'accountforgotpassword' && <AccountForgotPassword />}
      {currentView === 'accountforgotusername' && <AccountForgotUsername />}
      {currentView === 'accountlogin' && <AccountLogin />}
      {currentView === 'accountloginforgot' && <AccountLoginForgot />}
      {currentView === 'accountparent' && <AccountParent />}
      {currentView === 'accountparentemail' && <AccountParentEmail />}
      {currentView === 'accountthanks' && <AccountThanks />}
      {currentView === 'accountverification' && <AccountVerification />}
      {currentView === 'accountwelcome' && <AccountWelcome />}
      {currentView === 'activity' && <Activity />}
      {currentView === 'calendar' && <Calendar />}
      {currentView === 'endpage' && <EndPage />}
      {currentView === 'exerciselog' && <ExerciseLog />}
      {currentView === 'extraresources' && <ExtraResources />}
      {currentView === 'home' && <Homepage />}
      {currentView === 'library' && <Library />}
      {currentView === 'librarybook' && <LibraryBook />}
      {currentView === 'linkCenter' && <LinkCenter />}
      {currentView === 'nutritionlog' && <NutritionLog />}
      {currentView === 'personalData' && <PersonalData />}
      {currentView === 'questionnaire' && <Questionnaire />}
      {currentView === 'resourcetransition' && <ResourceTransition />}
      {currentView === 'sleeplog' && <SleepLog />}
      {/* <BotNavBar onNavChange={setCurrentView}/> */}
      
      <StatusBar style="auto" />
    </View>
  );
}

function MainScreen() {
  const [fontsLoaded] = useFonts({
    Sniglet: require('./assets/fonts/Sniglet-Regular.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <MainContent />
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
    <AppProvider>
      <NavigationContainer>
      <View style={{ flex: 1 }}>
      <TopNavBar /> 
      <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Main"
        component={MainScreen}
        options={{ headerShown: false }}
      />
      </Stack.Navigator>
      <BotNavBar/>
      </View>
      <StatusBar style="auto" />
    </NavigationContainer>
    </AppProvider>
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