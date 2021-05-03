import * as React from 'react'
import { View, Text, ActivityIndicator, ScrollView, SafeAreaView } from 'react-native'
import { Title } from 'react-native-paper'
import AppContext from '../Components/AppContext'
import { LineChart } from "react-native-chart-kit"
import { Dimensions } from "react-native"
import CombinedLineChart from "./CombinedLineChart"


const MoistureScreen = () => {
  const values = React.useContext(AppContext)
  const data = values.data
  const dateNow = new Date()

  let humiditys = []
  const labels = []
  const datasets = [{
    data: []
  },
  { data: [] }]

  const hourlyLabels = []
  const hourlyDatasets = [{
    data: []
  }]

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
  // console.log(humiditys)
  humiditys = humiditys.filter(x => x[1] < 101)

  for (let i = 0; i < humiditys.length; i++) {
    labels.unshift(humiditys[i][0])
    datasets[0].data.unshift(humiditys[i][1])
    datasets[1].data.unshift(humiditys[i][2])
  }

  // Viimeisen 24 tunnin mittaukset. Ei ota huomioon aikaa, jolloin "sääasema" on ollut pois päältä
  const [hourlyHumidity, setHourlyHumidity] = React.useState([])
  const getHourlyHumidity = () => {

    if (data.length > 0) {
      let count = 0
      let total = 0
      let hourlyHumidities = []
      let previous = new Date(data[data.length - 1].time)
  
      for (let i = data.length - 1; hourlyHumidities.length < 24; i--) {
        const current = new Date(data[i].time)
  
        if (current.getDate() == previous.getDate() && current.getHours() == previous.getHours()) {
          total += data[i].humidity
          count++
        } else {
          const tmpArr = [previous, total / count]
          // console.log("total: ", total, "count: ", count)
          hourlyHumidities.push(tmpArr)
          previous = current
          count = 0
          total = 0
        }
      }
      setHourlyHumidity(hourlyHumidities)
    }

  }
  React.useEffect(getHourlyHumidity, [data])

  for (let i = 0; i < hourlyHumidity.length; i++) {
    i % 4 == 0 || i == 0 || i == 23 ? hourlyLabels.unshift(hourlyHumidity[i][0].getUTCHours() + ":00") : hourlyLabels.unshift("")
    hourlyDatasets[0].data.unshift(hourlyHumidity[i][1])
  }

  if (hourlyHumidity.length == 0) {
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
          <Title style={{ marginBottom: 30 }}>Ilmankosteus %</Title>
          <Text>Suhteellinen ilmankosteus. 10 päivän ylin ja alin ilmankosteus %</Text>
          <LineChart
            data={{
              labels,
              datasets
            }}
            width={Dimensions.get("window").width > 500 ? Dimensions.get("window").width * 0.8 : Dimensions.get("window").width * 0.95}
            height={220}
            segments={10}
            yAxisSuffix="%"
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
              }
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16
            }}
          />
          <Text style={{marginTop: 30, textAlign: 'center'}}>Keskimääräinen ilmankosteus tuntitasolla (viimeiset 24 mittaustuntia)</Text>
          <LineChart
            data={{
              labels: hourlyLabels,
              datasets: hourlyDatasets
            }}
            width={Dimensions.get("window").width > 500 ? Dimensions.get("window").width * 0.8 : Dimensions.get("window").width * 0.95}
            height={220}
            segments={10}
            yAxisSuffix="%"
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
        </View>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', margin: "2%" }}>
          <Text>Suhteutettu ilmankosteus ja aktiivisuus viimeisen 24 tunnin mittausdatasta</Text>
          {data.length > 0 && <CombinedLineChart data={hourlyDatasets[0].data} legend="Ilmankosteus" unit="%" />}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default MoistureScreen