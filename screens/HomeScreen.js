import React from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Search from '../components/Search';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Header from '../components/Header';
import { AdMobBanner } from 'expo-ads-admob';

const HomeScreen = () => {

    const updateWatchlist = async (value) => {
        try {
            let watchlist = await getWatchlist()

            if(watchlist.includes(value)){
                // remove
                watchlist = watchlist.filter(function(e) { return e != value})
            }else{
                // add
                watchlist.push(value)
            }
            await AsyncStorage.setItem('@watchlist', watchlist.join(','))
            //await AsyncStorage.clear()
        } catch (e) {
            // saving error
        }
    }

    const getWatchlist = async () => {
        try {
            const value = await AsyncStorage.getItem('@watchlist')
            if (value !== null) {
                return value.split(",").map(Number)
            }else {
                return []
            }
        } catch (e) {
            // error reading value
        }
    }
    return (
        <View style={styles.container} >
            <ScrollView showsVerticalScrollIndicator={false}>
                <Header text={"Kada išeis kita serija?"}></Header>

                <Search updateWatchlist={updateWatchlist} getWatchlist={getWatchlist} />
            </ScrollView>
            <AdMobBanner
                bannerSize="fullBanner"
                adUnitID="ca-app-pub-3940256099942544/6300978111" // Test ID, Replace with your-admob-unit-id
                servePersonalizedAds={true}
                 />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000000',
        flex: 1,
        alignItems: 'center',
        padding: 2,
        paddingTop: '5%'
    }
});
export default HomeScreen
