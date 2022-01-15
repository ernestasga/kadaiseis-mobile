import React from 'react'
import { StyleSheet, View, TextInput } from 'react-native'
import { useState, useEffect } from 'react'
import Show from './Show'
const Search = ({updateWatchlist, getWatchlist}) => {
    const [searchResult, setSearchResult] = useState(null)
    const [searchQuery, setSearchQuery] = useState('')
    let watchlist = []

    useEffect(() => {
        async function fetchWatchlist(){
            watchlist = await getWatchlist()
        }
        fetchWatchlist()
    })

    const handleSearchChanged = async (input) => {
        setSearchQuery(input)
        if(input.length > 2){
            try {
                var searchResults = await fetchSearchResults(input)
                setSearchResult({ ...searchResults, isWatching: isWatching(searchResults.id)})
          
            } catch (error) {

            }
        }else{
            setSearchResult(null)
        }
    }
    const fetchSearchResults = async (input) => {
        const apiUrl = 'https://api.tvmaze.com/singlesearch/shows?q='+input+'&embed=nextepisode';
        const result = await fetch(apiUrl);
        const data = await result.json();
        return data;
    }
    const isWatching = (id) => {
        return watchlist.includes(id)
    }
    return (
        <View style={styles.container}>
            <TextInput
                style={ styles.input }
                onChangeText={ text => handleSearchChanged(text)}
                value={searchQuery}
                placeholder='Ieškok serialo...'
            />
            {
                searchResult ?
                <Show show={searchResult} updateWatchlist={updateWatchlist} getWatchlist={getWatchlist}/> :
                <View></View>
            }
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 2,
        width: '100%'        
    },
    input: {
        borderRadius: 10,
        width: '100%',
        height: 40,
        borderWidth: 1,
        backgroundColor: '#ffffff',
        textAlign: 'center'
    }
});
export default Search
