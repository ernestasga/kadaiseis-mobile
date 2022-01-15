import React from 'react'
import { StyleSheet, View, Text, Button, Image } from 'react-native'
import { useState } from 'react'

const Show = ({show, updateWatchlist}) => {

    var nextEpisode = ''
    var airdate = ''
    var nextEpExists = false
    try{
        if (show._embedded.nextepisode != null) {
            nextEpisode = 's'+show._embedded.nextepisode.season+'e'+show._embedded.nextepisode.number
            var dt = new Date(show._embedded.nextepisode.airstamp)
            airdate = dt.toLocaleDateString('lt-LT', { weekday: 'short', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' });
            nextEpExists = true
        } else {
            
        }
    } catch(e) {

    }
    const [watching, setWatching] = useState(show.isWatching)
    const toggleWatchlistItem = () => {
        updateWatchlist(show.id)
        show.isWatching = !show.isWatching
        setWatching(!watching)
    }
    return (
        <View style={styles.card}>
            <View style={styles.header}>
               <Text style={styles.title}>{show.name}</Text>
               <Button 
                    onPress={toggleWatchlistItem} 
                    title={show.isWatching ? 'Nebesekti' : 'Sekti'}
                    color={show.isWatching ? '#a31208' : '#027300'}>
                </Button>
            </View>
            <View style={styles.content}>
                {
                    show.image != null ?
                    <Image 
                        style={styles.image} 
                        source={{uri: show.image.medium}}
                    /> :
                    <Image 
                        style={styles.image} 
                        source={require('../assets/no-img.jpg')}
                    />
                }
            </View>
            {
                nextEpExists ?
                <View style={styles.footer}>
                    <Text style={styles.imdb}>IMDBb {show.rating.average}/10</Text>
                    <View style={styles.nextEp}>
                        <Text style={styles.ep}>{nextEpisode}</Text>
                        <Text style={styles.date}>{airdate}</Text>
                    </View>
                </View> : <Text>Nėra informacijos...</Text>

            }
        </View>
    )
}
const styles = StyleSheet.create({
    card: {
        flex: 1,
        alignItems: 'center',
        margin: 20,
        width: '90%',
        backgroundColor: '#ffffff'
    },
    header: {
        paddingVertical: 20,
        flex: 1,
    },
    title: {
        fontSize: 20,
        paddingBottom: 10,
        color: '#000000',
        fontWeight: 'bold'
    },
    content: {
        width: '100%'
    },
    image: {
        height: 350,
        width: "100%" 
    },
    footer: {
        paddingVertical: 10,
        flex: 1,
        alignItems: 'center'
    },
    imdb: {
        fontWeight: 'bold',
        fontSize: 15,
        padding: 4,
        borderRadius: 3,
        backgroundColor: '#f3ce13'
    },
    nextEp: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 7
    },
    ep: {
        paddingVertical: 1,
        paddingHorizontal: 7,
        backgroundColor: '#a31208',
        borderRadius: 7,
        marginHorizontal: 5,
        color: '#ffffff',
        fontWeight: 'bold'
    },
    date: {
        paddingVertical: 1,
        paddingHorizontal: 7,
        backgroundColor: '#027300',
        borderRadius: 7,
        marginHorizontal: 5,
        color: '#ffffff',
        fontWeight: 'bold'
    }

});

export default Show
