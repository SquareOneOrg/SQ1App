import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const monthsOfYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function Calendar({ onDateSelect }) {
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    const previousMonth = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear(currentYear - 1);
        } else {
            setCurrentMonth(currentMonth - 1);
        }
    };

    const nextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear(currentYear + 1);
        } else {
            setCurrentMonth(currentMonth + 1);
        }
    };

    const renderDays = () => {
        const dayCells = [];
        const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

        for (let i = 0; i < firstDayOfMonth; i++) {
            dayCells.push(<View key={`empty-${i}`} style={styles.dayCell}/>);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            dayCells.push(
                <TouchableOpacity key={day} style={styles.dayCell} onPress={() => onDateSelect(new Date(currentYear, currentMonth, day))}>
                    <Text>{day}</Text>
                </TouchableOpacity>
            );
        }

        return dayCells;
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={previousMonth}><Text>Prev</Text></TouchableOpacity>
            <Text>{monthsOfYear[currentMonth]} {currentYear}</Text>
            <TouchableOpacity onPress={nextMonth}><Text>Next</Text></TouchableOpacity>
            <View style={styles.daysGrid}>
                {renderDays()}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        alignItems: 'center'
    },
    daysGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    dayCell: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 2,
    }
});

export default Calendar;
