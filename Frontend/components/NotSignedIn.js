import { View, Text, Button, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

import { BottomNav } from './PostModal';
import SignInAndUp from './SignInAndUp';

export default function NotSignedIn() {
    const nav = useNavigation()

    return (
    <>
        <Text>This page requires you to be signed in.</Text>
        <Button title="Go to Sign In/Up" onPress={() => { nav.navigate("Sign In and Up")}}/>
    </>
    )
}