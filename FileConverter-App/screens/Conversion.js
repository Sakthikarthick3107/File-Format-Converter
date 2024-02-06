import React from 'react'
import Frame from '../components/Frame'
import { Text, TouchableOpacity } from 'react-native'

const Conversion = ({navigation}) => {
  return (
    <Frame>
      <TouchableOpacity onPress={()=>navigation.navigate('UploadAndConvert',{convertType:'pdf-to-docx'})} tw='flex w-full items-center justify-center h-[10vh] border border-white z-2 my-1 rounded-lg'>
        <Text tw='text-white text-3xl font-bold'>Pdf-to-Docx</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={()=>navigation.navigate('UploadAndConvert',{convertType:'docx-to-pdf'})} tw='flex w-full items-center justify-center h-[10vh] border border-white z-2 my-1 rounded-lg'>
        <Text tw='text-white text-3xl font-bold'>Docx-to-Pdf</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={()=>navigation.navigate('UploadAndConvert',{convertType:'png-to-jpg'})} tw='flex w-full items-center justify-center h-[10vh] border border-white z-2 my-1 rounded-lg'>
        <Text tw='text-white text-3xl font-bold'>Png-to-Jpg</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={()=>navigation.navigate('UploadAndConvert',{convertType:'jpg-to-png'})} tw='flex w-full items-center justify-center h-[10vh] border border-white z-2 my-1 rounded-lg'>
        <Text tw='text-white text-3xl font-bold'>Jpg-to-Png</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={()=>navigation.navigate('UploadAndConvert',{convertType:'xlsx-to-csv'})} tw='flex w-full items-center justify-center h-[10vh] border border-white z-2 my-1 rounded-lg'>
        <Text tw='text-white text-3xl font-bold'>Excel-to-Csv</Text>
      </TouchableOpacity>

    </Frame>
  )
}

export default Conversion