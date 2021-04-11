import * as React from 'react'
import { View, Text, Button } from 'react-native'
import AppContext from './AppContext'

const HomeScreen = ({navigation}) => {
  const data = React.useContext(AppContext)
  //const getValue = param => data.length > 0 ? data[data.length - 1].options[param] : 'Loading...'
  
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', margin: "10%" }}>
        <Text h1>Sää Oulussa</Text>
        <Text>Tervetuloa!</Text>
        <Text>Tämä sovellus näyttää Oulun keskustan lämpötilan, ilmankosteuden ja valon määrän.{"\n"}
        Voit katsoa tietoja reaaliajassa tai tarkastella historiallista dataa..</Text>
        <Text>Lämpötila: {data.length > 0 ? data[data.length - 1].temperature : 'Loading...'}°C</Text>
        <Text>Ilmankosteus: {data.length > 0 ? data[data.length - 1].humidity : 'Loading...'}%</Text>
        <Text>Valon määrä: 20%</Text>
      </View>
    )
  }

  export default HomeScreen