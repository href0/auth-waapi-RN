import { useNavigation, useRoute } from '@react-navigation/core'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Text, StyleSheet, View, TextInput, TouchableOpacity, Alert } from 'react-native'

const Verify = () => {
    const [code, setCode] = useState('')
    const navigation = useNavigation()
    const route = useRoute()
    const  nohp  = route.params.nohp;
    const baseURL = 'https://auth-jwt-with-whatsapp-api.herokuapp.com'

    const verify = async () => {
        if(!code) return Alert.alert('Error', 'Invalid Code')
        try {
           const response = await axios.post(baseURL+'/verifyotp', {
                nohp:nohp,
                code:code
            })
            // console.log(response.data.accesToken)
            navigation.navigate('Dashboard')
        } catch (error) {
            Alert.alert('Error', error.response.data.msg)
        }
    }

  return (
    <View style={styles.container}>
        <View style={styles.isi}>
          <View style={styles.wrapperInput}>
            <Text style={styles.text}> Code OTP : {nohp} </Text>
            <TextInput
              style={styles.textInput}
              keyboardType='phone-pad'
              placeholder="123456"
              value={code}
              onChangeText={e => setCode(e)}
            />
          </View>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.textButton} onPress={verify}>Verify</Text>
          </TouchableOpacity>
        </View>
      </View>
  );
}

export default Verify;

const styles = StyleSheet.create({
  container:{
    padding:20
  },
  textInput:{
    borderWidth : 1,
    padding:10,
    borderColor:'grey',
    borderRadius:5,
    height:40
  },
  text:{
    fontWeight:'bold',
    color:'black'
  },
  wrapperInput:{
    marginTop:20
  },
  button:{
    marginTop:20,
    backgroundColor: 'skyblue',
    padding: 10,
    borderRadius: 5
  },
  textButton:{
    textAlign: 'center',
    fontWeight:'bold',
    color: 'white'
  },
  validasi:{
    color:'red'
  }
})