import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { AppContext } from '../AppContext';

const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const monthsOfYear = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

function Calendar({ onDateSelect }) {
  const {setCurrentView} = useContext(AppContext);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  // For highlighting today's date if in same month/year
  const today = new Date();
  const isCurrentMonth =
    today.getMonth() === currentMonth && today.getFullYear() === currentYear;
  const todayDate = today.getDate();

  const previousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  const renderDays = () => {
    const dayCells = [];

    // Empty slots for days before the 1st
    for (let i = 0; i < firstDayOfMonth; i++) {
      dayCells.push(<View key={`empty-${i}`} style={styles.dayCell} />);
    }

    // Actual days in this month
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = isCurrentMonth && day === todayDate;
      const dateObj = new Date(currentYear, currentMonth, day);

      dayCells.push(
        <TouchableOpacity
          key={day}
          style={[styles.dayCell, isToday && styles.todayCell]}
          onPress={() => onDateSelect?.(dateObj)}
        >
          <Text style={[styles.dayText, isToday && styles.todayText]}>
            {day}
          </Text>
        </TouchableOpacity>
      );
    }

    return dayCells;
  };

  return (
    <View style={styles.calendarContainer}>
      {/* Header Row */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={previousMonth}>
          <Text style={styles.navText}>{'<'}</Text>
        </TouchableOpacity>

        <Text style={styles.monthText}>
          {monthsOfYear[currentMonth]} {currentYear}
        </Text>

        <TouchableOpacity onPress={nextMonth}>
          <Text style={styles.navText}>{'>'}</Text>
        </TouchableOpacity>
      </View>

      {/* Days of Week */}
      <View style={styles.weekRow}>
        {daysOfWeek.map((day, idx) => (
          <Text key={idx} style={styles.weekDay}>
            {day}
          </Text>
        ))}
      </View>

      {/* Calendar Grid */}
      <View style={styles.daysGrid}>{renderDays()}</View>
    </View>
  );
}

export default Calendar;

const styles = StyleSheet.create({
  // This wrapper can fill the parent’s width (assuming the parent container uses flex or full width)
  calendarContainer: {
    backgroundColor: '#A7BFE8', // The light bluish color you want
    borderRadius: 0,            // remove corner rounding if you want it fully extended
    paddingVertical: 20,
    paddingHorizontal: 10,
    alignItems: 'center',

    // Let the parent container control the width
    // or use 'width: "100%"' if you want it to fill horizontally
    width: '100%',    
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginBottom: 12,
  },
  navText: {
    fontSize: 20,
    color: '#333',
    paddingHorizontal: 10,
    fontFamily: 'Sniglet', // Use your custom font here
  },
  monthText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    fontFamily: 'Sniglet',
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
    marginBottom: 8,
  },
  weekDay: {
    fontWeight: 'bold',
    fontSize: 14,
    width: 30,
    textAlign: 'center',
    fontFamily: 'Sniglet',
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '90%',
  },
  dayCell: {
    width: 30,
    height: 30,
    margin: 4,
    borderRadius: 15, // circle
    backgroundColor: '#DADFEF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayText: {
    fontSize: 14,
    color: '#333',
    fontFamily: 'Sniglet',
  },
  todayCell: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#5C6EF8',
  },
  todayText: {
    color: '#5C6EF8',
    fontWeight: 'bold',
    fontFamily: 'Sniglet',
  },
});
