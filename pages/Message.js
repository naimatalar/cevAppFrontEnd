import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Image, ScrollView, Dimensions, StyleSheet } from 'react-native'
// import signalr from 'react-native-signalr'
import signalR, { HubConnectionBuilder, LogLevel, HubConnection, HttpTransportType } from '@aspnet/signalr'


import apiConstant from '../constants/apiConstant';
import { getUserIdAsync, getDeviceToken } from '../dataCrud/auth';
import { getMessageUserList, readMessage } from '../dataCrud/dataAction';
import LinearGradient from 'react-native-linear-gradient';
import Emoji from 'react-native-emoji';
import Home from './Home';
import Chat from './Chat';
import { messageContactList } from '../models/responseModels';

const Message = (props) => {
    const [messages, setMessages] = useState([])
    const [contactList, setContactList] = useState([messageContactList])
    const [pages, setPage] = useState()
    const [userImage, setUserImage] = useState()
    const [userName, setUserName] = useState()
    const [contactUserId, setContactUserId] = useState([])
    const [isPageLoad, setIsPageLoad] = useState(false)
    const [refresPageStart, setRefresPageStart] = useState(false)



    //addMessage function to invoke SendMessageToGroup from server


    useEffect(() => {

        start()

        return async () => {
            if (await props.navigation.state.params.hubConnection.state === 1) {
                console.log("[Message] stopped")
                await props.navigation.state.params.hubConnection.stop()
            }


        }
        
    }, [])

    const refresPage = () => {
        console.log("refres messageList")
        start()
    }


    const start = async () => {

        let contactListFromServer = await getMessageUserList()
        setContactList(contactListFromServer.data.data)

        // console.log(props.navigation.state.params.hubConnection.)


        const hubConnection = await props.navigation.state.params.hubConnection



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

        await hubConnection.on("notification", (senderUserId, receiverUserId, type, message) => {
            console.log("Message içindeki çalışıyor")
            let messageIndex = 0;
            let addNewContectItem = null;

            let newContactList = contactListFromServer.data.data.filter((item, index) => {
                let listing = messageContactList

                if (item.contactUserId == senderUserId) {
                    console.log("ife girdi")
                    messageIndex = index
                    listing.lastMessage.message = message
                    listing.newMessageCount = 1
                    listing.lastMessage.isRead = false
                    listing.contactUserId = item.contactUserId
                    listing.contactUserImageUrl = item.contactUserImageUrl
                    listing.contactUserName = item.contactUserName
                    addNewContectItem = listing;

                }

                return item.contactUserId !== senderUserId
            })
            newContactList.unshift(addNewContectItem)
            setContactList(newContactList)
            setMessages([...messages, message])


        })

        console.log("Hub connection", hubConnection.state)
        setIsPageLoad(true)

        const hubWork = async () => {



        }
    }



    const selectChat = async (conUserId, image, usrname) => {

        readMessage(conUserId)
        setUserName(usrname)
        setUserImage(image)
        setContactUserId(conUserId)


        props.navigation.navigate("Chat", { conUserId: conUserId, image: image, usrname: usrname, refresPage: refresPage.bind(this) })



        //   setMessages([...messages,senderID])
    }

    let renderContactList = contactList.map((item, index) => {

        let styleF = {
            textStyle: {
                fontWeight: "none",
                color: "grey"
            }
        }



        if (item.lastMessage != null) {

            if (item.newMessageCount > 0 || item.lastMessage.isRead == false && !item.lastMessage.isMyMessage) {
                styleF.textStyle.fontWeight = "bold"
                styleF.textStyle.color = "black"

            }
        }


        return (<View key={index} style={{ marginBottom: 15 }}>
            <TouchableOpacity style={{ flexDirection: "row" }} onPress={() => { selectChat(item.contactUserId, item.contactUserImageUrl, item.contactUserName) }}>
                <View style={{ height: 75, width: 75, borderRadius: 60, overflow: "hidden", borderWidth: 1, borderColor: "black", borderStyle: "solid" }}>
                    <Image style={{ resizeMode: "contain", height: 120, width: 120, alignSelf: "center" }} source={{ uri: apiConstant.USERIMAGES + "/" + item.contactUserImageUrl }}></Image>

                </View>
                <View style={{ overflow: "hidden", flex: 1, paddingLeft: 10, paddingTop: 20 }}>


                    <Text style={{ fontWeight: "bold", fontSize: 19 }}>{item.contactUserName}</Text>
                    <View style={{ flexDirection: "row" }}>
                        {item.lastMessage != null &&
                            <View style={{ width: Dimensions.get("window").width - 130, flexDirection: "row" }}>
                                {
                                    item.lastMessage.isMyMessage == true && <View>
                                        {
                                            item.lastMessage.isRead == true && <Image
                                                style={{ width: 20, height: 20, marginRight: 7, resizeMode: "contain" }}
                                                source={require('../assets/readCheck.png')}></Image>
                                            ||

                                            item.lastMessage.isRead == false && <Image
                                                style={{ width: 20, height: 20, marginRight: 7, resizeMode: "contain" }}
                                                source={require('../assets/notReadCheck.png')}></Image>

                                        }


                                    </View>
                                }
                                <Text style={styleF.textStyle}>{item.lastMessage.message != null && item.lastMessage.message.length > 32 && item.lastMessage.message.substr(0, 30) + " ..."}</Text>
                                <Text style={styleF.textStyle}>{item.lastMessage.message != null && item.lastMessage.message.length < 32 && item.lastMessage.message}</Text>

                                {item.lastMessage.isRead == false && item.lastMessage.isMyMessage != true &&

                                    <View style={{ position: "absolute", right: 1, backgroundColor: "#6b098c", padding: 10, borderRadius: 20 }}>
                                    </View>
                                }
                            </View>
                        }

                        {item.lastMessage == null &&

                            <Text style={{ color: "grey" }}>{"İlk yazan sen ol ..."}</Text>

                        }






                    </View>

                </View>
            </TouchableOpacity>
        </View>

        )

    })

    let renderMessage = messages.map((item, index) => {
        return (<View>
            <Text>{item}</Text>
        </View>

        )

    })


    if (pages == "home") {
        return (<Home></Home>)
    }
    if (pages == "chat") {
        return (<Chat contactUserId={contactUserId} userImage={userImage} userName={userName}></Chat>)
    }

    return (<View style={{ flexDirection: "column" }}>

        <View style={{ flexDirection: "row", backgroundColor: "white" }}>
            <View style={{ alignSelf: "flex-start", flex: 1 }}>



                <TouchableOpacity onPress={() => { props.navigation.navigate("Home") }} style={{ height: 40, width: 100 }} >
                    <LinearGradient colors={["#bdbdbd", "#eeeeee", "#bdbdbd", "#e0e0e0"]} style={styles.uploadNew}>
                        <Emoji name="fire"></Emoji>
                        {/* <Emoji name="heavy_plus_sign" style={{  opacity: 0.6, fontSize: 27, alignSelf: "center", marginTop: 0 }}></Emoji> */}
                        <Text style={styles.uploadNewText}> Başla</Text>
                    </LinearGradient>
                </TouchableOpacity>



                {/* <CvpButton onPress={() => { setPage("edit") }} emojiname="gear" text="Ayarlar"></CvpButton> */}

            </View>
            {/* <View style={{ alignSelf: "flex-end", flex: 1 }}>
                <TouchableOpacity onPress={() => { setPage("home") }} style={{ height: 40, width: 100, alignSelf: "flex-end" }} >
                    <LinearGradient colors={["#bdbdbd", "#eeeeee", "#bdbdbd", "#e0e0e0"]} style={styles.uploadNew}>
                        <Emoji name="fire"></Emoji>
                        <Text style={styles.uploadNewText}> Başla</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View> */}
        </View>

        {/* <View >
            <TouchableOpacity onPress={async () => await sendMessage("5ead99717313a24aa8eb1625")}>
                <Text>123 gönderir</Text>

            </TouchableOpacity>
            <TouchableOpacity onPress={async () => await sendMessage("5eb197813375f457089851ed")}>
                <Text>5375516515  gönderir</Text>

            </TouchableOpacity>
        </View> */}

        <ScrollView style={{ padding: 15, flexDirection: "column", height: Dimensions.get("window").height - 120 }}>
            <View style={{ flex: 1 }}>
                <View>{renderContactList}</View>

            </View>


        </ScrollView>
        <View style={{ flex: 1, padding: 10 }}>
            <Text style={{ textAlign: "center" }}> Burdan konuş anlaş </Text>
        </View>
        {!isPageLoad &&
            <View style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                backgroundColor: "white"
            }}>
                <Text style={{ textAlign: "center" }}>Loading</Text>
            </View>

        }
    </View>)
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


})
export default Message