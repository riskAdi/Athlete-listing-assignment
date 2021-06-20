import * as React from 'react';
import { View, ActivityIndicator, TouchableHighlight} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {Image,Avatar,ListItem,Text} from 'react-native-elements';
import config from '../config.json';


const CarouselSlider = ({data, navigation}) => {
  const {results, year,} = data  
  const renderItem = ({item, index}) => {
    const {athlete_id, name, surname} = item
    return ( 
        <View style={{flex: 1}}>
             <TouchableHighlight onPress={() => navigation.navigate('Profile',{data:{athlete_id,year}})}>
          <Image
            source={{uri: `${config.server}athletes/${athlete_id}`}}
            style={{width: 200, height: 130}}
            PlaceholderContent={<ActivityIndicator />}
          />
           </TouchableHighlight>
        </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <ListItem  bottomDivider>
        <ListItem.Content left={true}>
            <ListItem.Title>{year}</ListItem.Title>
        </ListItem.Content>
        <ListItem.Content right={true} >
            <Text>  </Text>
        </ListItem.Content>
        </ListItem>
      <Carousel
        data={results}
        firstItem={results.length > 1 ? 1 : 0}
        renderItem={renderItem}
        sliderWidth={420}
        itemWidth={200}
      />
    </View>
  );
};

export default CarouselSlider;
