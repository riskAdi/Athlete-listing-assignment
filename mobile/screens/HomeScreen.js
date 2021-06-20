/* eslint-disable prettier/prettier */

import * as React from 'react';
import { useState, useEffect } from 'react';
import {  View, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import _ from 'lodash';
import {ListItem,Text} from 'react-native-elements';
import CarouselSlider from '../components/Carousel';
import { sendRequest } from '../utils/request';

const HomeScreen = ({ navigation }) => {
    const [list, setList] = useState([]);
    useEffect(() =>  {

        const options = {url:'athletes/',method:'GET'};
        sendRequest(options)
        .then(response => {
          const orderResp = _.orderBy(response.data, ['year'], ['desc'])
          setList(orderResp)
        }).catch( error => { console.log(error)  });

    },[]);

    return (
    <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
            <View style={{flex:1}}>
            {
                list && list.map((u, i) => {
                  if(u.results[0].athlete_id == null) {
                    return <ListItem key={i}  bottomDivider>
                    <ListItem.Content left={true}>
                        <ListItem.Title>{u.year}</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Content right={true} >
                        <Text>Empty.</Text>
                    </ListItem.Content>
                    </ListItem>
                  }else {
                    return (
                        <View key={i} style={{height:170}}><CarouselSlider data={u} navigation={navigation} /></View>
                    )
                  }
                })
            }
            </View>
        </ScrollView>
    </SafeAreaView>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollView: {
      marginHorizontal: 0,
    }
  });

  export default HomeScreen;
