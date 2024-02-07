import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import Frame from '../components/Frame';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system'
import { FontAwesome5 } from '@expo/vector-icons';

const UploadAndConvert = ({route,navigation}) => {
    const {convertType} = route.params;
    const[fileUri , setFileUri] = useState('') ;
    const handleUpload = async() =>{
        try {
            const result = await DocumentPicker.getDocumentAsync({});
            const splitUri = result.assets[0].uri.split('.');
            const fileType = splitUri[splitUri.length - 1];
            console.log(fileType);
            if(fileType !== convertType.split('-')[0]){
                Alert.alert('Error' , `Upload the .${convertType.split('-')[0]} files only!`)
            }
            else if(!result.canceled){
                await uploadFile(result , fileType)
            }
        } catch (error) {
            console.error(error);
        }
        
    }
    const uploadFile = async(file , fileType) =>{
        let formData = new FormData();
        formData.append('document' , file.uri
        // {
        //     uri : file.uri,
        //     name: `converted.${fileType}`,
        //     type : `application/${fileType}`
        // }
        );
        try {
            const response = await fetch(`https://aefc-115-242-182-162.ngrok-free.app/conversion/pdf-to-docx/`,{
                method:'POST',
                body:formData
            });
            
            const blob = await response.blob();
            const filePath = `${FileSystem.documentDirectory}converted.docx`
            console.log(filePath)
            const reader = new FileReader();
             reader.onload = async () => {
            try {
                const base64 = reader.result.split(',')[1];
                await FileSystem.writeAsStringAsync(filePath, base64, { encoding: FileSystem.EncodingType.Base64 });
                console.log('File saved to', filePath);
                // Here, you can update the state to indicate the file is saved or to store the filePath
            } catch (e) {
            console.error('Error saving the file:', e);
        }
    };
    reader.onerror = (e) => {
      throw new Error('Could not read the blob: ' + e);
    };
    reader.readAsDataURL(blob);
            
        } catch (error) {
            console.error(error)
        }
    }
  return (
    <Frame>

        <View tw='w-[80vw] h-[20vh] border border-dashed border-white flex flex-col items-center justify-center'>
            <TouchableOpacity onPress={handleUpload} tw='bg-[#19C37D] px-4 py-2 rounded-md flex flex-row items-center justify-center'>
                <Text tw='font-semibold text-xl mr-2'>Upload</Text>
                <FontAwesome5 name="file-upload" size={24} color="black" />
            </TouchableOpacity>
            <Text tw='text-white' >Drop your .{convertType.split('-')[0]} file here</Text>
        </View>
      
    </Frame>
  )
}

export default UploadAndConvert