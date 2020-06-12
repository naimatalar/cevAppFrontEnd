import React, { useEffect, useState } from "react"
import { View, Text, Dimensions } from "react-native"
import { getQuestionResultDetail } from "../dataCrud/dataAction"
import { ansverResultResponseModel } from "../models/responseModels";
import apiConstant from "../constants/apiConstant"
import { SliderBox } from "react-native-image-slider-box";
import Emoji from "react-native-emoji";

const AnsverResultDetail = (props) => {
    const [pageData, setPageData] = useState(ansverResultResponseModel);
    const [imageList, setImageList] = useState([])

    useEffect(() => {
        start()
    }, [])

    const start = async () => {
        console.log(props.navigation.state.params.ansverId)
        let result = await getQuestionResultDetail(props.navigation.state.params.ansverId).then(x => { return x }).catch(x => { return { error: "Error" } })
        setPageData(result.data.data)

        const img = []

        if (result.data.data.photos.length === 0) {

            setImageList([require('../assets/noImage.png')])
        } else {

            for (var i of result.data.data.photos) {

                img.push(apiConstant.USERIMAGES + "/" + i.url)
            }
            setImageList(img)
        }


    }

    let ansverMap = pageData.ansverList.map((item, index) => {

        let style = {
            ansverText: {
                color: "black",
                fontWeight: "bold",
                fontSize: 12

            }
        }
        if (item.isTrue) {
            style.ansverText.color = "green"
        } else {
            style.ansverText.color = "red"


        }
        return (
            <View key={index} style={{ flexDirection: "row" }}>
                <Text style={{ fontSize: 12, fontWeight: "bold" }}>{item.question}: </Text><Text style={style.ansverText}>{item.ansver} </Text>
                {item.isTrue == true ?
                    <Emoji name="heavy_check_mark" />
                    :
                    <Emoji name="x" />
                }
            </View>
        )
    })
    return (<View>

        <View style={{ flexDirection: "row", textAlign: "center" }}>


            <View style={{ flex: 1, }}>
                <SliderBox

                    images={imageList}
                    sliderBoxHeight={Dimensions.get('window').height}


                    onCurrentImagePressed={index => { }}

                />

            </View>
        </View>
        <View style={{
            flexDirection: "row",
            padding: 5,
            paddingRight: 15,
            paddingLeft: 15,

            alignItems: "center",
            position: "absolute",
            top: 0,
            backgroundColor: "#ffffffba",
            borderBottomRightRadius: 30,
            borderBottomLeftRadius: 30,
            alignSelf:"center"
            

        }}>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>{pageData.userName} </Text>
            <Text style={{ fontSize: 11 }}> <Emoji name="pushpin"></Emoji> {pageData.distince} uzaklıkta</Text>

        </View>

        <View style={{ position: "absolute", bottom: 60, padding: 10, backgroundColor: "#ffffffba", flex: 1 }}>

            {ansverMap}
        </View>

    </View>)
}

export default AnsverResultDetail