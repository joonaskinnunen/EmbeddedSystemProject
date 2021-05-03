import * as React from 'react'
import { View, Text, ActivityIndicator, SafeAreaView, ScrollView, Pressable } from 'react-native'
import AppContext from '../Components/AppContext'
import { LineChart } from "react-native-chart-kit"
import { Dimensions } from "react-native"
import { Title } from 'react-native-paper'
import FlashMessage, {showMessage} from 'react-native-flash-message'
import CombinedLineChart from './CombinedLineChart'

const TemperatureScreen = () => {
  const values = React.useContext(AppContext)
  const data = values.data
  const dateNow = new Date()

  let temperatures = []
  const labels = []
  const datasets = [{
    data: []
  },
  { data: [] }]

  const hourlyLabels = []
  const hourlyDatasets = [{
    data: []
  }]

  let min = 99
  let max = -50
  for (let j = 0; j < 10; j++) {
    for (let i = 0; i < data.length; i++) {
      const date = new Date(data[i].time)
      if (date.getUTCDate() == dateNow.getDate() && date.getMonth() == dateNow.getMonth() && date.getFullYear() == dateNow.getFullYear()) {
        if (data[i].temperature < min) min = data[i].temperature
        if (data[i].temperature > max) max = data[i].temperature
      }
    }
    const subArr = [dateNow.getDate() + "." + (dateNow.getMonth() + 1), min, max]
    temperatures.push(subArr)
    min = 99
    max = -50
    dateNow.setDate(dateNow.getDate() - 1)
  }
  // console.log(temperatures)
  temperatures = temperatures.filter(x => x[1] < 50)

  for (let i = 0; i < temperatures.length; i++) {
    labels.unshift(temperatures[i][0])
    datasets[0].data.unshift(temperatures[i][1])
    datasets[1].data.unshift(temperatures[i][2])
  }

  // Viimeisen 24 tunnin mittaukset. Ei ota huomioon aikaa, jolloin "sääasema" on ollut pois päältä
  const [hourlyTemperature, setHourlyTemperature] = React.useState([])
  const getHourlyTemperature = () => {
    if (data.length > 0) {
      let count = 0
      let total = 0
      let hourlyTemperatures = []
      let previous = new Date(data[data.length - 1].time)
  
      for (let i = data.length - 1; hourlyTemperatures.length < 24; i--) {
        const current = new Date(data[i].time)

        if (current.getDate() == previous.getDate() && current.getHours() == previous.getHours()) {
          if (data[i].temperature > 100 || data[i].temperature == NaN) { continue } 
          else { total += data[i].temperature }
          // total += data[i].temperature
          count++
        } else {
          const tmpArr = [previous, total / (count > 0 ? count : 1)]
          hourlyTemperatures.push(tmpArr)
          previous = current
          count = 0
          total = 0
        }
      }
      setHourlyTemperature(hourlyTemperatures)
    }

  }
  React.useEffect(getHourlyTemperature, [data])

  for (let i = 0; i < hourlyTemperature.length; i++) {
    i % 4 == 0 || i == 0 || i == 23 ? hourlyLabels.unshift(hourlyTemperature[i][0].getUTCHours() + ":00") : hourlyLabels.unshift("")
    hourlyDatasets[0].data.unshift(hourlyTemperature[i][1])
  }

  if (hourlyTemperature.length == 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="#00ff00"/>
      </View>

    )
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <View style={{ flex: 1, alignItems: 'center', marginVertical: 20 }}>
          <Title style={{ marginBottom: 30 }}>Lämpötila °C</Title>
          <Text>10 päivän ylin ja alin lämpötila</Text>
          <LineChart
            data={{
              labels,
              datasets
            }}
            width={Dimensions.get("window").width > 500 ? Dimensions.get("window").width * 0.8 : Dimensions.get("window").width * 0.95}
            height={220}
            segments={10}
            yAxisSuffix="°C"
            yAxisInterval={1}
            fromZero={true}
            onDataPointClick={({ value, getColor }) =>
              showMessage({
                message: `${value}`,
                description: "You selected this value",
                backgroundColor: getColor(0.9)
              })
            }
            chartConfig={{
              backgroundGradientFrom: "#ffff",
              backgroundGradientTo: "#c0f2ea",
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#ffa726"
              }
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16
            }}
          />
          <FlashMessage position='center' />
          <Text style={{ marginTop: 30, textAlign: 'center' }}>Keskimääräinen lämpötila tuntitasolla (viimeiset 24 mittaustuntia)</Text>
          <LineChart
            data={{
              labels: hourlyLabels,
              datasets: hourlyDatasets
            }}
            width={Dimensions.get("window").width > 500 ? Dimensions.get("window").width * 0.8 : Dimensions.get("window").width * 0.95}
            height={220}
            segments={10}
            yAxisSuffix="°C"
            yAxisInterval={1}
            fromZero={true}
            chartConfig={{
              backgroundColor: "#e9f5f3",
              backgroundGradientFrom: "#ffff",
              backgroundGradientTo: "#c0f2ea",
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#ffa726"
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', margin: "2%" }}>
        <Text>Suhteutettu lämpötila ja aktiivisuus viimeisen 24 tunnin mittausdatasta</Text>
      {data.length > 0 && <CombinedLineChart data={hourlyDatasets[0].data} legend="Lämpötila" unit="°C" />}
      </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default TemperatureScreen