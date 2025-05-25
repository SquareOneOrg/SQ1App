import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AppContext } from '../AppContext';

const daysOfWeek = ['S','M','T','W','T','F','S'];
const monthsOfYear = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December'
];

export default function Calendar({ onDateSelect }) {
  const { setCurrentView } = useContext(AppContext);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const today = new Date();
  const isCurrentMonth = today.getMonth() === currentMonth && today.getFullYear() === currentYear;
  const todayDate = today.getDate();

  const previousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(y => y - 1);
    } else {
      setCurrentMonth(m => m - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(y => y + 1);
    } else {
      setCurrentMonth(m => m + 1);
    }
  };

  const renderDays = () => {
    const cells = [];
  
    // only prefix blanks to line up the 1st…
    for (let i = 0; i < firstDayOfMonth; i++) {
      cells.push(<View key={`empty-${i}`} style={styles.dayCell} />);
    }
  
    // …then your real days
    for (let d = 1; d <= daysInMonth; d++) {
      const isToday = isCurrentMonth && d === todayDate;
      const dateObj = new Date(currentYear, currentMonth, d);
      cells.push(
        <TouchableOpacity
          key={d}
          style={[styles.dayCell, isToday && styles.todayCell]}
          onPress={() => onDateSelect?.(dateObj)}
        >
          <Text style={[styles.dayText, isToday && styles.todayText]}>
            {d}
          </Text>
        </TouchableOpacity>
      );
    }
  
    // **NO trailing‑blank loop here**
  
    return cells;
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={previousMonth}><Text style={styles.navText}>‹</Text></TouchableOpacity>
        <Text style={styles.monthText}>{monthsOfYear[currentMonth]} {currentYear}</Text>
        <TouchableOpacity onPress={nextMonth}><Text style={styles.navText}>›</Text></TouchableOpacity>
      </View>
      <View style={styles.weekRow}>
        {daysOfWeek.map((day, i) => (
          <View key={i} style={styles.weekCell}>
            <Text style={styles.weekText}>{day}</Text>
          </View>
        ))}
      </View>
      <View style={styles.daysGrid}>{renderDays()}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    maxWidth: 350,
    alignSelf: 'center',
    backgroundColor: '#A7BFE8',
    padding: 10,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#33363F',
    borderRadius: 10,
  },
  headerRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  navText: {
    fontSize: 22,
    fontFamily: 'Sniglet',
    color: '#333',
    paddingHorizontal: 16,
  },
  monthText: {
    fontSize: 20,
    fontFamily: 'Sniglet',
    fontWeight: '600',
    color: '#333',
  },
  weekRow: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 4,
  },
  weekCell: {
    width: `${100/7}%`,
    alignItems: 'center',
  },
  weekText: {
    fontSize: 22,
    fontFamily: 'Sniglet',
    fontWeight: 'bold',
    color: '#333',
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },
  dayCell: {
    width: `${100/7}%`,
    aspectRatio: 1,
    marginVertical: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  dayText: {
    fontSize: 22,
    fontFamily: 'Sniglet',
    color: '#333',
  },
  todayCell: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#5C6EF8',
  },
  todayText: {
    color: '#5C6EF8',
    fontFamily: 'Sniglet',
    fontWeight: 'bold',
    fontSize: 22,
  }
});
