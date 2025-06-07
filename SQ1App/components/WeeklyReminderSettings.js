import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));
const ampm = ['AM', 'PM'];

export default function WeeklyReminderSettings() {
  const [values, setValues] = useState({
    day: 'Sunday',
    hour: '12',
    minute: '00',
    ampm: 'PM',
  });
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleSelect = (type, value) => {
    setValues((prev) => ({ ...prev, [type]: value }));
    setOpenDropdown(null);
  };

  const handleSave = async () => {
    try {
      await AsyncStorage.setItem('weeklyReminderTime', JSON.stringify(values));

      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Required', 'Please enable notifications in your device settings.');
        return;
      }

      await Notifications.cancelAllScheduledNotificationsAsync();
      await scheduleWeeklyReminder(values);
      
     
    } catch (error) {
      console.error('Error saving reminder:', error);
    }
  };

  const scheduleWeeklyReminder = async (reminder) => {
    const { day, hour, minute, ampm } = reminder;

    let hour24 = parseInt(hour, 10);
    if (ampm === 'PM' && hour24 !== 12) hour24 += 12;
    if (ampm === 'AM' && hour24 === 12) hour24 = 0;

    // SUnday starts at one 
    const weekday = daysOfWeek.indexOf(day) + 1;


    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Weekly Reminder',
        body: 'Make sure to check out the SQ1 App today!',
        sound: true,
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.CALENDAR,
        repeats: true,
        weekday: weekday,
        hour: hour24,
        minute: parseInt(minute, 10),
      },
    });

  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weekly Reminders</Text>
      <Text style={styles.subtitle}>
        Plan when you'd like to receive{`\n`}weekly reminders to cover{`\n`}Square One content!
      </Text>

      <View style={{ width: '100%' }}>
        <TouchableOpacity
          style={styles.pickerContainer}
          onPress={() => setOpenDropdown(openDropdown === 'day' ? null : 'day')}
        >
          <Text style={styles.pickerText}>{values.day}</Text>
        </TouchableOpacity>
        {openDropdown === 'day' && (
          <View style={styles.dayDropdownList}>
            <ScrollView style={{ maxHeight: 250 }}>
              {daysOfWeek.map(day => (
                <TouchableOpacity
                  key={day}
                  style={styles.dayDropdownItem}
                  onPress={() => handleSelect('day', day)}
                >
                  <Text style={styles.dayDropdownItemText}>{day}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
      </View>

      <View style={styles.timeRow}>
        <View>
          <TouchableOpacity
            style={styles.timePickerBox}
            onPress={() => setOpenDropdown(openDropdown === 'hour' ? null : 'hour')}
          >
            <Text style={styles.pickerText}>{values.hour}</Text>
          </TouchableOpacity>
          {openDropdown === 'hour' && (
            <View style={styles.dropdownList}>
              <ScrollView style={{ maxHeight: 250 }}>
                {hours.map(hour => (
                  <TouchableOpacity
                    key={hour}
                    style={styles.dropdownItem}
                    onPress={() => handleSelect('hour', hour)}
                  >
                    <Text style={styles.dropdownItemText}>{hour}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
        </View>

        <Text style={styles.colon}>:</Text>

        <View>
          <TouchableOpacity
            style={styles.timePickerBox}
            onPress={() => setOpenDropdown(openDropdown === 'minute' ? null : 'minute')}
          >
            <Text style={styles.pickerText}>{values.minute}</Text>
          </TouchableOpacity>
          {openDropdown === 'minute' && (
            <View style={styles.dropdownList}>
              <ScrollView style={{ maxHeight: 250 }}>
                {minutes.map(minute => (
                  <TouchableOpacity
                    key={minute}
                    style={styles.dropdownItem}
                    onPress={() => handleSelect('minute', minute)}
                  >
                    <Text style={styles.dropdownItemText}>{minute}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
        </View>

        <View>
          <TouchableOpacity
            style={styles.timePickerBox}
            onPress={() => setOpenDropdown(openDropdown === 'ampm' ? null : 'ampm')}
          >
            <Text style={styles.pickerText}>{values.ampm}</Text>
          </TouchableOpacity>
          {openDropdown === 'ampm' && (
            <View style={styles.dropdownList}>
              <ScrollView style={{ maxHeight: 120 }}>
                {ampm.map(ap => (
                  <TouchableOpacity
                    key={ap}
                    style={styles.dropdownItem}
                    onPress={() => handleSelect('ampm', ap)}
                  >
                    <Text style={styles.dropdownItemText}>{ap}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
        </View>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>SAVE</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7D97D1',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-start',
  },
  title: {
    fontFamily: 'Sniglet',
    fontSize: 40,
    color: '#191A24',
    marginBottom: 15,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'Sniglet',
    fontSize: 22,
    color: '#33363F',
    marginBottom: 40,
    textAlign: 'center',
    lineHeight: 28,
    paddingHorizontal: 20,
  },
  pickerContainer: {
    backgroundColor: '#A2B9E6',
    borderRadius: 25,
    width: 200,
    marginBottom: 30,
    justifyContent: 'center',
    height: 50,
    alignItems: 'center',
    alignSelf: 'center',
  },
  pickerText: {
    fontFamily: 'Sniglet',
    fontSize: 24,
    color: '#191A24',
    textAlign: 'center',
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 30,
    justifyContent: 'center',
  },
  timePickerBox: {
    backgroundColor: '#A2B9E6',
    borderRadius: 15,
    marginHorizontal: 5,
    width: 80,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  colon: {
    fontFamily: 'Sniglet',
    fontSize: 32,
    color: '#191A24',
    marginHorizontal: 2,
  },
  dropdownList: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 2,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#A2B9E6',
    position: 'absolute',
    width: 80,
    zIndex: 10,
    top: 50,
    left: '50%',
    transform: [{ translateX: -40 }],
  },
  dayDropdownList: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 2,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#A2B9E6',
    position: 'absolute',
    width: 200,
    zIndex: 10,
    top: 50,
    left: '50%',
    transform: [{ translateX: -100 }],
  },
  dropdownItem: { 
    padding: 12,
  },
  dayDropdownItem: {
    padding: 15,
  },
  dropdownItemText: { 
    fontSize: 16, 
    color: '#191A24', 
    fontFamily: 'Sniglet',
    textAlign: 'center',
  },
  dayDropdownItemText: {
    fontSize: 20,
    color: '#191A24',
    fontFamily: 'Sniglet',
    textAlign: 'center',
  },
  saveButton: {
    backgroundColor: '#A2B9E6',
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 70,
    marginTop: 20,
    borderWidth: 2,
    borderColor: '#33363F',
  },
  saveButtonText: {
    fontFamily: 'Sniglet',
    fontSize: 26,
    color: '#33363F',
    textAlign: 'center',
  },
});