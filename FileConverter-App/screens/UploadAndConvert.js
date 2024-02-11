import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import Frame from '../components/Frame';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system'
import { FontAwesome5 } from '@expo/vector-icons';
import axios from 'axios';

const UploadAndConvert = ({route,navigation}) => {
    const {convertType} = route.params;
    const[fileUri , setFileUri] = useState('') ;

    const pickDocument = async() =>{
        
        let result = await DocumentPicker.getDocumentAsync({});
        if(!result.canceled && result.assets && result.assets.length > 0){
            const pickedFile = result.assets[0];
            //console.log(pickedFile.uri);
            uploadDocument(pickedFile);
        }
    }

    const uploadDocument = async(document) => {
        const{uri , name , mimeType} = document;
        let formData = new FormData();
        formData.append('document' ,
        {
            uri : uri,
            name : name,
            type : mimeType
        }
        );
        try {
            const response = await axios({
                method :'post',
                url : 'https://963d-2409-40f4-39-9b0f-28f4-5992-46ce-7539.ngrok-free.app/conversion/pdf-to-docx/',
                data : formData,
                headers:{
                    'Content-Type' :'multipart/form-data'
                }
            });
            console.log(response)
            
        } catch (error) {
            console.error(error)
        }
    }
    
  return (
    <Frame>

        <View tw='w-[80vw] h-[20vh] border border-dashed border-white flex flex-col items-center justify-center'>
            <TouchableOpacity onPress={pickDocument} tw='bg-[#19C37D] px-4 py-2 rounded-md flex flex-row items-center justify-center'>
                <Text tw='font-semibold text-xl mr-2'>Upload</Text>
                <FontAwesome5 name="file-upload" size={24} color="black" />
            </TouchableOpacity>
            <Text tw='text-white' >Drop your .{convertType.split('-')[0]} file here</Text>
        </View>
      
    </Frame>
  )
}

export default UploadAndConvert