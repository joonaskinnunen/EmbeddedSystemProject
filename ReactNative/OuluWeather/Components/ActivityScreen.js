import * as React from 'react'
import { View, Text, Button } from 'react-native'
import AppContext from '../Components/AppContext'
import { LineChart } from "react-native-chart-kit"
import { Dimensions } from "react-native"

const ActivityScreen = () => {
  const data = React.useContext(AppContext)
  const dateNow = new Date()

  let activitys = []
  const labels = []
  const datasets = [{
    data: []
  }]
  let count = 0

  for (let j = 0; j < 10; j++) {
    for (let i = 0; i < data.length; i++) {
      const date = new Date(data[i].time)
      if (date.getUTCDate() == dateNow.getDate() && date.getMonth() == dateNow.getMonth() && date.getFullYear() == dateNow.getFullYear()) {
        count += data[i].activity
      }
    }
    const subArr = [dateNow.getDate() + "." + (dateNow.getMonth() + 1), count]
    activitys.push(subArr)
    dateNow.setDate(dateNow.getDate() - 1)
    count = 0
  }
  console.log(activitys)
  activitys = activitys.filter(x => x[1] > 0)

  for (let i = 0; i < activitys.length; i++) {
    labels.push(activitys[i][0])
    datasets[0].data.push(activitys[i][1])
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Ulkonaliikkumisaktiivisuus viimeisen 10 päivän ajalta</Text>
      <LineChart
        data={{
          labels,
          datasets
        }}
        width={Dimensions.get("window").width > 500 ? Dimensions.get("window").width * 0.8 : Dimensions.get("window").width * 0.95}
        height={220}
        segments={5}
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

  export default ActivityScreen
