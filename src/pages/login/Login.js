import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';

import firebase from '../../../database/firebase';
require('firebase/auth')

export default function Login(props) {

    const [state, setState] = useState({
        email: '',
        password: '',
    });

    const handleChangeText = (name, value) => {
        setState({ ...state, [name]: value })
    }

    const [users, setUsers] = useState([]);

    useEffect(() => {

        const users = [];

        firebase.db.collection('users').onSnapshot(querySnapshot => {
            querySnapshot.docs.forEach(doc => {

                const { email, password } = doc.data();

                users.push({
                    id: doc.id,
                    email,
                    password
                });
            });
            setUsers(users);
        });
    }, []);

    const login = async () => {
        if (state.email == "" || state.password == "") {

            alert('There is a blank field');

        } else {

            if (users) {
                var i = 0;
                var email = state.email;
                var password = state.password;
                var emailAux = "";
                while (i < users.length && emailAux == "") {
                    if (email == users[i].email && password == users[i].password) {
                        props.root.navigate('Init');
                    }
                    i++;
                }
            }
        }
    }

    return (
        <View style={styles.blockLogin}>
            <Image style={styles.logoUser} source={require('../../../assets/img/logo/user-icons.gif')} />
            <TextInput style={styles.inputLogin} underlineColorAndroid='rgba(0,0,0,0)' onChangeText={(value => handleChangeText('email', value))} placeholder='Email' placeholderTextColor='#000000' />
            <TextInput style={styles.inputLogin} underlineColorAndroid='rgba(0,0,0,0)' onChangeText={(value => handleChangeText('password', value))} placeholder='Password' secureTextEntry={true} placeholderTextColor='#000000' />
            <TouchableOpacity style={styles.buttonLogin}>
                <Text style={styles.buttonText} onPress={() => login()}>Login</Text>
            </TouchableOpacity>
            <View style={styles.signUpTextLogin}>
                <Text style={styles.signUpText}>Don't have an account yet?</Text>
                <Text style={styles.signUpButton} onPress={() => props.root.navigate('Signup')}>Signup</Text>
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    blockLogin: {
        flex: 1,
        alignItems: 'center',
    },
    textLogo: {
        color: 'black',
    },
    inputLogin: {
        width: 300,
        height: 50,
        backgroundColor: '#fcffff',
        borderRadius: 25,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#000000',
        marginVertical: 10,
    },
    buttonLogin: {
        width: 300,
        backgroundColor: '#006ea8',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 16,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ffffff',
        textAlign: 'center',
    },
    signUpTextLogin: {
        flexGrow: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingVertical: 16,
        flexDirection: 'row',
    },
    signUpText: {
        color: 'white',
        fontSize: 16,
    },
    signUpButton: {
        color: '#006ea8',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 3,
    },
    logoUser: {
        width: 50,
        height: 50,
        borderRadius: 150,
    }

});