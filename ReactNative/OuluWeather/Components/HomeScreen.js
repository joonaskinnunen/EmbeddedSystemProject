import * as React from 'react'
import { View, Text, StyleSheet, ActivityIndicator, Platform, SafeAreaView, Pressable } from 'react-native'
import AppContext from './AppContext'
import { Title } from 'react-native-paper'
import { Ionicons } from '@expo/vector-icons'

const HomeScreen = ({ navigation }) => {

  const styles = StyleSheet.create({
    container: {
      width: 350,
      height: 150,
      margin: 2,
      ...Platform.select({
        ios: {
          height: 154
        }
      })
    },
    tableCell: {
      justifyContent: "center",
      alignItems: "center",
      padding: 5,
      width: 175,
      height: 150,
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

  const data = React.useContext(AppContext)
  //const getValue = param => data.length > 0 ? data[data.length - 1].options[param] : 'Loading...'
  const dateNow = data.length > 0 ? new Date(data[data.length - 1].time) : new Date()
  dateNow.setHours(dateNow.getHours() - 3)
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', margin: "2%" }}>
      <Title>Sää Oulussa</Title>
      <Text>{dateNow.toLocaleString()}</Text>
      <Text style={{marginBottom: 40, marginTop: 40}}>Tämä sovellus näyttää Oulun keskustan lämpötilan, ilmankosteuden ja valon määrän.{"\n"}
        Voit katsoa tietoja reaaliajassa tai tarkastella historiallista dataa..</Text>
      <View style={[styles.container, {
        flexDirection: "row",
      }]}>
        <Pressable style={styles.tableCell} onPress={() => navigation.navigate('Temperature')}>
          <Text style={{fontSize: 50, fontWeight: 'bold'}}><Ionicons name='thermometer-outline' color='red' size={40} />{data.length > 0 ? data[data.length - 1].temperature > 0 ? '+' + parseFloat(data[data.length - 1].temperature).toFixed(1).toString() :  '-' + parseFloat(data[data.length - 1].temperature).toFixed(1).toString() : <ActivityIndicator size="large" color="#00ff00" />}</Text>
        </Pressable>
        <Pressable style={styles.tableCell} onPress={() => navigation.navigate('Moisture')}>
          <Text style={{fontSize: 35}}><Ionicons name='water' color='#29aae1' size={40} />{data.length > 0 ? parseInt(data[data.length - 1].humidity) + "%" : <ActivityIndicator size="large" color="#00ff00" />}</Text>
        </Pressable>
      </View>
      <View style={[styles.container, {
        flexDirection: "row"
      }]}>
        <Pressable style={styles.tableCell} onPress={() => navigation.navigate('Lightness')}>
          <Text style={{fontSize: 35}}><Ionicons name='sunny' color='yellow' size={40} />{data.length > 0 ? parseInt(data[data.length - 1].lightness) + "lx" : <ActivityIndicator size="large" color="#00ff00" />}</Text>
        </Pressable>
        <Pressable style={styles.tableCell} onPress={() => navigation.navigate('Activity')}>
          <Text style={{fontSize: 35}}><Ionicons name='walk-outline' color='#000000' size={40} />{data.length > 0 ? parseInt(data[data.length - 1].activity) : <ActivityIndicator size="large" color="#00ff00" />}</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default HomeScreen