import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, FlatList ,  Image, Platform, StatusBar } from 'react-native'
import React, { useState } from 'react'
import tw from 'tailwind-react-native-classnames'
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { selectTravelTimeInformation } from '../slices/navSlice'

import 'intl';
import 'intl/locale-data/jsonp/en-US';

const data =[
  {
    id: "Uber-X-123",
    title: "Uber X",
    multiplier: 1,
    image: require("../assets/UberX.png"),
  },
  {
    id: "Uber-XL-456",
    title: "Uber XL",
    multiplier: 1.2,
    image: require("../assets/UberXL.png"),
  },
  {
    id: "Uber-LUX-789",
    title: "Uber LUX",
    multiplier: 1.75,
    image: require("../assets/UberLUX.png"),
  },

]

// if lots of demand. multiplier for price
const SURGE_CHARGE_RATE = 1.5;


const RideOptionsCard = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null); // , {paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0}
  const travelTimeInformation = useSelector(selectTravelTimeInformation);
  return (
    <SafeAreaView style={tw`bg-white flex-grow `}> 
      <View>
        <TouchableOpacity 
        onPress={() => navigation.navigate('NavigateCard')}
        style={tw`absolute top-3 left-5 z-50 p-3 rounded-full`}>
          <Icon name='chevron-left' type='fontawesome'/>
        </TouchableOpacity>
        <Text style={tw`text-center pt-5 text-xl`}>Select a Ride - {travelTimeInformation?.distance?.text}</Text>
      </View>
      
      <FlatList 
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({item: {id, title, multiplier, image}, item} ) => (

        <TouchableOpacity 
        onPress={() => setSelected(item)}
        style={tw`flex-row justify-between items-center px-10 ${id === selected?.id && 'bg-gray-200'}`}>
          <Image
            style={{
              width: 100,
              height: 100,
              resizeMode: "contain",
            }}
            source = {item.image}
          />
          <SafeAreaView style={tw`-ml-6`}>
            <Text style= {tw`text-xl font-semibold`}>{title}</Text>
            <Text>{travelTimeInformation?.duration?.text} Travel Time</Text>
            
          </SafeAreaView>
          <Text style={tw`text-xl`}>{new Intl.NumberFormat('en-us', {
            style: 'currency',
            currency: 'USD',
          }).format(
            (travelTimeInformation?.duration.value * SURGE_CHARGE_RATE * multiplier) / 100
          )}</Text>
        </TouchableOpacity>
      ) }
      />
      <SafeAreaView style={tw`mt-auto border-t border-gray-200`}>
        <TouchableOpacity 
        disabled={!selected} 
        style={tw`bg-black py-0.5 m-2 ${!selected && `bg-gray-300` }`}
        >
          <Text style={tw`text-center text-white text-xl`}> Choose {selected?.title}</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaView>
  )
}

export default RideOptionsCard

const styles = StyleSheet.create({})