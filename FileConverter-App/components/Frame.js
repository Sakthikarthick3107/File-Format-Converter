import {SafeAreaView, StatusBar } from 'react-native'
import React from 'react'

const Frame = ({children}) => {
  return (
    <SafeAreaView tw='flex-1 items-center justify-center bg-[#343541] p-4'>
        {children}
        <StatusBar barStyle={'default'}/>
    </SafeAreaView>
  )
}

export default Frame