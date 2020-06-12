import React from 'react'
import { TextInput, StyleSheet, View, Text } from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import CvpButton from './CvpButton'

const CvpTextBox = (props) => {



    return (
        <View style={styles.view}>




    <Text>{props.labelText} </Text>
            <TextInput
                {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
                editable={true}
                maxLength={40}
                style={styles.textBox}
            />
          
        </View>
    );

}
const styles = StyleSheet.create({
    textBox: {
        backgroundColor: '#e2f1f8',
        borderRadius: 10,
        fontSize: 25,
        borderColor: '#4a0072',
        borderStyle:"solid",
        borderWidth:1,
        padding:10,
        textAlign:"center"
        

    },
    view:{
        padding:20
        
    },

})
export default CvpTextBox

