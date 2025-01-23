import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Linking } from "react-native";
import { useState } from 'react';

function ExtraResources(){

    return(
        <ScrollView>
        <View style={styles.container}>
            <View style={styles.titleSection}>
                <Text style={styles.title}>Mental Health Disorders</Text>
            </View>
            
            <TouchableOpacity style={styles.links} onPress={() => Linking.openURL('https://childmind.org/topics/anxiety/')}>
                <Text style={styles.linkTitles}>
                    Child Mind Institute
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.links} onPress={() => Linking.openURL('https://kids.iocdf.org')}>
                <Text style={styles.linkTitles}>
                    International OCD Foundation
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.links} onPress={() => Linking.openURL('https://www.nationaleatingdisorders.org/grace-holland-cozine-resource-center-children/')}>
                <Text style={styles.linkTitles}>
                    National Eating Disorder Association
                </Text>
            </TouchableOpacity>

            <View style={styles.titleSection}>
                <Text style={styles.title}>Nutrition and Mental Health</Text>
            </View>

            <TouchableOpacity style={styles.links} onPress={() => Linking.openURL('https://www.health.harvard.edu/blog/nutritional-psychiatry-your-brain-on-food-201511168626')}>
                <Text style={styles.linkTitles}>
                    Harvard Medical School
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.links} onPress={() => Linking.openURL('https://nutrition.org/how-to-boost-mental-health-through-better-nutrition/')}>
                <Text style={styles.linkTitles}>
                    American Society for Nutrition
                </Text>
            </TouchableOpacity>

            <View style={styles.titleSection}>
                <Text style={styles.title}>Sleep and Mental Health</Text>
            </View>

            <TouchableOpacity style={styles.links} onPress={() => Linking.openURL('https://www.columbiapsychiatry.org/news/how-sleep-deprivation-affects-your-mental-health')}>
                <Text style={styles.linkTitles}>
                    Columbia University Department of Psychiatry
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.links} onPress={() => Linking.openURL('https://www.psychiatry.org/news-room/apa-blogs/timing-of-sleep-can-be-important')}>
                <Text style={styles.linkTitles}>
                    American Psychiatric Association
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.links} onPress={() => Linking.openURL('https://www.psychiatry.org/news-room/apa-blogs/making-sleep-a-priority-for-mental-well-being')}>
                <Text style={styles.linkTitles}>
                    American Psychiatric Association
                </Text>
            </TouchableOpacity>

        </View>
        </ScrollView>
    );
};

export default ExtraResources

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: 'center',
    },
    title: {
        fontSize: 40,
        textAlign: "center",
        marginBottom: 40,
        marginTop: 40,
    },
    links: {
        borderWidth: 2,
        borderColor: '#33363F',
        margin: 15,
        paddingVertical: 25,
        paddingHorizontal: 70,
        borderRadius: 30,
        backgroundColor: '#D9D9D9',
    },
    linkTitles: {
        fontSize: 20,
        textAlign: "center",
    },
    
});