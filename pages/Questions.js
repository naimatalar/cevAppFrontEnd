import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import CvpButton from '../components/CvpButton'
import MyProfile from './MyProfile'
import CvpImageButton from '../components/CvpImageButton'
import { userModel } from '../models/responseModels'
import QuestionCreate from './QuestionCreate'
import LinearGradient from 'react-native-linear-gradient'
import Emoji from 'react-native-emoji'

const Questions = (props) => {
    const [pages, setPage] = useState("current")
    const [user, setUSer] = useState(props.navigation.state.params.userData)
    const [questionEditId, setQuestionEditId] = useState(null)
    useEffect(() => {
        async function start() {
            setUSer(props.navigation.state.params.userData)
           

        }

        start()

    }, [])

    const renderAndGoBack = (data) => {

        setUSer(data)
        props.navigation.state.params.onGoBack(data)
        console.log("Render Eder")
    }

    let questionList = []
    questionList = user.userQuestionAnsverList.map((item, key) => {
        return (
            <View key={key} style={{ marginBottom: 15 }}>

                <LinearGradient colors={["#b3e5fc", "#e6ffff"]} style={styles.questionAnsver}>


                    <View style={{ marginBottom: 15 }}>
                        <Text style={{ fontWeight: "bold", color: "red" }}>SORU</Text>
                        <Text style={{ fontWeight: "bold", color: "red", fontSize: 15 }}> &nbsp; &nbsp; {item.question}</Text>
                    </View>
                    <View >
                        <Text style={{ fontWeight: "bold", color: "green" }}>CEVAP</Text>
                        <Text style={{ fontWeight: "bold", color: "green", fontSize: 15 }}> &nbsp; &nbsp; {item.ansver}</Text>
                    </View>
                </LinearGradient>
                <TouchableOpacity on onPress={() => { props.navigation.navigate("QuestionCreate", { userData: user, refId: item.refId ,renderAndGoBack:renderAndGoBack.bind(this)}) }} style={{
                    backgroundColor: "#eeeeee",
                    padding: 5,
                    width: 63,
                    alignSelf: "flex-end",
                    flexDirection: "row",
                    position: "absolute",
                    zIndex: 99,
                    borderWidth: 1,
                    borderRadius: 5
                }}>
                    <Emoji name="pencil2"> </Emoji><Text style={{ fontWeight: "bold", color: "black" }}> &nbsp;Edit</Text>
                </TouchableOpacity>
            </View>)
    })
    if (pages == "questioncreate") {

        return (
            <QuestionCreate values={user} refId={null}></QuestionCreate>

        )
    }
    if (pages == "myprofile") {
        return (
            <MyProfile values={user}></MyProfile>

        )
    }
    return (


        <View>
            <View style={{ flexDirection: "row", backgroundColor: "#E4E4E3" }}>
                <View style={{ alignSelf: "flex-start", flex: 1 }}>
                    <CvpButton onPress={() => { props.navigation.navigate("MyProfile", { userData: user }) }} emojiname="leftwards_arrow_with_hook" text="Geri"></CvpButton>

                </View>
                <View style={{ alignSelf: "flex-end", flex: 1 }}>
                    <CvpButton emojiname="house" style={{ alignSelf: "flex-end" }} text="Başla"></CvpButton>

                </View>
            </View>

            <View style={{ flexDirection: "column", alignSelf: "flex-start", width: Dimensions.get("window").width, height: Dimensions.get("window").height }}>
                <View style={{ flex: 3, padding: 10 }}>
                    {questionList}
                </View>
                {user.userQuestionAnsverList.length < 3 &&

                    <View style={{ flex: 1 }}>
                        <Text style={{ textAlign: "center" }}>
                            3 adet soru eklenmelidir
                    </Text>
                        <TouchableOpacity style={styles.addNew} onPress={() => { props.navigation.navigate("QuestionCreate", { userData: user, refId: questionEditId ,renderAndGoBack:renderAndGoBack.bind(this) }) }} >

                            <Text style={{ fontSize: 50, alignSelf: "center", marginTop: -12, fontWeight: "bold", color: "white", textShadowColor: "black", textShadowOffset: { width: 1, height: 2 }, textShadowRadius: 5 }}>+</Text>
                        </TouchableOpacity>
                    </View>
                }


            </View>





        </View>

    )

}
const styles = StyleSheet.create({


    addNew: {

        height: 50,
        borderWidth: 1,
        borderColor: "black",
        borderStyle: "solid",
        margin: 5,
        alignContent: "center",
        paddingTop: 0,
        borderRadius: 10,
        backgroundColor: "#e0f2f1"
    },
    questionAnsver: {
        backgroundColor: "red",
        padding: 10,
        borderRadius: 5,
        borderStyle: "solid",
        borderColor: "black",
        borderWidth: 1,
        paddingTop: 15
    },

})

export default Questions