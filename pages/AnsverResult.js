import React, { useState, useEffect } from "react"
import { getQuestionResult } from "../dataCrud/dataAction"
import { View, Text, StyleSheet, Image, Dimensions } from "react-native"
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler"
import Emoji from "react-native-emoji"
import LinearGradient from "react-native-linear-gradient"

const AnsverResult = (props) => {

    const [loading, setLoading] = useState(false)
    const [resultList, setResultList] = useState([])
    const [hasData, setHasData] = useState(false)

    useEffect(() => {
        start();


    }, [])
    const start = async () => {
        const result = await getQuestionResult().then(x => { return x })
        if (!result.data.isError) {
            setHasData(true)
            console.log(result.data.isError)
            setResultList(result.data.data)
        } else {

        }


        setLoading(false)

    }
    const selectAnsver=(item,index)=>{
        let result={}
         const newList=resultList.filter((item2,index2)=>{

            if(item2.Id==item.Id)
            {
                item.isRead=true
                result=item
            } 
            return item2.Id!==item.Id
         })

         newList.push(result)
         setResultList(newList)
        props.navigation.navigate("AnsverResultDetail", { ansverId: item.id });
    }

    let ansverlistMap = resultList.map((item, index) => {

        return (

            <View key={index} style={styles.listMasterView}>

                <View >
                    {!item.isRead &&
                        <Image source={require('../assets/yeni_icon.png')} style={{
                            width: 30, height: 33, resizeMode: "contain", position: "absolute",
                            left: -17,
                            top: -25
                        }}></Image>
                    }

                    <View style={{ position: "absolute", right: 1, zIndex: 999 }}>
                        <LinearGradient colors={["#81d4fa", "#e1f5fe", "#e1f5fe", "#81d4fa"]}
                            style={{
                                borderStyle: "dotted",
                                padding: 5,
                                marginTop: 5,
                                borderRadius: 10,
                                borderWidth: 1,
                                borderColor: "#3f51b5"
                            }}>
                            <TouchableOpacity onPress={() => {selectAnsver(item,index) }}>
                                <Text style={{ fontSize: 12, fontWeight: "bold", color: "black" }}>
                                    <Emoji name="eye" ></Emoji>
                                         &nbsp;İNCELE</Text>
                            </TouchableOpacity>
                        </LinearGradient>
                    </View>
                </View>
                <View style={{ flexDirection: "row" }}>
                    <View>
                        <Image source={require('../assets/smallicon.png')} style={{
                            width: 30, height: 38, resizeMode: "contain", marginRight: 5
                        }}></Image>
                    </View>
                    <View>
                        <Text style={{ fontWeight: "bold" }}>{item.ansverFromUserName}</Text>
                        <Text style={{ fontSize: 10 }}>
                            Sorularını cevapladı. {!item.allTrue && <Text style={{ fontWeight: "bold" }}>{item.trueReturn} doğrusu var.</Text>}
                            {item.allTrue && <Text style={{ fontWeight: "bold", color: "green" }}>
                                <Emoji name="open_mouth"></Emoji> Hepsi doğru
                                        </Text>}
                        </Text>
                    </View>
                </View>

            </View>
        )
    })

    return (
        <View style={{ backgroundColor: "white" }}>
            {loading && <View>
                <Text>
                    loading</Text>
            </View>}
            <View style={{ flexDirection: "column" }}>
                <View style={{ height: 100 }}>
                    <View style={{ flexDirection: "row", alignSelf: "center", margin: 10 }}>
                        <Image source={require('../assets/smallicon.png')} style={{
                            width: 40, height: 50, resizeMode: "contain", marginRight: 1, alignSelf: "center"
                        }}></Image>
                        <Image source={require('../assets/cvpText.png')} style={{
                            width: 130, height: 47, resizeMode: "contain", marginRight: 5, alignSelf: "center"
                        }}></Image>

                    </View>
                    <View style={{ marginTop: -10, marginBottom: 10 }}>
                        <Text style={{
                            textAlign: "center", fontSize: 10, fontWeight: "bold", textDecorationLine: "underline",
                            color: "grey"

                        }}>Aldığın cevapları aşağıda listeledim...</Text>
                    </View>
                </View>


                <ScrollView style={{
                    flexDirection: "column",
                    height: Dimensions.get("window").height - 100,
                    backgroundColor: "white",
                    shadowColor: "#000",
                    padding: 10,
                    overflow: "hidden",
                    shadowOffset: {
                        width: 0,
                        height: 10,
                    },
                    shadowOpacity: 1,
                    shadowRadius: 10,

                    elevation: 9,
                }}  >
                    <View style={{ paddingBottom: 50 }}>
                        {ansverlistMap}

                    </View>



                </ScrollView>

            </View>



        </View>

    )

}
const styles = StyleSheet.create({
    listMasterView: {
        borderWidth: 1,
        borderColor: "grey",
        padding: 10,
        width: "90%",
        alignSelf: "center",
        marginTop: 17,
        borderRadius: 10,
        backgroundColor: "white",
        flexDirection: "column",
        position: "relative"
    }

})
export default AnsverResult