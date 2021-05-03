import * as React from 'react'
import AppContext from '../Components/AppContext'
import { LineChart } from "react-native-chart-kit"
import { Dimensions, ActivityIndicator, View, Text } from "react-native"

const CombinedLineChart = (props) => {

    const values = React.useContext(AppContext)

    const labels = values.actData.labels
    
    const datasets = [
        { data: props.data,
          color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})` },
        { data: values.actData.data }
    ]
    // console.log(`labels: ${labels}\t dataset temp: ${datasets[0].data}\n dataset act: ${datasets[1].data}`)

    const mockData = [{
      labels: ['January', 'February', 'March', 'April', 'June', 'July'],
      datasets: [
        { data: [
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,] },
        { data: [
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,] }
      ]
    }]

    let minData = 99999
    let minAct = 99999
    let maxData = 0
    let maxAct = 1
    for (let i = 0; i < labels.length; i++) {
      let temp = (datasets[0].data[i])
      let act = (datasets[1].data[i])
      if (temp > maxData) maxData = datasets[0].data[i]
      if (act > maxAct) maxAct = datasets[1].data[i]
      if (temp < minData) minData = datasets[0].data[i]
      if (act < minAct) minAct = datasets[1].data[i]
    }
    // console.log(`maxData: ${maxData}, minData: ${minData}, maxAct: ${maxAct}, minAct: ${minAct}`)
    for (let i = 0; i < labels.length; i++) {
      datasets[0].data[i] = Math.round((datasets[0].data[i] - minData) / (maxData - minData) * 100)
      datasets[1].data[i] = Math.round(datasets[1].data[i] / (maxAct - minAct) * 100)
    }

    console.log(`labels length: ${labels.length}, datasets length: ${datasets[0].data.length} ${datasets[1].data.length}`)

    if (labels.length < 24 || datasets[0].data.length < 24 || datasets[1].data.length < 24) {
      return (
        <View style={{ flex: 1 }}>
          <ActivityIndicator size="large" color="#00ff00"/>
        </View>
  
      )
    }
    else {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'flex-start', margin: "2%"}}>
        <Text>Korkein {props.legend}: {` ${maxData.toFixed(1)} ${props.unit}`}, matalin: {` ${minData.toFixed(1)} ${props.unit}`}</Text>
        <LineChart
        data={{
          labels: labels,
          datasets: datasets,
          legend: [props.legend,"Aktiivisuus"]
        }}
        // data={{mockData}}
        width={Dimensions.get("window").width > 500 ? Dimensions.get("window").width * 0.8 : Dimensions.get("window").width * 0.95}
        height={220}
        withInnerLines={false}
        withOuterLines={false}
        yAxisInterval={1}
        fromZero={true}
        withHorizontalLabels={false}
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
    )
  }
 }

export default CombinedLineChart