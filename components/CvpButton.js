import React from 'react'
import { Button, StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Emoji from 'react-native-emoji'


const CvpButton = (props) => {
    let viewStyle = {
        viewContent: {
            textAlign: "center",
            padding: 10,
            flexDirection: "row",
            alignSelf: "center"
        }
    }   
    


    viewStyle.viewContent.alignSelf = props.align;
    return (

        <View style={styles.viewContent}>
         
            <TouchableOpacity {...props}>
                <View style={viewStyle.viewContent} >


                    <Text style={{ color: 'black', textAlign: "center" }}>
                       <Emoji name={props.emojiname} style={{ fontSize: 15,...props.emojiStyle }}></Emoji> {props.text}</Text>
                </View>

            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        fontSize: 30,
        textAlign: "center",
        marginTop: 50,
        flex: 1,
        fontSize: 50,
        padding: 5,

    },



})

export default CvpButton