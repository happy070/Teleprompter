import { router } from 'expo-router'
import React from 'react'
import { Button, View } from 'react-native'

const index = () => {
  return (
    <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
      
      <Button
        title='GO TO Video Studio' 
        onPress={()=>{
          router.push("/screens/videoShoot")
        }}
      />
    </View>
  )
}

export default index