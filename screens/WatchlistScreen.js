import React from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Header from '../components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useState, useEffect } from 'react';
import Show from '../components/Show';
import AlphabetList from "react-native-flatlist-alphabet";

const WatchlistScreen = ({ navigation }) => {
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
    const [watchlistItems, setWatchlistItems] = useState([])
    useEffect(() => {
        async function fetchWatchlist(){
            let wl = await getWatchlist()
            const shows = await fetchShows(wl)
            setWatchlistItems(shows)
        }
        navigation.addListener('focus', () => {
            fetchWatchlist()
          });
    }, [navigation])
    const fetchShows = async (ids) => {
        let shows = []
        for(const id of ids){
            const apiUrl = 'https://api.tvmaze.com/shows/'+id+'?embed=nextepisode';
            const result = await fetch(apiUrl);
            let data = await result.json();
            data = { ...data, isWatching: true}
            shows.push(data);
        }
        return shows

    }
    return (
        <View style = { styles.container } >
            <ScrollView   showsVerticalScrollIndicator={false}>
                <Header text={"Mano serialai ("+watchlistItems.length+")"}></Header>
                <View>
                {
                    watchlistItems.map((show) => (
                        <Show key={show.id} show={show} updateWatchlist={updateWatchlist} getWatchlist={getWatchlist}/> 
                    ))
                }
                </View>
            </ScrollView>
            {/* <View style={{height: 60, backgroundColor: "#c4007a"}}><Text>Ad here</Text></View> */}
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
export default WatchlistScreen
