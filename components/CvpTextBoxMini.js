import React from 'react'
import { TextInput, StyleSheet, View, Text } from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import CvpButton from './CvpButton'

const CvpTextBoxMini = (props) => {



    return (
        <View style={styles.view}>




          
            <TextInput
                {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
               
                maxLength={40}
                style={styles.textBox}
                placeholder={props.labelText}
            />

        </View>
    );

}
const styles = StyleSheet.create({
    textBox: {
        // backgroundColor: '#e2f1f8',
        borderRadius: 10,
        fontSize: 15,
        borderColor: '#4a0072',
        borderStyle: "solid",
        borderBottomWidth: 1,
        padding: 5,
        textAlign: "center",
        flex: 1

    },
    view: {
        flexDirection: "row",
        


    },

})
export default CvpTextBoxMini

