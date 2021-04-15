import * as React from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import { Title } from 'react-native-paper'
import AppContext from '../Components/AppContext'
import { LineChart } from "react-native-chart-kit"
import { Dimensions } from "react-native"

const LightnessScreen = () => {
  const data = React.useContext(AppContext)
  const dateNow = new Date()

  let lightnesses = []
  const labels = []
  const datasets = [{
    data: []
  },
  { data: [] }]

  const hourlyLabels = []
  const hourlyDatasets = [{
    data: []
  }]

  let min = 1500
  let max = 0
  for (let j = 0; j < 10; j++) {
    for (let i = 0; i < data.length; i++) {
      const date = new Date(data[i].time)
      if (date.getUTCDate() == dateNow.getDate() && date.getMonth() == dateNow.getMonth() && date.getFullYear() == dateNow.getFullYear()) {
        if (data[i].lightness < min) min = data[i].lightness
        if (data[i].lightness > max) max = data[i].lightness
      }
    }
    const subArr = [dateNow.getDate() + "." + (dateNow.getMonth() + 1), min, max]
    lightnesses.push(subArr)
    min = 101
    max = 0
    dateNow.setDate(dateNow.getDate() - 1)
  }
  // console.log(lightnesses)
  lightnesses = lightnesses.filter(x => x[1] < 1500)

  for (let i = 0; i < lightnesses.length; i++) {
    labels.unshift(lightnesses[i][0])
    datasets[0].data.unshift(lightnesses[i][1])
    datasets[1].data.unshift(lightnesses[i][2])
  }

  // Viimeisen 24 tunnin mittaukset. Ei ota huomioon aikaa, jolloin "sääasema" on ollut pois päältä
  const [hourlyLightness, setHourlyLightness] = React.useState([])
  const getHourlyLightness = () => {

    let count = 0
    let total = 0
    let hourlyLightnesses = []
    let previous = new Date(data[data.length - 1].time)

    for (let i = data.length - 1; hourlyLightnesses.length < 24; i--) {
      const current = new Date(data[i].time)

      if (current.getDate() == previous.getDate() && current.getHours() == previous.getHours()) {
        total += data[i].lightness
        count++
      } else {
        const tmpArr = [previous, total / count]
        hourlyLightnesses.push(tmpArr)
        previous = current
        count = 0
        total = 0
      }
    }
    setHourlyLightness(hourlyLightnesses)
  }
  React.useEffect(getHourlyLightness, [data])

  for (let i = 0; i < hourlyLightness.length; i++) {
    i % 4 == 0 || i == 0 || i == 23 ? hourlyLabels.unshift(hourlyLightness[i][0].getUTCDate() + "." + (hourlyLightness[i][0].getMonth() + 1) + ". " + hourlyLightness[i][0].getUTCHours() + ":00") : hourlyLabels.unshift("")
    hourlyDatasets[0].data.unshift(hourlyLightness[i][1])
  }

  if (hourlyLightness.length == 0) {
    return (
      <View style={{ flex: 1 }}>
        <ActivityIndicator />
      </View>

    )
  }


  return (
    <View style={{ flex: 1, alignItems: 'center', marginVertical: 50 }}>
      <Title style={{ marginBottom: 50 }}>Valon määrä</Title>
      <Text>10 päivän ylin ja alin valon määrä (luxia)</Text>
      <LineChart
        data={{
          labels,
          datasets
        }}
        width={Dimensions.get("window").width > 500 ? Dimensions.get("window").width * 0.8 : Dimensions.get("window").width * 0.95}
        height={220}
        segments={5}
        yAxisSuffix="lx"
        yAxisInterval={1}
        chartConfig={{
          backgroundColor: "#e9f5f3",
          backgroundGradientFrom: "#e9f5f3",
          backgroundGradientTo: "#bcf7f4",
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
      <Text>Keskimääräinen valon määrä tuntitasolla (viimeiset 24 mittaustuntia)</Text>
      <LineChart
        data={{
          labels: hourlyLabels,
          datasets: hourlyDatasets
        }}
        width={Dimensions.get("window").width > 500 ? Dimensions.get("window").width * 0.8 : Dimensions.get("window").width * 0.95}
        height={220}
        segments={5}
        yAxisSuffix="lx"
        yAxisInterval={1}
        chartConfig={{
          backgroundColor: "#e9f5f3",
          backgroundGradientFrom: "#e9f5f3",
          backgroundGradientTo: "#bcf7f4",
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
    </View>
  )
}

export default LightnessScreen