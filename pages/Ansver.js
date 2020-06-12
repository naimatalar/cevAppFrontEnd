import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, CheckBox } from 'react-native'
import CvpButton from '../components/CvpButton'
import Home from './Home'
import { getQuestionAnsverModel, userQuestionAnsverListResponseModel } from '../models/responseModels'
import { giveAnsverRequestModel } from '../models/requestModels'

import { getQuestionAnsver, giveAnsver } from '../dataCrud/dataAction'
import Emoji from 'react-native-emoji';
import LinearGradient from 'react-native-linear-gradient'

const Ansver = (props) => {
    const [pages, setPage] = useState("")
    const [questionAnsvers, setQuestionAnsvers] = useState(getQuestionAnsverModel)
    const [ansver, setAnsver] = useState([])
    useEffect(() => {

        start()

    }, [])

    let questionRender = [];

    const start = async () => {

        let response = await getQuestionAnsver(props.navigation.state.params.userData.id).then((x) => { return x })
        setQuestionAnsvers(response.data.data)



    }

    const giveAnsverList = (data) => {


        let dd = ansver.filter((element, indx) => {
            return element.questionId != data.questionId

        })
        setAnsver([...dd, data])
    }

    const giveAnsverFunction = async() => {
        let model=giveAnsverRequestModel
        model.questionFromUserId=props.navigation.state.params.userData.id;
        model.userQuestionAnsverListResponseModel=ansver
 
       let data=  await giveAnsver(model).then(x=>{return x})
    //   setPage("home")

    }

    questionRender = questionAnsvers.map((item, key) => {

        let ansverList = [];



        ansverList = item.ansverList.map((item2, key2) => {
            let style = {
                touchableOpacityStyle: {
                    backgroundColor: "white",
                    flexDirection: "row",
                    padding: 4,
                    paddingRight: 10,
                    paddingLeft: 10,
                    margin: 3,
                    marginBottom:5,
                    borderWidth: 1,
                    borderColor: "black",
                    borderStyle: "dotted",
                    borderRadius: 5,
                    flex:1,
                    alignItems:"center",
                    textAlign:"center"
                    
                },
                emojiStyle: {
                    backgroundColor: "white",
                    padding: 4,
                    fontSize: 8
                }
            }

            let isSelect = ansver.filter((element, indx) => {
                return element.ansverId == item2.ansverId

            })
            if (isSelect.length > 0) {
                style.touchableOpacityStyle.backgroundColor = "#c8e6c9",
                    style.emojiStyle.backgroundColor = "green"
            }

            return (
                <View key={key2} style={{ flexDirection: "row" }}>
                    <TouchableOpacity style={style.touchableOpacityStyle} onPress={() => { giveAnsverList({ questionId: item.questionId, ansverId: item2.ansverId }) }}>
                         
                        <Emoji style={style.emojiStyle} name="white_check_mark"></Emoji>
                        <View><Text>&nbsp;</Text></View>
                        <Text style={{ fontSize: 12 }}> {item2.ansver}</Text>
                    </TouchableOpacity>
                </View >
            )

        })
        return (
            <LinearGradient colors={["#d1c4e9","#ede7f6","#d1c4e9"]} key={key} style={{
                padding: 5,
                backgroundColor: "white",
                margin: 5,
                borderRadius: 10,
                shadowOffset: {
                    width: 0,
                    height: 3,
                },
                shadowOpacity: 1,
                shadowRadius: 3,
                textAlign: "center",
                elevation: 8,
                marginBottom: 20,
                width:"92%",
                alignSelf:"center",
                borderWidth:1,
                borderColor:"black"


            }}>
                <View style={{
                    padding: 3

                }}>
                    <Text style={{ fontSize: 15 }}>

                        {key+1 +" - "+item.question}
                    </Text>
                </View>

                <View style={{ paddingLeft: 20 }}>
                    {ansverList}
                </View>
            </LinearGradient>

        )

    })
    if (pages == "home") {

        return (<Home></Home>)

    }

    return (<View style={{ height: "100%" }}>
        <View style={{ flexDirection: "row", backgroundColor: "#E4E4E3", marginBottom: 10 }}>
            <View style={{ alignSelf: "flex-start", flex: 1 }}>
                <CvpButton onPress={() => { props.navigation.navigate("Home")  }} emojiname="leftwards_arrow_with_hook" text="Geri"></CvpButton>

            </View>
            <View style={{ alignSelf: "flex-end", flex: 1 }}>
                <CvpButton emojiname="incoming_envelope" onPress={()=>{giveAnsverFunction()}} style={{ alignSelf: "flex-end" }} text="Cevapları Gönder"></CvpButton>

            </View>
        </View>

        <View>
            {questionRender}
        </View>

    </View>)

}

export default Ansver