import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Modal from 'react-native-modal';
import { ModalType } from '../constants/enums'
import Emoji from 'react-native-emoji';
import CvpButton from './CvpButton';
export const AlertModal = (props) => {

    let modalTitle;
    
    if (props.type == "error") {
        modalTitle = <View style={{ borderBottomWidth: 2, borderStyle: "solid", borderColor: "red", backgroundColor: "#fce4ec" }}>
            <Text style={{ color: "red", fontSize: 13, fontWeight: "bold", paddingBottom: 7, paddingTop: 5, paddingLeft: 5 }}>
                <Emoji name="no_entry" style={{ fontSize: 13 }}></Emoji>

            &nbsp; {props.title}</Text>
        </View>
    } else if (props.type == "success") {
        modalTitle = <View style={{ borderBottomWidth: 2, borderStyle: "solid", borderColor: "green", backgroundColor: "#b2dfdb" }}>
            <Text style={{ color: "green", fontSize: 13, fontWeight: "bold", paddingBottom: 7, paddingTop: 5, paddingLeft: 5 }}>
                <Emoji name="white_check_mark" style={{ fontSize: 13, backgroundColor: "green", marginTop: 3 }}></Emoji>

            &nbsp; {props.title}</Text>

        </View>
    }
    return (


        <View>
            <Modal isVisible={props.show}>
                <View style={{ flexDirection: "row" }}>
                    <View>

                    </View>
                    <View style={styles.container}>
                        {modalTitle}


                        <View style={{flexDirection: "row", alignSelf: "center"}} >

                            <CvpButton style={{ backgroundColor: "grey", width: 60,marginRight:5  }}  emojiname="ok_hand" text="Ok"></CvpButton>

                            <CvpButton style={{ backgroundColor: "grey", width: 60, flexDirection: "row", alignSelf: "center" }} emojiname="ok_hand" text="Ok"></CvpButton>
                        </View>
                    </View>
                    <View></View>

                </View>
            </Modal>
        </View>

    )


}
const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flex: 1,
        height: 200,
        borderStyle: "solid",
        padding: 10



    }

})