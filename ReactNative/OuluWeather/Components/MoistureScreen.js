import * as React from 'react'
import { View, Text, Button } from 'react-native'
import AppContext from '../Components/AppContext'
import { LineChart } from "react-native-chart-kit"
import { Dimensions } from "react-native"

const MoistureScreen = () => {
  const data = React.useContext(AppContext)
  const dateNow = new Date()

  let humiditys = []
  const labels = []
  const datasets = [{
    data: []
  },
  { data: [] }]

  let min = 101
  let max = 0
  for (let j = 0; j < 10; j++) {
    for (let i = 0; i < data.length; i++) {
      const date = new Date(data[i].time)
      if (date.getUTCDate() == dateNow.getDate() && date.getMonth() == dateNow.getMonth() && date.getFullYear() == dateNow.getFullYear()) {
        if (data[i].humidity < min) min = data[i].humidity
        if (data[i].humidity > max) max = data[i].humidity
      }
    }
    const subArr = [dateNow.getDate() + "." + (dateNow.getMonth() + 1), min, max]
    humiditys.push(subArr)
    min = 101
    max = 0
    dateNow.setDate(dateNow.getDate() - 1)
  }
  console.log(humiditys)
  humiditys = humiditys.filter(x => x[1] < 101)

  for (let i = 0; i < humiditys.length; i++) {
    labels.push(humiditys[i][0])
    datasets[0].data.push(humiditys[i][1])
    datasets[1].data.push(humiditys[i][2])
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Suhteellinen ilmankosteus. 10 päivän ylin ja alin ilmankosteus %</Text>
      <LineChart
        data={{
          labels,
          datasets
        }}
        width={Dimensions.get("window").width > 500 ? Dimensions.get("window").width * 0.8 : Dimensions.get("window").width * 0.95}
        height={220}
        segments={5}
        yAxisSuffix="%"
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

  export default MoistureScreen