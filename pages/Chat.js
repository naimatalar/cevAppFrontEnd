import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions, TextInput, Image, AppState } from 'react-native'
import Emoji from 'react-native-emoji'
import LinearGradient from 'react-native-linear-gradient';
import signalR, { HubConnectionBuilder, LogLevel, HubConnection, HttpTransportType } from '@aspnet/signalr'
import apiConstant from '../constants/apiConstant';
import { getUserIdAsync, setHubConnectionAsync, getDeviceToken } from '../dataCrud/auth';
import Home from './Home';
import { getAllMessage } from '../dataCrud/dataAction';
import { connect } from "react-redux"





const Chat = (props) => {
    const [pages, setPage] = useState()
    const [message, setMessage] = useState()
    const [messageList, setMessageList] = useState([])
    const [isPageLoad, setIsPageLoad] = useState(false)
    const [userInfo, setUserInfo] = useState({ userName: props.navigation.state.params.usrname, userImage: props.navigation.state.params.image })

    const [scrollView, setScrollView] = useState()

    const [contactUserId, setContactUserId] = useState(props.navigation.state.params.conUserId)
    const [refreshMessage, setRefreshMessage] = useState();

    useEffect(() => {

        getAllMessage(contactUserId).then((x) => {
            setMessageList(x.data.data)
            start(x.data.data)
            setIsPageLoad(true)
        })
     
  

    }, [])





    const start = async (messageAll) => {

        const hubConnection = await props.navigation.state.params.hubConnection;
        if (await hubConnection.state === 0) {
            console.log("[Message] only start working")
            let UserId = await getUserIdAsync()
            let deviceToken = await getDeviceToken()
            // console.log("[Message] only start working")
            await hubConnection.start()
            await hubConnection.invoke('joinHub', UserId, deviceToken)
        } else {
            let UserId = await getUserIdAsync()
            let deviceToken = await getDeviceToken()

            console.log("[Message] start stop working")
            await hubConnection.stop()
            await hubConnection.start()
            await hubConnection.invoke('joinHub', UserId, deviceToken)
        }

        await hubConnection.on("SendToChannel", async (senderUserId, receiverUserId, msg) => {
            console.log("working caht")


            const mainMess = msg;
            const newMessageList = messageAll;
            newMessageList.push({ isMy: false, message: mainMess })
            setMessageList(newMessageList)
            const mess = message;
            setMessage(message + "")
            setMessage(message)
            const msL = newMessageList

        })

        setIsPageLoad(true)
        console.log(isPageLoad)
        console.log("Hub connection", hubConnection.methods)



    }



    const sendMessage = async () => {
        const senderID = await getUserIdAsync()
        console.log("Gönderme butonu çalışır çalışır ", props.navigation.state.params.conUserId)

        const hub = await props.navigation.state.params.hubConnection

        if (await hub.state === 0) {
            console.log("[Message] only start working")
            let UserId = await getUserIdAsync()
            let deviceToken = await getDeviceToken()
            // console.log("[Message] only start working")
            await hub.start()
            await hub.invoke('joinHub', UserId, deviceToken)
        } else {
            let UserId = await getUserIdAsync()
            let deviceToken = await getDeviceToken()

            console.log("[Message] start stop working")
            await hub.stop()
            await hub.start()
            await hub.invoke('joinHub', UserId, deviceToken)
        }



        await hub.invoke('notification', senderID, props.navigation.state.params.conUserId, "message", message)

        await hub.invoke('SendToChannel', senderID, props.navigation.state.params.conUserId, message)

        const newMessageList = messageList;
        newMessageList.push({ isMy: true, message: message })
        setMessageList([...messageList])
        setMessage(message)
        setMessage("")



    }

    let renderMessageList = messageList.map((item, index) => {


        if (item.isMy == true) {
            return (
                <View key={index} style={styles.myMessageView}>

                    <Text style={{ fontSize: 18 }}>{item.message}</Text>
                </View>
            )
        } else {
            return (
                <View key={index + "n"} style={{ flexDirection: "row", marginBottom: 10 }}>
                    <View style={{ width: 60, height: 60, overflow: "hidden", borderRadius: 60, padding: 0, flexDirection: "column", borderStyle: "solid", borderWidth: 1, borderColor: "black", marginRight: 5 }}>
                        <Image style={{ resizeMode: "contain", height: 90, width: 90, alignSelf: "center" }} source={{ uri: apiConstant.USERIMAGES + "/" + userInfo.userImage }}></Image>

                    </View>

                    <View style={styles.contactMEssageView}>

                        <Text>{item.message}</Text>
                    </View>

                </View>)
        }



    })
    if (pages == "home") {
        return (<Home></Home>)
    }

    return (

        <View style={{ flexDirection: "column", flex: 1 }}>

            <View style={{ flexDirection: "row", backgroundColor: "white", alignItems: "center", borderBottomWidth: 1, borderBottomColor: "black", borderStyle: "solid" }}>
                <View style={{ flex: 1, flexDirection: "row" }}>



                    <TouchableOpacity onPress={async () => { props.navigation.state.params.refresPage(); props.navigation.navigate("Message"); }} style={{ width: 100, alignSelf: "center" }} >
                        {/* <LinearGradient colors={["#bdbdbd", "#eeeeee", "#bdbdbd", "#e0e0e0"]} style={styles.uploadNew}>
                            <Emoji name="fire"></Emoji>
                            <Text style={styles.uploadNewText}> Başla</Text>
                        </LinearGradient> */}
                        <Text style={{ fontSize: 37, color: "#bdbdbd", fontWeight: "bold" }}> {"<"} </Text>
                    </TouchableOpacity>


                </View>
                <View style={{ flex: 1 }}>


                    <View style={{ alignSelf: "center", width: 50, height: 50, overflow: "hidden", borderRadius: 60, padding: 0, flexDirection: "column", borderStyle: "solid", borderWidth: 1, borderColor: "black", marginRight: 5 }}>
                        <Image style={{ resizeMode: "contain", height: 90, width: 90, alignSelf: "center" }} source={{ uri: apiConstant.USERIMAGES + "/" + userInfo.userImage }}></Image>

                    </View>
                    <Text style={{ alignSelf: "center", marginLeft: -13 }}>{userInfo.userName}</Text>


                </View>
                <View style={{ flex: 1 }}>
                    <TouchableOpacity onPress={() => { setPage("home") }} style={{ height: 40, width: 100, alignSelf: "flex-end", flexDirection: "row" }} >
                        {/* <LinearGradient colors={["#bdbdbd", "#eeeeee", "#bdbdbd", "#e0e0e0"]} style={styles.uploadNew}>
                            <Emoji name="fire"></Emoji>
                            <Text style={styles.uploadNewText}> bağlantıyı Kes</Text>
                        </LinearGradient> */}
                        <Text style={{ alignSelf: "center" }}>Bağlantıyı Kes
                           </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView style={{ flex: 1 }}
                ref={ref => { setScrollView(ref) }}
                onContentSizeChange={() => scrollView.scrollToEnd({ animated: false })}>


                {renderMessageList}
            </ScrollView>
            <View style={{ flexDirection: "row", padding: 14 }}>
                <View style={{ flex: 1 }}>
                    <TextInput style={{

                        borderColor: "black",
                        borderWidth: 1,
                        borderStyle: "solid",
                        borderRadius: 30,
                        margin: 5,
                        padding: 5,
                        paddingRight: 20,
                        paddingLeft: 20


                    }} onChangeText={(text) => { setMessage(text) }} value={message} ></TextInput>
                </View>
                <View style={{ marginLeft: 10 }}>
                    <TouchableOpacity onPress={() => { sendMessage() }}>
                        <Image source={require('../assets/sendmessage.png')} style={{ marginRight: 0, width: 45, height: 45, resizeMode: "contain", alignSelf: "center", marginTop: 2 }}></Image>


                    </TouchableOpacity>
                </View>

            </View>
            {!isPageLoad &&
                <View style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    backgroundColor: "white",
                    zIndex: 999
                }}>
                    <Text style={{ textAlign: "center" }}>Loading</Text>
                </View>

            }
        </View>
    )
}

