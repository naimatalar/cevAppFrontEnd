import React, { useState, useEffect } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native'
import CvpTextBoxMini from './CvpTextBoxMini';
import { format } from 'date-fns';
import Emoji from 'react-native-emoji';
import { TextInput } from 'react-native-gesture-handler';



const CvpDatePicker = (props) => {
    const [date, setDate] = useState(Date.now());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);


    let displayDate = null
    if (props.value != "Invalid Date") {
        displayDate = <TextInput style={styles.textInput} value={format(props.value, "dd-MM-yyyy")} editable={false} ></TextInput>;
    } else {
        displayDate = <TextInput style={styles.textInput} value={format(date, "dd-MM-yyyy")} editable={false} ></TextInput>
    }




    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        if (selectedDate) {

            props.onChangeText(selectedDate)

        }


    };

    const showMode = currentMode => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };



    return (
        <View>
            <TouchableOpacity onPress={showDatepicker} style={{ flexDirection: "row" }} >
                <View style={{
                    flexDirection: "column",  backgroundColor: "#c5cae9",
                    borderWidth: 1, borderColor: "black", borderStyle: "dotted", flex: 1,
                    borderRadius: 10

                }}>
                    {/* <CvpTextBoxMini  value={props.value} editable={false} ></CvpTextBoxMini> */}
                    <View style={{
                        position: "absolute",
                        alignSelf: "center",
                        top: -18,
                        backgroundColor: "white",
                        padding: 3,
                       borderColor:"black",
                       borderWidth:1,
                       borderStyle:"dotted",
                       borderRadius:15,
                       backgroundColor: "#ede7f6",
                     
                       


                    }}>
                        <Text style={{fontSize: 11,}}> Doğum Günün </Text>
                    </View>

                    <View style={{ flexDirection: "row", alignSelf: "center", alignItems: "center" }}>
                        <Emoji name="birthday" style={{ fontSize: 25, alignSelf: "center" }}></Emoji>
                        {displayDate}
                    </View>







                </View>
            </TouchableOpacity>
            {show &&
                <View style={{ flexDirection: "column", alignItems: "center", alignSelf: "center" }}>

                    <View>


                        <DateTimePicker
                            {...props}
                            mode="date"
                            //  is24Hour={true}
                            value={date}
                            onChange={onChange}


                        />
                    </View>
                </View>
            }
        </View>

    )

}
const styles = StyleSheet.create({
    textInput: {
        color: "black",


    }
})

export default CvpDatePicker