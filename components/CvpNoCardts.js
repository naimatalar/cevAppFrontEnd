import React, { useState, useEffect } from 'react'
import { Text, View } from 'react-native'
import Home from '../pages/Home';
import { listUser } from '../dataCrud/dataAction';
import Login from '../pages/Login';

const CvpNoCarts = (props) => {
    const [pages, setPage] = useState("")
    useEffect(() => {
        start()

    }, [])


    const start = () => {
        var Intervals = setInterval(async () => {
            console.warn(props.GeoPosition)
            let users = await listUser(props.GeoPosition).then((x) => { return x }).catch((x) => { return "error" })
            if (users == "error") {
                 clearInterval(Intervals)
                setPage("login")
            }
            if (users.data.length > 0) {
                clearInterval(Intervals)
                setPage("home")

            }

        }, 10000);
    }
 if (pages == "login") {
        return (<Login></Login>)
    }
    if (pages == "home") {
        return (<Home></Home>)
    }
   
    return (
        
        <View>
            
            <Text>Kart Yok</Text>
        </View>

    )



}

export default CvpNoCarts