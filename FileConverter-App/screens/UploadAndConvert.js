import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Frame from '../components/Frame';
import * as DocumentPicker from 'expo-document-picker';
import { FontAwesome5 } from '@expo/vector-icons';

const UploadAndConvert = ({route,navigation}) => {
    const {convertType} = route.params;
    const handleUpload = async() =>{
        let result = await DocumentPicker.getDocumentAsync({});
        console.log(result);
    }
  return (
    <Frame>

        <View tw='w-[80vw] h-[20vh] border border-dashed border-white flex flex-col items-center justify-center'>
            <TouchableOpacity onPress={handleUpload} tw='bg-[#19C37D] px-4 py-2 rounded-md flex flex-row items-center justify-center'>
                <Text tw='text-white text-xl mr-2'>Upload</Text>
                <FontAwesome5 name="file-upload" size={24} color="black" />
            </TouchableOpacity>
            <Text tw='text-white' >Drop your {convertType.split('-')[0]} file here</Text>
        </View>
      
    </Frame>
  )
}

export default UploadAndConvert