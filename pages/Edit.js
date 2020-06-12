import React, { useState } from 'react'
import { View, Text, Image, ScrollView, Dimensions } from 'react-native'
import { userModel } from '../models/responseModels'
import CvpDatePicker from '../components/CvpDatePicker'
import CvpImageButton from '../components/CvpImageButton'
import { SexualPreference, Sex, } from '../constants/enums'
import CvpButton from '../components/CvpButton'
import { postUserEdit, getCurrentUser } from '../dataCrud/dataAction'
import CvpTextBoxMini from '../components/CvpTextBoxMini'
import MyProfile from './MyProfile'
import { AlertModal } from '../components/Modals'
import LinearGradient from 'react-native-linear-gradient'
import Emoji from 'react-native-emoji'
import { connect } from 'react-redux'
import CvpButtonSelectable from '../components/CvpButtonSelectable'
import { TextInput } from 'react-native-gesture-handler'
import RangeSlider from 'rn-range-slider';






const Edit = (props) => {
    const [user, setUSerData] = useState(userModel)
    const [Isnext, setIsNext] = useState(false)
    const [distance, setDistance] = useState()
    const [isReadyPage, setIsReadyPage] = useState(false)


    React.useEffect(() => { getUser() }, [])
    const getUser = async () => {
        const User = await getCurrentUser().then(x => { return x }).catch(x => { return x })
        setUSerData(User.data.data)
        setDistance(User.data.data.distance == 0 ? 30 : User.data.data.distance)
        setIsReadyPage(true)
    }

    const saveUserEdit = async () => {
      
         user.distance= distance
        const data = await postUserEdit(user).then(x => { return x }).catch(x => { return x })
        console.log(data.data.isError)


        try {

            if (data.data.isError === false) {
                props.navigation.navigate("MyProfile", { userData: user })
                // setIsNext(true)

            } else {
                alert("Kayıt Yapılmadı")
            }

        } catch (error) {
            alert("Kayıt Yapılmadı Hata")
        }
    }

    if (Isnext && user != null) {
        console.log(user)
        // props.navigation.navigate("MyProfile",{userData:user})
        // return (<MyProfile values={user}></MyProfile>)
    } else {

        return (

            <View style={{ flex: 1, flexDirection: "column" }}>

                <ScrollView style={{ flexDirection: "column" }}>

                    <View>
                        <CvpButton align="flex-end" text="Tamam" emojiname="white_check_mark" onPress={() => saveUserEdit()}></CvpButton>

                    </View>



                    <View style={{ flexDirection: "row", alignSelf: "center", marginBottom: 15 }}>
                        <Image
                            style={{ width: 100, height: 100, alignSelf: "center", }}
                            source={require('../assets/pngLogo.png')}></Image>
                        <Image
                            style={{ width: 200, height: 58, alignSelf: "center" }}
                            source={require('../assets/cvpText.png')}></Image>
                    </View>


                    <View style={{ flexDirection: "column", flex: 1 }}>
                        <View style={{
                            marginBottom: 30, width: 300, alignSelf: "center", backgroundColor: "#ede7f6",
                            borderRadius: 10,
                            borderWidth: 1,
                            borderStyle: "dotted",
                            borderColor: "black"
                        }}>
                            <View style={{
                                position: "absolute",
                                alignSelf: "center",
                                top: -14,
                                backgroundColor: "white",
                                padding: 3,
                                borderColor: "black",
                                borderWidth: 1,
                                borderStyle: "dotted",
                                borderRadius: 15,
                                backgroundColor: "#efebe9"



                            }}>
                                <Text style={{ fontSize: 11, }}> Kullanıcı Adın </Text>
                            </View>

                            <TextInput value={user.userName} onChangeText={text => setUSerData((pr) => { return ({ ...pr, userName: text }) })} required
                                style={{ textAlign: "center", padding: 6 }}
                            ></TextInput>
                        </View>

                        <View style={{ width: 300, alignSelf: "center" }}>
                            <CvpDatePicker value={new Date(user.birthdate)} onChangeText={tx => setUSerData((pr) => { return ({ ...pr, birthdate: tx }) })}></CvpDatePicker>

                        </View>
                    </View>

                    <View style={{
                        marginBottom: 10, marginTop: 30, flexDirection: "column", alignSelf: "center",
                        backgroundColor: "white", padding: 10, paddingTop: 20,
                        borderRadius: 10,
                        borderWidth: 1,
                        borderStyle: "dotted",
                        borderColor: "black",
                        backgroundColor: "#c5cae9",
                        width: 300

                    }}>
                        <View style={{
                            position: "absolute",
                            alignSelf: "center",
                            top: -18,
                            backgroundColor: "white",
                            padding: 5,
                            borderColor: "black",
                            borderWidth: 1,
                            borderStyle: "dotted",
                            borderRadius: 15,
                            backgroundColor: "#ede7f6",




                        }}>
                            <Text style={{ fontSize: 11 }}> Cinsiyetin </Text>
                        </View>
                        <View style={{ flexDirection: "row", alignSelf: "center" }}>
                            <View style={{ marginBottom: 0, marginRight: 50 }}>
                                <CvpButtonSelectable buttonWidth={98} flex={1} select={user.sex === Sex.Famale} style={{ marginRight: 5 }} iconname="female_sign" linearColor={['#b4004e', '#ff77a9']} text="Kadın" onPress={() => setUSerData((pr) => { return ({ ...pr, sex: Sex.Famale }) })}></CvpButtonSelectable>
                            </View>
                            <View>
                                <CvpButtonSelectable buttonWidth={98} select={user.sex === Sex.Male} iconname="male_sign" linearColor={['#6e45e2', '#88d3ce']} text="Erkek" onPress={() => setUSerData((pr) => { return ({ ...pr, sex: Sex.Male }) })}></CvpButtonSelectable>

                            </View>
                        </View>

                    </View>


                    <View style={{
                        marginBottom: 10, marginTop: 30, flexDirection: "column", alignSelf: "center",
                        backgroundColor: "white", padding: 10, paddingTop: 20,
                        borderRadius: 10,
                        borderWidth: 1,
                        borderStyle: "dotted",
                        borderColor: "black",
                        backgroundColor: "#c5cae9",
                        width: 300

                    }}>
                        <View style={{
                            position: "absolute",
                            alignSelf: "center",
                            top: -18,
                            backgroundColor: "white",
                            padding: 5,
                            borderColor: "black",
                            borderWidth: 1,
                            borderStyle: "dotted",
                            borderRadius: 15,
                            backgroundColor: "#ede7f6",




                        }}>
                            <Text style={{ fontSize: 11 }}> Cinsel Tercihin </Text>
                        </View>
                        <View style={{ flexDirection: "row", alignSelf: "center" }}>
                            {/* <Text>Cinsel Tercih</Text> */}
                            <View style={{ marginBottom: 5, marginRight: 50 }}>

                                <CvpButtonSelectable select={user.sexualPreference === SexualPreference.Famale} style={{ marginRight: 5 }} iconname="female_sign" linearColor={['#b4004e', '#ff77a9']} text="Kadınlar" onPress={() => setUSerData((pr) => { return ({ ...pr, sexualPreference: SexualPreference.Famale }) })}></CvpButtonSelectable>
                            </View>
                            <View style={{ marginBottom: 5 }}>
                                <CvpButtonSelectable select={user.sexualPreference === SexualPreference.Male} style={{ marginRight: 5 }} iconname="male_sign" linearColor={['#6e45e2', '#88d3ce']} text="Erkekler" onPress={() => setUSerData((pr) => { return ({ ...pr, sexualPreference: SexualPreference.Male }) })}></CvpButtonSelectable>

                            </View>

                        </View>
                        <View style={{ flexDirection: "row", alignSelf: "center" }}>
                            <CvpButtonSelectable flex={1} buttonWidth={102} select={user.sexualPreference === SexualPreference.Both} iconname="rainbow-flag" linearColor={['#6e45e2', '#88d3ce']} text="İkiside" onPress={() => setUSerData((pr) => { return ({ ...pr, sexualPreference: SexualPreference.Both }) })}></CvpButtonSelectable>


                        </View>

                    </View>

                </ScrollView>

                <View style={{ flex: 1, flexDirection: "column" }}>
                    {isReadyPage &&


                        <View style={{ alignSelf: "center", flexDirection: "row", flex: 1, paddingBottom: 15 }}>
                            <View style={{ alignSelf: "flex-end", }}>


                                <RangeSlider
                                    style={{ width: 300, height: 60, marginBottom: 5 }}
                                    gravity={'center'}
                                    min={1}
                                    max={160}
                                    rangeEnabled={false}

                                    step={2}
                                    selectionColor="#af8eb5"
                                    blankColor="#babdbe"
                                    labelStyle="none"
                                    initialHighValue={distance}
                                    initialLowValue={distance}

                                    onValueChanged={(high, fromUser) => {
                                        setDistance(high)
                                        // setUSerData((pr) => { return ({ ...pr, distance: high }) })
                                    }} />
                                <Text style={{ textAlign: "center" }}> Mesafe :{distance} Km</Text>
                            </View>



                        </View>
                    }

                </View>
            </View >
        )

    }
}

const mapStateToProps = (state) => {
    return {
        notificationData: state.notificationData
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        change: () => dispatch({ type: "setNotificationData", payload: "data--dsfsd---sdf-s---sdf--sdf---s--" })
    }
}
// export default Chat
export default connect(mapStateToProps, mapDispatchToProps)(Edit)