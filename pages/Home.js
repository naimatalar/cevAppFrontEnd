'use strict'
import React, { useState, useEffect } from 'react'
import { View, Text, PermissionsAndroid, Button, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native'
import Geolocation from 'react-native-geolocation-service';
import { listUser, swipeRecord, getCurrentUser, getUnreadMessageCount } from '../dataCrud/dataAction';
import { userList } from '../models/responseModels';
import SwipeCards from 'react-native-swipe-cards';
import CvpCards from '../components/CvpCards';
import CvpNoCarts from '../components/CvpNoCardts';
import CvpButton from '../components/CvpButton';
import LinearGradient from 'react-native-linear-gradient';
import Ansver from '../pages/Ansver'
import Message from './Message';
import MyProfile from './MyProfile';
import Emoji from 'react-native-emoji';
import { connect } from 'react-redux';



const Home = (props) => {
    const [geoPosition, setGeoPosition] = useState(null)
    const [user, setUser] = useState(null)
    const [listingUser, setListingUser] = useState([])
    const [pages, setPages] = useState("")
    const [refres, setRefresh] = useState(true)
    const [messageCount, setMEssageCount] = useState({ data: { count: 0 } })

    props.navigation.navigate(props.screenProps, { userData: user })

    console.log(props.screenProps)
    useEffect(() => {
        const start = async () => {
            const usr = await getCurrentUser().then((x) => { return x })
            setUser(usr.data.data)
            if (usr.data.data.userName == null) {
                props.navigation.navigate("Edit", {})
            }


            await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: "Lokasyon erişim izni",
                    message:
                        "Uygulama devam etmek için lokasyon erişim izni ister " +
                        "Onay.",
                    buttonNeutral: "Daha sonra",
                    buttonNegative: "Hayır",
                    buttonPositive: "Evet"
                }
            )

            await Geolocation.getCurrentPosition(async position => {
                let d = { longitude: position.coords.longitude, latitude: position.coords.latitude }
                console.log("Geopos", d)
                await setGeoPosition(d)
                // console.log("Bu UseEffect",d)
                let users = await listUser(d).then((x) => { return x })
                //    console.log("Bu UseEffect sonrası")
                await setListingUser(users.data)

                if (listingUser.length === 0) {
                    setPages("nocarts")

                }
                // console.warn( position.coords.longitude +" - "+position.coords.latitude )
            });




        };

        start()


    }, [])

    const refreshCount = async () => {
        const messageCount = await getUnreadMessageCount().then((x) => { return x })
        setMEssageCount(messageCount);
    }

    const swipedCard = (data) => {

        swipeRecord(data.id).then((x) => { return x })
        setUser(data)
        props.navigation.navigate("Ansver", { userData: data })
        // setPages("ansver")

    }
    const noCard = async () => {


        setListingUser([])
        let users = await listUser(geoPosition).then((x) => { setListingUser(x.data) }).catch((x) => { return "error" })
        setListingUser(users.data)
        setTimeout(async () => {
            console.log("Geopos", geoPosition)




        }, 3000);

    //   var   interVal = setInterval(() => {
 
    //     let users = await listUser(geoPosition).then((x) => { setListingUser(x.data) }).catch((x) => { return "error" })
    //     if (users.data.length>0) {
    //         setListingUser(users.data)
    //     }
        

    //     }, 10000);

        // refreshCard()


        return (<View>  <Text>Kart Yok</Text></View>
        )
    }


    const refreshCard = (isStop) => {



        let Intervals = setInterval(async (data) => {

            if (listUser.length > 0) {

            }


            if (isStop == false) {
                clearInterval(Intervals)
            }
            let users = await listUser(geoPosition).then((x) => { return x }).catch((x) => { return "error" })

            if (users == "error") {
                setRefresh(false)

            }

            if (users.data.length > 0) {
                setRefresh(false)


            }
            setListingUser(users.data)
            clearInterval(Intervals)
        }, 10000);


    }

    // return (<Message></Message>
    //     )
    if (pages == "profile") {

        return (<MyProfile values={user}></MyProfile>)
    }
    if (pages == "ansver") {

        return (<Ansver values={user}></Ansver>)
    }
    if (pages == "messages") {

        return (<Message ></Message>)
    }

    if (pages == "nocarts") {
        noCard()
        setPages("")
    } else {


        return (

            <LinearGradient style={{ flexDirection: "column" }} colors={["white", "white", "#c5cae9", "white", "white"]} style={{ height: "102.5%" }}>
                <View style={{ flexDirection: "row", backgroundColor: "white", marginBottom: 0, alignContent: "center" }}>
                    <View style={{ flex: 1, alignSelf: "center" }}>
                        {/* <CvpButton onPress={() => { setPages("profile") }} emojiStyle={{ fontSize: 15 }} style={
                            {
                                width: 110, alignSelf: "flex-start",
                                borderStyle: "dotted",
                                borderWidth: 2,
                                borderRadius: 50
                            }

                        } emojiname="bar_chart" text="Profilim"></CvpButton> */}

                        <TouchableOpacity onPress={() => { props.navigation.navigate("MyProfile", { userData: user }) }}>
                            <LinearGradient colors={["#bdbdbd", "#eeeeee", "#bdbdbd", "#e0e0e0"]} style={{
                                flexDirection: "row",
                                margin: 5,
                                borderRadius: 40,
                                flex: 1,
                                width: 45,
                                height: 60,
                                borderColor: "blue",
                                borderWidth: 2,
                                borderStyle: "dotted",
                                justifyContent: "center",
                                padding: 22,
                                paddingBottom: 24,
                                borderColor: "#8c0b3b"

                            }}>
                                {/* <Emoji name="speech_balloon" style={{ fontSize: 30, alignSelf: "center",  }}></Emoji> */}
                                <Image source={require('../assets/account.png')} style={{ marginRight: 0, width: 40, resizeMode: "contain", alignSelf: "center", marginTop: 2 }}></Image>

                                <View style={{ flexDirection: "row", flex: 1, alignSelf: "center" }}>
                                    <Text style={{ alignContent: "center", flex: 1, fontWeight: "bold", marginTop: -3, color: "black" }}>  </Text>

                                </View>
                            </LinearGradient>

                        </TouchableOpacity>

                    </View>
                    {/* {!IsBigPage && } */}
                    {/* <View style={{ flex: 1 }}>
                        <CvpButton emojiname="speech_balloon" style={{ width: 70, alignSelf: "center" }} emojiStyle={{ fontSize: 25 }} text="0"></CvpButton>

                    </View> */}

                    <View style={{ flex: 1 }}>
                        <CvpButton emojiname="moneybag" style={{ width: 65, alignSelf: "flex-end" }} emojiStyle={{ fontSize: 25 }} text="0"></CvpButton>

                    </View>

                </View>
                {/* width: 400, height: 600, */}
                <View style={{ alignSelf: "center", flexDirection: "row" }}>
                    {listingUser.length == 0 && <View>

                        <Text>Kart Yok</Text>
                    </View>}
                    {listingUser.length > 0 && <SwipeCards

                        cards={listingUser}
                        renderCard={(cardData) => <CvpCards data={cardData} ></CvpCards>}

                        renderNoMoreCards={() => { noCard() }}
                        dragX={false}
                        showYup={true}
                        showMaybe={false}
                        showNope={true}
                        yupText="İncele"
                        nopeText="Geç"
                        smoothTransition={true}
                        handleYup={swipedCard}

                        // handleNope={}
                        // handleMaybe={}
                        hasMaybeAction
                    ></SwipeCards>}

                </View>
                {/* {IsBigPage &&} */}
                <View style={{ flexDirection: "row", backgroundColor: "#E4E4E3", bottom: 20, position: "absolute" }}>

                    <View style={{ alignSelf: "flex-start", flex: 1 }}>


                        <TouchableOpacity onPress={() => { props.navigation.navigate("Message") }}>
                            <LinearGradient colors={["#bdbdbd", "#eeeeee", "#bdbdbd", "#e0e0e0"]} style={{
                                flexDirection: "row",
                                margin: 5,
                                borderRadius: 40,
                                flex: 1,
                                width: 100,
                                height: 50,
                                borderColor: "blue",
                                borderWidth: 2,
                                borderStyle: "dotted",
                                justifyContent: "center",
                                padding: 15,
                                borderColor: "#8c0b3b"

                            }}>
                                {/* <Emoji name="speech_balloon" style={{ fontSize: 30, alignSelf: "center",  }}></Emoji> */}
                                <Image source={require('../assets/mBallons.png')} style={{ marginRight: 8, width: 30, resizeMode: "contain", alignSelf: "center", marginTop: 2 }}></Image>

                                <View style={{ flexDirection: "row", flex: 1, alignSelf: "center" }}>
                                    <Text style={{ alignContent: "center", flex: 1, fontWeight: "bold", marginTop: -3, color: "black" }}>{messageCount.data.count} </Text>

                                </View>
                            </LinearGradient>

                        </TouchableOpacity>
                    </View>
                    <View style={{ width: 30, flex: 1 }}>
                        {/* <CvpButton emojiname="house" style={{ alignSelf: "flex-end" }} text="Başla"></CvpButton> */}

                        <TouchableOpacity >

                            <LinearGradient colors={["white", "white"]} style={styles.randomSpinnerButton}>

                                <Image source={require('../assets/rainb.png')} style={{ width: 40, resizeMode: "contain", alignSelf: "center", marginTop: 2 }}></Image>
                                {/* <Emoji name="cyclone" style={{ fontSize: 35, alignSelf: "center" }}></Emoji> */}
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>

            </LinearGradient>
        )

    }



}
const styles = StyleSheet.create({
    randomSpinnerButton: {

        alignSelf: "flex-end",
        backgroundColor: "white",
        margin: 5,
        borderRadius: 40,
        paddingBottom: 3,
        width: 50,
        height: 50,
        borderColor: "blue",
        borderWidth: 2,
        borderStyle: "dotted",
        justifyContent: "center"


    }

})

const mapStateToProps = (state) => {
    return {
        notificationPage: state.notificationPage

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        change: () => dispatch({ type: "setNotificationData", payload: "jamir" })
    }
}
// export default Chat
export default connect(mapStateToProps, mapDispatchToProps)(Home)