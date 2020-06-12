import React, { useState, useEffect } from 'react'
import { View, Text, Image, Dimensions, StyleSheet, TouchableOpacity } from 'react-native'
import CvpButton from '../components/CvpButton'
import Emoji from 'react-native-emoji'
import { SliderBox } from "react-native-image-slider-box";
import CvpImageButton from '../components/CvpImageButton';
import { userModel } from '../models/responseModels';
import Images from './Images';
import apiConstant from '../constants/apiConstant'
import Edit from './Edit';
import CvpLoading from '../components/CvpLoading';
import Questions from './Questions';
import Home from './Home';
import LinearGradient from 'react-native-linear-gradient';


const MyProfile = (props) => {
    const userDAta = props.navigation.state.params.userData;

    const [user, setUser] = useState(userModel)
    const [pages, setPage] = useState("current")
    const [imageList, setImageList] = useState([])
    const [loading, setLoading] = useState(true)


    useEffect(() => {


        // console.log(props)
        async function start() {
            let img = []
            setUser(userDAta)
            let usr = userDAta
            if (usr.photos.length === 0) {

                setImageList([require('../assets/noImage.png')])
            } else {

                for (var i of usr.photos) {

                    img.push(apiConstant.USERIMAGES + "/" + i.url)
                }
                setImageList(img)
            }

        }

        start();
    }, [props])


    const back = (d) => {

        const img = []
        const usr = d
        if (usr.photos.length === 0) {

            setImageList([require('../assets/noImage.png')])
        } else {

            for (var i of usr.photos) {

                img.push(apiConstant.USERIMAGES + "/" + i.url)
            }
            setImageList(img)
        }
        setUser(d)
    }

    console.log("Render Eder image Sayısı=" + user.photos.length)

    if (pages == "home") {
        return (<Home values={user}></Home>)
    }
    if (pages == "images") {
        return (<Images values={user}></Images>)
    }
    if (pages == "edit") {
        return (<Edit></Edit>)
    }
    if (pages == "questions") {
        return (<Questions values={user}></Questions>)
    }
    return (

        <View style={{ flex: 1, flexDirection: "column" }}>




            <View style={{
                flexDirection: "row",
                backgroundColor: "#ffffffc4",
                position: "absolute",
                top: 0,
                width: "100%",
                zIndex: 9999,

                borderBottomColor: "grey",
                borderStyle: "dotted",
                borderBottomLeftRadius: 5,
                borderBottomRightRadius: 5,

                borderBottomWidth: 3
            }}>
                <View style={{ alignSelf: "flex-start", flex: 1 }}>



                    <TouchableOpacity onPress={() => { props.navigation.navigate("Edit", { userData: user }) }}
                        style={{ height: 55, width: 77, flexDirection: "row" }} >
                        <LinearGradient colors={["#bdbdbd", "#eeeeee", "#bdbdbd", "#e0e0e0"]} style={styles.uploadNew}>
                            <Emoji name="gear" style={{ fontSize: 24 }}></Emoji>
                            {/* <Emoji name="heavy_plus_sign" style={{  opacity: 0.6, fontSize: 27, alignSelf: "center", marginTop: 0 }}></Emoji> */}
                            <Text style={styles.uploadNewText}> </Text>
                        </LinearGradient>
                    </TouchableOpacity>



                    {/* <CvpButton onPress={() => { setPage("edit") }} emojiname="gear" text="Ayarlar"></CvpButton> */}

                </View>
                <View style={{ alignSelf: "flex-end", flex: 1 }}>

                    <TouchableOpacity onPress={() => { props.navigation.navigate("Home") }} style={{
                        height: 55,
                        width: 77,
                        alignSelf: "flex-end"
                    }} >
                        <LinearGradient colors={["#bdbdbd", "#eeeeee", "#bdbdbd", "#e0e0e0"]} style={styles.uploadNew}>
                            <Emoji name="fire" style={{ fontSize: 24 }}></Emoji>
                            {/* <Emoji name="heavy_plus_sign" style={{  opacity: 0.6, fontSize: 27, alignSelf: "center", marginTop: 0 }}></Emoji> */}
                            {/* <Text style={styles.uploadNewText}> Başla</Text> */}
                        </LinearGradient>
                    </TouchableOpacity>

                    {/* <CvpButton onPress={() => { setPage("home") }} emojiname="fire" style={{ alignSelf: "flex-end" }} text="Başla"></CvpButton> */}

                </View>
            </View>


            <View style={{ flexDirection: "row", textAlign: "center", flex: 1 }}>


                <SliderBox
                    images={imageList}
                    sliderBoxHeight={Dimensions.get('window').height}
                    onCurrentImagePressed={index => { }}
                />

            </View>
            <View style={{flexDirection:"column"}}>



                <View style={{
                    flexDirection: "row",
                    position: "absolute",
                    bottom: 50,
                    alignSelf: "center",
                    padding: 7,
                    flex:1,
                    // borderRadius: 10,
                    // borderWidth: 2,
                    // borderColor: "black",
                    // borderStyle: "dotted",
                    // shadowColor: "black",
                    shadowOffset: {
                        width: 0,
                        height: 10,
                    },
                    shadowOpacity: 0.90,
                    shadowRadius: 9.00,

                    elevation: 24,

                }}>
                    <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
                        <View style={{ flex: 1 }}></View>
                        <CvpImageButton style={{ flex: 1 }} linearColor={['#6e45e2', '#88d3ce']} text="Resimler" onPress={() => { props.navigation.navigate("Images", { userData: user, onGoBack: back.bind(this) }) }} iconname="frame_with_picture"></CvpImageButton>
                        <CvpImageButton style={{ flex: 1 }} linearColor={['#6e45e2', '#88d3ce']} text="Sorular" onPress={() => { props.navigation.navigate("Questions", { userData: user, onGoBack: back.bind(this) }) }} iconname="grey_question"></CvpImageButton>
                        <CvpImageButton style={{ flex: 1 }} linearColor={['#6e45e2', '#88d3ce']} text="Sonuçlar" iconname="chart" onPress={() => { props.navigation.navigate("AnsverResult", { userData: user, onGoBack: back.bind(this) }) }}></CvpImageButton>
                        <View style={{ flex: 1 }}></View>
                    </View>
                </View>
            </View>

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

    }


})
export default MyProfile