import React from 'react'
import { Button, TouchableOpacity, Text, View, StyleSheet } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCoffee, faHeart, faFemale, faMale, faCheck, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import Emoji from 'react-native-emoji';
import LinearGradient from 'react-native-linear-gradient';



const CvpImageButton = (props) => {
    let selected = null
     let viewStyle={  
               width: 70,
        height: 70,
        paddingTop: 5,
        alignItems: "center",
        borderRadius: 10,
        borderColor: 1,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "black"};
    if (props.select === true) {
     viewStyle.borderWidth=3
        selected =
            <Text style={styles.selectedCheck}>
                <Emoji style={{ fontSize: 10 }} name="white_check_mark" ></Emoji>

            </Text>
    }

    return (


        <TouchableOpacity {...props} >
            {selected}
            <LinearGradient colors={props.linearColor} style={viewStyle} >

                <Emoji name={props.iconname} style={{ fontSize: 30 }}></Emoji>
                <Text style={{ width: 65, backgroundColor: "#fdfdfd63", fontWeight: "bold", flexDirection: "row", textAlign: "center" }}>{props.text}</Text>
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
        padding: 5,
        backgroundColor: "green",
        textAlign: "center",
        borderColor: "black",
        borderStyle: "solid",
        borderWidth: 1

    }
})

export default CvpImageButton