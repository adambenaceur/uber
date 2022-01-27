// rnfe reactNativeFunctionalExportComponent
//Make sure to import any functions you're using from react-native 
import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native'; //SafeAreaView allows for text to be displayed outside of. 

import React from 'react';
import tw from 'twrnc';
import NavOptions from '../components/navOptions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from "@env";


const HomeScreen = () => {  //  src="../images/uber-logo.png"
  return (
    <SafeAreaView style={tw`bg-white h-full`}> 
      <View style={tw`p-5`}>
          <Image source={require("../assets/uber-logo.png")} style={{width: 100, height: 100, resizeMode: "contain"}} />
          <GooglePlacesAutocomplete 
            styles = {{
              cointainer: { 
                flex: 0,
              },
                textInput: {
                  fontSize:18,
                }
              }} 
              placeholder = "Where from?" 
              nearbyPlacesAPI="GooglePlacesSearch" 
              debounce={400} 
          />

          <NavOptions/>
      </View>
    </SafeAreaView> // replace View with SafeAreaView for effect
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
    text: {
        color: 'blue'
    }
});