const styles = StyleSheet.create({
    uploadNew: {


        flexDirection: "row",
        margin: 5,
        borderRadius: 40,
        flex: 1,


        borderColor: "blue",
        borderWidth: 2,
        borderStyle: "dotted",
        justifyContent: "center",
        padding: 0,
        borderColor: "black",
        marginTop: 10,


    },
    uploadNewText:
    {


        textAlign: "center",
        marginTop: 0,
        color: "black",
        textShadowColor: "white",
        textShadowOffset: { width: 1, height: 2 }, textShadowRadius: 5,

    },
    myMessageView: {
        backgroundColor: "#bbdefb",
        padding: 7,
        marginBottom: 5,
        alignSelf: "flex-end",
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        borderWidth: 1,
        borderColor: "blue",
        borderStyle: "solid",
        maxWidth: Dimensions.get("window").width - 100
    },
    contactMEssageView: {
        backgroundColor: "white",
        padding: 7,

        alignSelf: "center",
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        borderWidth: 1,
        borderColor: "grey",
        borderStyle: "solid",
        maxWidth: Dimensions.get("window").width - 100
    }
})
const mapStateToProps = (state) => {
    return {
        notificationData: state.notificationData
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        change: () => dispatch({ type: "dd", payload: "none" })
    }
}
// export default Chat
export default connect(mapStateToProps, mapDispatchToProps)(Chat)