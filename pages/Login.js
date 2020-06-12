import React from 'react'
import { View, Text, StyleSheet, TextInput, ScrollView, AppRegistry, Image } from 'react-native'
import CvpTextBox from '../components/CvpTextBox'
import CvpButton from '../components/CvpButton'
import { registerOrCheck, getTokenBack, getLoginCheck } from '../dataCrud/dataAction'
import { setTokenAsync, getTokenAsync, reomveTokenAsync, setUserIdAsync, getUserIdAsync, setHubConnectionAsync, setDeviceToken } from '../dataCrud/auth'
import CvpLoading from '../components/CvpLoading'
import { baseModel, hubPageControl } from '../models/responseModels'
import App from '../App'
import { name as appName } from '../app.json';
import { fcmService } from '../components/FCMService'
import { localNotificationService } from '../components/LocalNotificationService'
import signalR, { HubConnectionBuilder, LogLevel, HubConnection, HttpTransportType } from '@aspnet/signalr'
import apiConstant from '../constants/apiConstant';

import { createStore } from "redux"
import { Provider } from "react-redux"
import Home from './Home'
import RouterPage from './RouterPage'
import phone from '../assets/phone.json'

let ConnectionS = new HubConnectionBuilder()
    .withUrl(apiConstant.MESSAGE_HUB, {
        skipNegotiation: false,
        transport: HttpTransportType.LongPolling
    })
    // .configureLogging(LogLevel.Trace)
    .build()

const initialState = {
    notificationData: {},
    notificationPage: {}
}

const reducer = (state = initialState, action) => {


    if (action.type == "setNotificationData") {

        return Object.assign({}, state, action.payload)
    }
    return state
}


const store = createStore(reducer)

const Login = (props) => {
    const [phone, phoneChange] = React.useState("")
    const [smsCode, smsCodeChange] = React.useState("")
    const [loading, setLoading] = React.useState(true)
    const [checkLoginData, setCheckLoginData] = React.useState(baseModel)
    const [tempSmsCode, setTempSmsCode] = React.useState("")
    const [pages, setPage] = React.useState("phone")
    const [deviceToken, setDeviceToken_] = React.useState("phone")
    const [notificaionPage, setNotificationPage] = React.useState()
    const [countryCode, setCountryCode] = React.useState()


    console.disableYellowBox = true
    // AppRegistry.registerComponent(appName, () => App())

    React.useEffect(() => {
        _checkLogin()

 

        fcmService.registerAppWithFCM()
        fcmService.register(onRegister, onNotification, onOpenNotification)
        localNotificationService.configure(onOpenNotification)
        function onRegister(token) {
            console.log("[app] onRegister ", token)
            setDeviceToken(token)
            setDeviceToken_(token)
        }
        function onNotification(notify) {
            console.log("[app] monnotification: ", notify)

            const options = {
                soundName: 'default',
                playSound: true
            }
            localNotificationService.showNotification(
                0,
                notify.title,
                notify.body,
                notify,
                options
            )
        }

        function onOpenNotification(notify) {
            console.log("openm notification working")
            //  alert("ifaktör")
            setPage("AnsverResult")

        }

        // setNotificationPage(onOpenNotification)
        return () => {

            console.log("[App] unRegister")
            fcmService.unRegister()
            localNotificationService.unregister()
        }

     
    }, [])

    const _onRegisterOrCheck = async (phone) => {
        const result = await registerOrCheck({ "phoneNumber": phone }).then(x => {

            setPage("smsCode");
            return x
        }).catch(x => {
            alert("Hata Oluştu")
        })

        setTempSmsCode(result.data.data.smsCode)

    }


    const _checkLogin = async () => {
        // reomveTokenAsync()



        getLoginCheck().then(x => {

            if (x.data.redirect.isRedirect) {
                setLoading(false);
                // props.navigation.navigate("Home")
                setPage(x.data.redirect.param);

            } else {
                setLoading(false);
                setPage("phone");
            }
        }).catch(x => {
            ////DAha Sonra Hata Sayfasına yönlendirecek
            setLoading(false);
            setPage("phone");
        })

    }



    const _onGetToken = async (sCode) => {
        var result = await getTokenBack({ "phoneNumber": phone, "smsCode": sCode, "deviceToken": deviceToken }).then(x => {
            return x.data
        })

        if (result.isError === true) {
            alert(result.detail)
            return null
        }
        await setTokenAsync(result.data.token)
        await setUserIdAsync(result.data.userId)

        _checkLogin()
    }


    if (loading === false) {

        if (pages == "phone") {
            return (<View style={{flexDirection:"column"}}>

                <View>
                    <View style={{ height: 70,marginTop:30, }}>
                        <View style={{ flexDirection: "row", alignSelf: "center", margin: 10 ,
                        border:2,borderStyle:"dotted",borderColor:"black"}}>
                            <Image source={require('../assets/smallicon.png')} style={{
                                width: 75, height: 75, resizeMode: "contain", marginRight: 1, alignSelf: "center"
                            }}></Image>
                            <Image source={require('../assets/cvpText.png')} style={{
                                width: 220, height: 80, resizeMode: "contain", marginRight: 5, alignSelf: "center"
                            }}></Image>

                        </View>
                    </View>
                </View>

                <Text style={styles.phoneLabel}>Telefon Numaranızı Giriniz</Text>
                <CvpTextBox multiline value={phone} onChangeText={text => { phoneChange(text) }}></CvpTextBox>

                <CvpButton emojiname="telephone_receiver" onPress={() => _onRegisterOrCheck(phone)} ></CvpButton>
            </View>)
        } else if (pages == "smsCode") {

            return (

                <View>
                    <Text style={styles.phoneLabel}>Sms Kodunu</Text>
                    <TextInput>{tempSmsCode}</TextInput>
                    <CvpTextBox multiline value={smsCode} onChangeText={text => { smsCodeChange(text) }}>

                    </CvpTextBox>
                    <CvpButton emojiname="telephone_receiver" onPress={() => _onGetToken(smsCode)} ></CvpButton>
                </View>
            )
        } else if (pages == "edit") {

            return (<Provider store={store}><App screenProps={pages}></App></Provider>)
        } else if (pages == "home") {

            return (<Provider store={store}><App screenProps={pages}></App></Provider>)
        }
        else if (pages == "message") {

            return (<Provider store={store}><App screenProps={pages}></App></Provider>)
        }
        else if (pages == "AnsverResult") {

            return (<Provider store={store}><App screenProps={pages}></App></Provider>)
        }

    }

    else {

        return (
            <CvpLoading>

            </CvpLoading>
        )

    }



}

const styles = StyleSheet.create({
    phoneLabel: {
        fontSize: 30,
        textAlign: "center",
        marginTop: 50

    }

})

export default Login;