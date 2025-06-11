import { router } from 'expo-router'
import React from 'react'
import { Button, Text, View } from 'react-native'

const index = () => {
  return (
    <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
      <Text>index</Text>
      <Button
        title='GO TO PAGE' 
        onPress={()=>{
          router.push("/screens/videoShoot")
        }}
      />
    </View>
  )
}

export default index