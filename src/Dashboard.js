import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { View, Text, Button } from 'react-native'
import jwtDecode from 'jwt-decode'
import { useNavigation } from '@react-navigation/native'

const Dashboard = () => {
    const [token, setToken] = useState('')
    const [name, setName] = useState('')
    const [expired, setExpired] = useState('')
    const navigation = useNavigation()

    useEffect(() => {
        refreshToken()
    }, [])

    const refreshToken = async () => {
        try {
            const response = await axios.get('http://192.168.100.19:5000/refreshtoken')
            setToken(response.data.accessToken)
            const decoded = jwtDecode(response.data.accessToken)
            setName(decoded.name)
            setExpired(decoded.exp)
        } catch (error) {
            if(error.response){
                navigation.navigate('Login')
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
            console.log(error)
        }
    }

    return (
        <View>
            <Text>Selamat datang : {name}</Text>
            <Button title="Get User" onPress={getUser} />
        </View>
    )
}

export default Dashboard
