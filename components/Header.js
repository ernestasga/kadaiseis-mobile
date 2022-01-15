import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

const Header = ({text}) => {
    return (
        <View style = { styles.container } >
            <Image source={require('../assets/logo-text.png')}/>
            <Text style = { styles.title }>{text}</Text> 
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 2,
        width: '100%',
        paddingTop: '10%'
    },
    title: {
        fontSize: 40,
        fontWeight: "bold",
        textAlign: 'center',
        paddingBottom: 50,
        color: '#ffffff'

    },
});
export default Header
