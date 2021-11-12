import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';

export default function Box(props) {
    return (
        <ScrollView>
            <View style={styles.container}>
            <TextInput style={styles.box} underlineColorAndroid='rgba(0,0,0,0)' placeholder='Email' placeholderTextColor='#000000' />
            </View >
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    box: {
        width: 300,
        height: 50,
        backgroundColor: '#fcffff',
        borderRadius: 25,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#000000',
        marginVertical: 10,
    },
});
