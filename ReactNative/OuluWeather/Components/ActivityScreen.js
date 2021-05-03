import * as React from 'react'
import { View, Text, ActivityIndicator, SafeAreaView, ScrollView } from 'react-native'
import { Title } from 'react-native-paper'
import AppContext from '../Components/AppContext'
import { LineChart } from "react-native-chart-kit"
import { Dimensions } from "react-native"

const ActivityScreen = () => {
  const values = React.useContext(AppContext)
  const data = values.data
  const dateNow = new Date()

  let activitys = []
  const labels = []
  const datasets = [{
    data: []
  }]
  const hourlyLabels = []
  const hourlyDatasets = [{
    data: []
  }]

  let count = 0
  let countHourly = 0

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
  //   console.log(activitys)
  activitys = activitys.filter(x => x[1] > 0)

  for (let i = 0; i < activitys.length; i++) {
    labels.unshift(activitys[i][0])
    datasets[0].data.unshift(activitys[i][1])
  }

  // Viimeisen 24 tunnin mittaukset. Ei ota huomioon aikaa, jolloin "sääasema" on ollut pois päältä
  const [hourlyActivity, setHourlyActivity] = React.useState([[new Date(), 0]])
  const getHourlyActivity = () => {

    if (data.length > 0) {

      let hourlyActivitys = []
      let previous = new Date(data[data.length - 1].time)

      for (let i = data.length - 1; hourlyActivitys.length < 24; i--) {
        const current = new Date(data[i].time)

        if (current.getDate() == previous.getDate() && current.getHours() == previous.getHours()) {
          countHourly += data[i].activity
        } else {
          const tmpArr = [previous, countHourly]
          hourlyActivitys.push(tmpArr)
          countHourly = data[i].activity
          previous = current
        }
      }
      setHourlyActivity(hourlyActivitys)
    }
  }
  React.useEffect(getHourlyActivity, [data])

  let prevDate = hourlyActivity[0][0].getUTCDate()
  for (let i = 0; i < hourlyActivity.length; i++) {
    let date = hourlyActivity[i][0].getUTCDate()
    let month = hourlyActivity[i][0].getUTCMonth() + 1
    let hours = hourlyActivity[i][0].getUTCHours()
    if (i % 4 == 0 || i == 0 || i == 23) {
      // console.log(`i: ${i} hourlyActivity[i][0].getUTCDate(): ${hourlyActivity[i][0].getUTCDate()}`)
      if (i > 0 && date != prevDate) {
        hourlyLabels.unshift(`${date}.${month}. ${hours}:00`)
        prevDate = date
      } else {
        hourlyLabels.unshift(hours + ":00")
      }
    } else {
      hourlyLabels.unshift("")
    } 
    hourlyDatasets[0].data.unshift(hourlyActivity[i][1])
  }

  React.useEffect(() => {
    values.setActData({
      data: hourlyDatasets[0].data,
      labels: hourlyLabels})
  },[data])

  if (hourlyActivity.length < 24) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>

    )
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <View style={{ flex: 1, alignItems: 'center', marginVertical: 20 }}>
          <Title style={{ marginBottom: 30 }}>Ulkonaliikkumisaktiivisuus</Title>
          <Text>Ulkonaliikkumisaktiivisuus viimeisen 10 päivän ajalta</Text>
          <LineChart
            data={{
              labels,
              datasets
            }}
            width={Dimensions.get("window").width > 500 ? Dimensions.get("window").width * 0.8 : Dimensions.get("window").width * 0.95}
            height={Dimensions.get("window").height * 0.3}
            segments={10}
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
          <Text style={{ marginTop: 30, textAlign: 'center' }}>Ulkonaliikkumisaktiivisuus tuntitasolla (viimeiset 24 mittaustuntia)</Text>
          <LineChart
            data={{
              labels: hourlyLabels,
              datasets: hourlyDatasets
            }}
            width={Dimensions.get("window").width > 500 ? Dimensions.get("window").width * 0.8 : Dimensions.get("window").width * 0.95}
            height={Dimensions.get("window").height * 0.3}
            segments={10}
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
      </ScrollView>
    </SafeAreaView>
  )
}

export default ActivityScreen
