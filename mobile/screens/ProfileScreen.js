
import * as React from 'react';
import { useState, useEffect } from 'react';
import { sendRequest } from '../utils/request';
import { View, SafeAreaView, ScrollView, StyleSheet, useWindowDimensions } from 'react-native';
import config from '../config.json';
import { ListItem, Badge, Tile, Divider, Text} from 'react-native-elements';

const ProfileScreen = ({ navigation, route }) => {

    const {params:{data:{athlete_id,year}}} = route
    const [athlete, setAthlete] = useState({});
    const [history, setHistory] = useState([]);
    useEffect(() =>  {
        const options = {url:`athletes/detail/${athlete_id}/${year}`,method:'GET'};
        sendRequest(options)
        .then(response => {
            const {data} = response
            const athleteObj = data[0];
            setAthlete(athleteObj)
            
        }).catch( error => { console.log(error)  });

        const optionsHistory = {url:`athletes/history/${athlete_id}`,method:'GET'};
        sendRequest(optionsHistory)
        .then(response => {
            const {data} = response
            setHistory(data)
            
        }).catch( error => { console.log(error)  });

    },[]);

    return (
        <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
        <View>     
            <Tile
                imageSrc={source={uri: `${config.server}athletes/${athlete_id}`}}
                title={`${athlete.surname} ${athlete.name}`}
                contentContainerStyle={{ height: 70 }}
                >
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{  flexDirection: 'row' }}>
                    <Text> G </Text><Badge badgeStyle={{backgroundColor:'#ffce00'}} status="success" value={athlete.gold}/>
                    <Text> S </Text><Badge badgeStyle={{backgroundColor:'#d8d8d8'}} status="success" value={athlete.silver}/>
                    <Text> B </Text><Badge badgeStyle={{backgroundColor:'#cc8251'}} status="success" value={athlete.bronze}/>
                </View>
                    <Text>{athlete.year}</Text>
                </View>
                
            </Tile>
            <ListItem  bottomDivider>
                <ListItem.Content left={true}>
                <ListItem.Title>Year of Birth</ListItem.Title>
                </ListItem.Content>
                <ListItem.Content right={true} >
                <ListItem.Title>{athlete.date_of_birth}</ListItem.Title>
                </ListItem.Content>
            </ListItem>
            <ListItem  bottomDivider>
                <ListItem.Content left={true}>
                <ListItem.Title>Height</ListItem.Title>
                </ListItem.Content>
                <ListItem.Content right={true} >
                <ListItem.Title>{athlete.height}</ListItem.Title>
                </ListItem.Content>
                </ListItem>
            <ListItem  bottomDivider>
            <ListItem.Content left={true}>
            <ListItem.Title>Weight</ListItem.Title>
            </ListItem.Content>
            <ListItem.Content right={true} >
            <ListItem.Title>{athlete.weight}</ListItem.Title>
            </ListItem.Content>
            </ListItem>
            <Text h4></Text>
            {
                history && history.map((u, i) => {
                    return (
                        <ListItem key={i}  bottomDivider>
                            <ListItem.Content left={true}>
                                <ListItem.Title>{u.year}, {u.city}</ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Content right={true} style={{flexDirection:'row'}}>
                                <Text> G </Text><Badge badgeStyle={{backgroundColor:'#ffce00'}} status="success"   value={u.gold}/>
                                <Text> S </Text><Badge badgeStyle={{backgroundColor:'#d8d8d8'}} status="success" value={u.silver}/>
                                <Text> B </Text><Badge badgeStyle={{backgroundColor:'#cc8251'}} status="success" value={u.bronze}/>
                            </ListItem.Content>
                        </ListItem>
                    )
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

  export default ProfileScreen