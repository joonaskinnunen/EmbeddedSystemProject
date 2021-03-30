import * as React from 'react'
import { View, Text, Button } from 'react-native'

const HomeScreen = ({navigation}) => {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', margin: "10%" }}>
        <Text h1>Sää Oulussa</Text>
        <Text>Tervetuloa!</Text>
        <Text>Tämä sovellus näyttää Oulun keskustan lämpötilan, ilmankosteuden ja valon määrän.{"\n"}
        Voit katsoa tietoja reaaliajassa tai tarkastella historiallista dataa..</Text>
        <Text>Lämpötila: 22°C</Text>
        <Text>Ilmankosteus: 10%</Text>
        <Text>Valon määrä: 20%</Text>
      </View>
    )
  }

  export default HomeScreen