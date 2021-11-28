import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import React, { useState } from 'react'
import { Text, StyleSheet, View, TextInput, TouchableOpacity, Alert, Button } from 'react-native'

const Login = () =>  {
    const [nohp, setNohp] = useState('')
    const navigation = useNavigation()

    const login = async () => {
        if(!nohp) return Alert.alert('Error', 'No hp tidak boleh kosong')
        try {
            await axios.post('http://192.168.100.19:5000/login', {
                nohp:nohp
            })
            navigation.navigate('Verify', {nohp:nohp})
        } catch (error) {
            Alert.alert('Error', error.response.data.msg)
        }
    }
  return (
    <View style={styles.container}>
        <View style={styles.isi}>
          <View style={styles.wrapperInput}>
            <Text style={styles.text}> NoHandphone : </Text>
            <TextInput
              style={styles.textInput}
              keyboardType='phone-pad'
              placeholder="0823123456789"
              value={nohp}
              onChangeText={e => setNohp(e)}
            />
          </View>
          <View style={styles.button}>
              <Button title="LOGIN" onPress={login} />
          </View>
          {/* <TouchableOpacity style={styles.button}>
            <Text style={styles.textButton} onPress={login}>LOGIN</Text>
          </TouchableOpacity> */}
        </View>
      </View>
  );
}

export default Login;

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