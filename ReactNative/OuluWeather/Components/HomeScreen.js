import * as React from 'react'
import { View, Text, StyleSheet, ActivityIndicator, Platform, SafeAreaView, Pressable, Dimensions, PixelRatio } from 'react-native'
import AppContext from './AppContext'
import { Title } from 'react-native-paper'
import { Ionicons } from '@expo/vector-icons'
import { ScrollView } from 'react-native-gesture-handler'
import CombinedLineChart from './CombinedLineChart'

const HomeScreen = ({ navigation }) => {

  const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT
  } = Dimensions.get("window")

  // const scale = ( SCREEN_WIDTH * SCREEN_HEIGHT ) / ( 1280 * 800 )
  const scale = 1

  const adjustSize = (size) => {
    const newSize = size * scale
    if (Platform.OS === 'android') {
      return Math.round(PixelRatio.roundToNearestPixel(newSize))
    } else if ( Platform.OS === 'ios' ){
      return Math.round(PixelRatio.roundToNearestPixel(newSize))
    } else {
      return size
      // return Math.round(PixelRatio.roundToNearestPixel(newSize))
    }
  }

  const styles = StyleSheet.create({
    container: {
      width: (350),
      height: (150),
      margin: 2,
      // ...Platform.select({
      //   ios: {
      //     height: 154
      //   }
      // })
    },
    tableCell: {
      justifyContent: "center",
      alignItems: "center",
      padding: 5,
      width: (175),
      height: (150),
      borderWidth: 1,
      borderRadius: 20,
      borderColor: "#4cdbc4",
      margin: 2,
      backgroundColor: '#f2f2f2',
      shadowColor: '#000',
      shadowRadius: 5,
      shadowOffset: { width: 1, height: 3 },
      shadowOpacity: 2,
      ...Platform.select({
        android: {
          elevation: 10,
        },
        ios: {
          margin: 3
        },
        default: {
          cursor: 'pointer'
        }
      })
    }
  })
  const values = React.useContext(AppContext)
  const data = values.data
  //const getValue = param => data.length > 0 ? data[data.length - 1].options[param] : 'Loading...'
  const dateNow = data.length > 0 ? new Date(data[data.length - 1].time) : new Date()
  dateNow.setHours(dateNow.getHours() - 3)

  return (
    <ScrollView>
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', margin: "2%" }}>
      <Title>Sää Oulussa</Title>
      <Text>{dateNow.toLocaleString()}</Text>
      <Text style={{marginBottom: "5%", marginTop: "5%"}}>Tämä sovellus näyttää Oulun keskustan lämpötilan, ilmankosteuden ja valon määrän.{"\n"}
        Voit katsoa tietoja reaaliajassa tai tarkastella historiallista dataa..</Text>
      <View style={[styles.container, {
        flexDirection: "row",
      }]}>
        <Pressable style={styles.tableCell} onPress={() => navigation.navigate('Temperature')}>
          <Text style={{fontSize: (50), fontWeight: 'bold'}}><Ionicons name='thermometer-outline' color='red' size={40} />{data.length > 0 ? data[data.length - 1].temperature > 0 ? '+' + parseFloat(data[data.length - 1].temperature).toFixed(1).toString() :  '-' + parseFloat(data[data.length - 1].temperature).toFixed(1).toString() : <ActivityIndicator size="large" color="#00ff00" />}</Text>
        </Pressable>
        <Pressable style={styles.tableCell} onPress={() => navigation.navigate('Moisture')}>
          <Text style={{fontSize: (35)}}><Ionicons name='water' color='#29aae1' size={40} />{data.length > 0 ? parseInt(data[data.length - 1].humidity) + "%" : <ActivityIndicator size="large" color="#00ff00" />}</Text>
        </Pressable>
      </View>
      <View style={[styles.container, {
        flexDirection: "row"
      }]}>
        <Pressable style={styles.tableCell} onPress={() => navigation.navigate('Lightness')}>
          <Text style={{fontSize: (35)}}><Ionicons name='sunny' color='yellow' size={40} />{data.length > 0 ? parseInt(data[data.length - 1].lightness) + "lx" : <ActivityIndicator size="large" color="#00ff00" />}</Text>
        </Pressable>
        <Pressable style={styles.tableCell} onPress={() => navigation.navigate('Activity')}>
          <Text style={{fontSize: (35)}}><Ionicons name='walk-outline' color='#000000' size={40} />{data.length > 0 ? parseInt(data[data.length - 1].activity) : <ActivityIndicator size="large" color="#00ff00" />}</Text>
        </Pressable>
      </View>
    </View>
    </ScrollView>
  )
}

export default HomeScreen