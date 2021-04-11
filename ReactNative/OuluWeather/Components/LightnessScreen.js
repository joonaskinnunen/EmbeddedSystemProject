import * as React from 'react'
import { View, Text, Button } from 'react-native'
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
  console.log(lightnesses)
  lightnesses = lightnesses.filter(x => x[1] < 1500)

  for (let i = 0; i < lightnesses.length; i++) {
    labels.push(lightnesses[i][0])
    datasets[0].data.push(lightnesses[i][1])
    datasets[1].data.push(lightnesses[i][2])
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>10 päivän ylin ja alin ilmankosteus valon määrä</Text>
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
          decimalPlaces: 2,
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
    </View>
  )
  }

  export default LightnessScreen