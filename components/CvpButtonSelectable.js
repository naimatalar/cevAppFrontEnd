import React from 'react'
import { Button, TouchableOpacity, Text, View, StyleSheet } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCoffee, faHeart, faFemale, faMale, faCheck, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import Emoji from 'react-native-emoji';
import LinearGradient from 'react-native-linear-gradient';



const CvpButtonSelectable = (props) => {
    let selected = null
    let viewStyle = {
        paddingBottom: 5,
        paddingTop: 5,
        paddingRight: 10,
        alignItems: "flex-end",
        borderRadius: 10,
        borderColor: 1,
        borderStyle: "dotted",
        borderWidth: 1,
        borderColor: "black",



        width: props.buttonWidth || 115,


    };
    if (props.select === true) {

        selected =
        <Text style={{ alignSelf: "center" ,flexDirection:"column",backgroundColor:"green",padding:1}}>
        <Emoji style={{ fontSize: 10 ,}} name="white_check_mark" ></Emoji>

    </Text>
    }else{

            selected =
        <Text style={{ alignSelf: "center" ,flexDirection:"column",padding:1}}>
        <Emoji style={{ fontSize: 10 ,}} name="white_check_mark" ></Emoji>
        </Text>
    }

    return (


        <TouchableOpacity {...props} style={styles.opacityStyle}>
           
            <LinearGradient colors={["white", "white"]} style={viewStyle} >
                <View style={{ flexDirection: "row" }}>
                   {selected}
                    <Emoji name={props.iconname} style={{ fontSize: 20, alignSelf: "center" }}></Emoji>
                    <Text style={{ alignSelf: "center" }}>{props.text}</Text>

                </View>
            </LinearGradient>
        </TouchableOpacity>

    )
}
const styles = StyleSheet.create({
    selectedCheck: {
        position: "absolute",
        zIndex: 5,
        marginLeft: 0,
        width: 20,
        height: 20,
        padding: 3,
        backgroundColor: "green",
        textAlign: "center",
        borderColor: "black",
        borderStyle: "solid",
        borderWidth: 1,
        borderRadius: 5,
        left: -5,
        top: -5

    },
    opacityStyle: {
        backgroundColor: "#fdfdfd63",
        fontWeight: "bold",
        flexDirection: "row",
        textAlign: "center",
        borderRadius: 20
    }

})

export default CvpButtonSelectable