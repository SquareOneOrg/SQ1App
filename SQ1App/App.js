import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { useCallback, useState, useContext } from 'react';

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
import AvatarAccessoriesShop from './components/AvatarAccessoriesShop.js';
import { AppProvider, AppContext } from './AppContext';
import { UserProvider } from './context/UserContext.js';
import QuestionPopup from './components/QuestionPopup.js';
import { GemProvider } from './components/GemContext.js';
import { TutorialProvider } from './components/TutorialContext.js';
import Settings from './components/Settings.js';
import ChangeUsername from './components/ChangeUsername.js';
import { ChangePassword } from './components/ChangePassword.js';
import PasswordConfirm from './components/PasswordConfim.js';
import UsernameConfirm from './components/UsernameConfim.js';
import AppFeatures from './components/AppFeatures.js';
import ContactUs from './components/ContactUs.js';
import HelpPage from './components/HelpPage.js';
import Reminders from './components/Reminders.js';
import HealthFactSettings from './components/HealthFactSettings.js';
import WeeklyReminderSettings from './components/WeeklyReminderSettings.js';
import PreTestExplanation from './components/PreTestExplanation.js';


const Stack = createNativeStackNavigator();

function MainContent() {
  const { currentView, setCurrentView } = useContext(AppContext);
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
    <View style={styles.container} onLayout={onLayoutRootView}>
      <TopNavBar onNavChange={setCurrentView} />
      <View style={styles.content}>
        {currentView === 'home' && <Homepage />}
        {currentView === 'library' && <Library />}
        {currentView === 'librarybook' && <LibraryBook />}
        {currentView === 'questionnaire' && <Questionnaire />}
        {currentView === 'resourcetransition' && <ResourceTransition />}
        {currentView === 'endpage' && <EndPage />}
        {currentView === 'pretestexplanation' && <PreTestExplanation />}
        {currentView === 'activity' && <Activity onNavChange={setCurrentView} />}
        {currentView === 'linkCenter' && <LinkCenter onNavChange={setCurrentView} />}
        {currentView === 'extraresources' && <ExtraResources onNavChange={setCurrentView} />}
        {currentView === 'account' && <Account onNavChange={setCurrentView} />}
        {currentView === 'accountlogin' && <AccountLogin onNavChange={setCurrentView} />}
        {currentView === 'accountloginforgot' && <AccountLoginForgot onNavChange={setCurrentView} />}
        {currentView === 'accountforgotusername' && <AccountForgotUsername onNavChange={setCurrentView} />}
        {currentView === 'accountforgotpassword' && <AccountForgotPassword onNavChange={setCurrentView} />}
        {currentView === 'accountavatar' && <AccountAvatar onNavChange={setCurrentView} />}
        {currentView === 'accountparent' && <AccountParent onNavChange={setCurrentView} />}
        {currentView === 'accountparentemail' && <AccountParentEmail onNavChange={setCurrentView} />}
        {currentView === 'accountverification' && <AccountVerification onNavChange={setCurrentView} />}
        {currentView === 'accountcreate' && <AccountCreate onNavChange={setCurrentView} />}
        {currentView === 'accountthanks' && <AccountThanks onNavChange={setCurrentView} />}
        {currentView === 'accountwelcome' && <AccountWelcome onNavChange={setCurrentView} />}
        {currentView === 'accountavatarchange' && <AccountAvatarChange onNavChange={setCurrentView} />}
        {currentView === 'settings' && <Settings onNavChange={setCurrentView} />}
        {currentView === 'passwordconfirm' && <PasswordConfirm onNavChange={setCurrentView} />}
        {currentView === 'usernameconfirm' && <UsernameConfirm onNavChange={setCurrentView} />}
        {currentView === 'sleeplog' && <SleepLog />}
        {currentView === 'changeUsername' && <ChangeUsername onNavChange={setCurrentView} />}
        {currentView === 'helppage' && <HelpPage onNavChange={setCurrentView} />}
        {currentView === 'changePassword' && <ChangePassword onNavChange={setCurrentView} />}
        {currentView === 'exerciselog' && <ExerciseLog />}
        {currentView === 'nutritionlog' && <NutritionLog />}
        {currentView === 'calendar' && <Calendar />}
        {currentView === 'personalData' && <PersonalData />}
        {currentView === 'appfeatures' && <AppFeatures />}
        {currentView === 'contactus' && <ContactUs />}
        {currentView === 'questionpopup' && <QuestionPopup />}
        {currentView === 'reminders' && <Reminders onNavChange={setCurrentView} />}
        {currentView === 'healthfactsettings' && <HealthFactSettings onNavChange={setCurrentView} />}
        {currentView === 'weeklyremindersettings' && <WeeklyReminderSettings onNavChange={setCurrentView} />}
      </View>
      <BotNavBar onNavChange={setCurrentView} />
      <StatusBar style="auto" />
    </View>
  );
}

export default function App() {
  return (
    <AppProvider>
      <UserProvider>
        <GemProvider>
        <TutorialProvider>
          <NavigationContainer>
            <MainContent />
          </NavigationContainer>
          </TutorialProvider>
        </GemProvider>
      </UserProvider>
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});