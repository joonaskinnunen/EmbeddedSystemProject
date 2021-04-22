import * as React from 'react'
import TabNavigation from './Navigation/TabNavigation'
import Favicon from 'react-favicon'

const App = () => {
  return (
    <>
      <Favicon url={'https://i.pinimg.com/originals/77/0b/80/770b805d5c99c7931366c2e84e88f251.png'} />
      <TabNavigation />
    </>
  )
}

export default App