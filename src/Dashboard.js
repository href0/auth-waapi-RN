import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import jwtDecode from 'jwt-decode'
import { useNavigation, useFocusEffect } from '@react-navigation/native'

const Dashboard = () => {
    const [token, setToken] = useState('')
    const [name, setName] = useState('')
    const [expired, setExpired] = useState('')
    const navigation = useNavigation()

    useFocusEffect(
        React.useCallback(() => {
            refreshToken()
            console.log('a')
        })
    );
    // useEffect(() => {
    //     refreshToken()
    //     console.log('a')
    // }, [])

    const refreshToken = async () => {
        try {
            const response = await axios.get('http://192.168.100.19:5000/refreshtoken')
            setToken(response.data.accessToken)
            const decoded = jwtDecode(response.data.accessToken)
            setName(decoded.name)
            setExpired(decoded.exp)
        } catch (error) {
            if(error.response){
                // navigation.navigate('Login')
                navigation.reset({
                    index:0,
                    routes:[{name:'Login'}],
                })
            }
        }
    }

    const axiosJWT = axios.create()
    axiosJWT.interceptors.request.use(async(config) => {
        const currentDate = new Date()
        if(expired * 1000 < currentDate.getTime()){
            const response = await axios.get('http://192.168.100.19:5000/refreshtoken')
            config.headers.Authorization = `Bearer ${response.data.accessToken}`
            setToken(response.data.accessToken)
            const decoded = jwtDecode(response.data.accessToken)
            setName(decoded.name)
            setExpired(decoded.exp)
        }
        return config
    }), ((error) => {
        return Promise.reject(error)
    })

    const getUser = async () => {
        try {
            const respon = await axiosJWT.get('http://192.168.100.19:5000/users', {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(respon.data.users)
        } catch (error) {
            console.log('error ='+error)
        }
    }

    const Logout = async () => {
        try {
            await axios.delete('http://192.168.100.19:5000/logout')
            navigation.reset({
                    index:0,
                    routes:[{name:'Login'}],
                })
            console.log('logout success')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View>
            <Text>Selamat datang : {name}</Text>
            <Button title="Get User" onPress={getUser} />
            <View style={styles.margin}>
                <Button title="Logout" onPress={Logout} />
            </View>
        </View>
    )
}

export default Dashboard

const styles = StyleSheet.create({
  margin:{
      marginTop: 10
  }
})