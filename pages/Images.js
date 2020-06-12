import React, { useState, useEffect } from 'react'
import ImagePicker from 'react-native-image-crop-picker';
import { View, Dimensions, Image, StyleSheet, TouchableOpacity, Text, ScrollView } from 'react-native';
import CvpButton from '../components/CvpButton';
import { postUserImage, getCurrentUser, getCurrentProfile, deleteImage, imageOrder } from '../dataCrud/dataAction';
import apiConstant from '../constants/apiConstant'
import Emoji from 'react-native-emoji';
import { userModel } from '../models/responseModels';
import { UserRequestType } from '../constants/enums';
import SortableGrid from 'react-native-sortable-grid'
import MyProfile from './MyProfile';
import LinearGradient from 'react-native-linear-gradient';

const Images = (props) => {
    const [user, SetUser] = useState(props.navigation.state.params.userData)
    const [photos, setUsetphoto] = useState(props.navigation.state.params.userData.photos)
    const [deletePopup, setDeletePopUp] = useState({ show: false, data: null })
    const [pages, setPage] = useState("current")




    let imagesContainer = []

    const uploadImage = async () => {
        await ImagePicker.openPicker({
            width: 400,
            height: 600,
            cropping: true
        }).then(async (image) => {
            await postUserImage(image).then(x => { return x })
            const Photo = await getCurrentUser().then(x => { return x }).catch(x => { return x })


            await SetUser(Photo.data.data)
           await  setUsetphoto(Photo.data.data.photos)
           console.log(Photo.data.data.photos.length)
            props.navigation.state.params.onGoBack(Photo.data.data)
        });

    }

    const _deleteImage = async (data) => {
        const DataParse = {
            "userId": data.userId,
            "refId": data.refId
        }
        const Photo = await deleteImage(DataParse).then(x => { return x })

        await setUsetphoto(Photo.data.data.photos)

        await SetUser(Photo.data.data)
        console.log(Photo.data.data.photos.length)
        props.navigation.state.params.onGoBack(Photo.data.data)

    }



    let cntr = 1;
    let viewData = []

    imagesContainer = photos.map((item, key) => {

        return (

            <View id={item.refId} key={item.refId} style={{ width: 130, height: 130, padding: 5 }} >



                <View style={styles.imagesItem}>
                    <Image style={{ resizeMode: "contain", height: 119, width: 120, alignSelf: "center" }} source={{ uri: apiConstant.USERIMAGES + "/" + item.url }}></Image>
                </View>
                <TouchableOpacity key={key} onPress={(c) => { setDeletePopUp({ show: true, data: item }); }}
                    style={{
                        right: 5, position: "absolute",
                        backgroundColor: "white",
                        zIndex: 999,
                        alignSelf: "flex-end",
                        borderColor: "black",
                        borderWidth: 2,
                        borderRadius: 20,
                        padding: 5,
                        borderStyle: "solid"
                    }} >
                    <Image
                        style={{ width: 20, height: 20, alignSelf: "center" }}
                        source={require('../assets/trash.png')}></Image>
                </TouchableOpacity>

            </View>)
    }
    )
    const itemCount = async (item) => {


        let imageIds = []
        for (let index of item.itemOrder) {
            imageIds.push(index.key)

        }
        const Photo = await imageOrder(imageIds).then(x => { return x }).catch(x => { return x })


        SetUser(Photo.data.data)
        setUsetphoto(Photo.data.data.photos)
    }
    if (pages == "profile") {

        return (<MyProfile values={user}></MyProfile>)
    }


    return (
        <View style={{ flex: 1 }}>


            <ScrollView style={{ flexDirection: "column", backgroundColor: "#E4E4E3" }}>



                <View style={{ flexDirection: "row", backgroundColor: "white" }}>
                    <View style={{ alignSelf: "flex-start", flex: 1 }}>
                        {(photos.length < 9) &&
                            <View key="cont22">
                                <TouchableOpacity onPress={uploadImage}>
                                    <LinearGradient colors={["#bdbdbd", "#eeeeee", "#bdbdbd", "#e0e0e0"]} style={styles.uploadNew}>
                                        {/* <Emoji name="heavy_plus_sign" style={{  opacity: 0.6, fontSize: 27, alignSelf: "center", marginTop: 0 }}></Emoji> */}
                                        <Text style={styles.uploadNewText}>+
                                Ekle</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>}

                    </View>
                    <View style={{ alignSelf: "flex-end", flex: 1 }}>
                        <TouchableOpacity onPress={() => { props.navigation.navigate("MyProfile", { userData: user }) }} style={{ alignSelf: "flex-end", width: 110 }}>
                            <LinearGradient colors={["#bdbdbd", "#eeeeee", "#bdbdbd", "#e0e0e0"]} style={styles.uploadNew}>
                                <Emoji name="ok_hand" style={{ opacity: 0.6, fontSize: 15, alignSelf: "center", marginTop: 0 }}></Emoji>
                                <Text style={styles.uploadNewText}>
                                    Tamam</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        {/* <CvpButton onPress={() => { setPage("profile") }} emojiname="ok_hand"  text="Tamam"></CvpButton> */}

                    </View>
                </View>
                <View >
                    <View style={{ padding: 15 }}>

                        <View style={{
                            padding: 3,
                            borderTopEndRadius: 90,
                            borderBottomStartRadius: 90,
                            borderStyle: "dotted",
                            borderWidth: 2,
                            borderColor: "black"
                        }}>
                            <Text style={{
                                textAlign: "center",
                                fontSize: 12

                            }}>9 Tane fotoğraf ekleyebiliyorsun <Emoji name="sunglasses"></Emoji></Text>

                        </View>


                    </View>
                    <View>
                        {
                            photos.length > 0 == false &&
                            <View>
                                <TouchableOpacity onPress={uploadImage}
                                    style={{
                                        width: 220, padding: 9, height: 270, borderRadius: 20, borderStyle: "dotted",
                                        borderColor: "Black",
                                        borderWidth: 2,
                                        alignSelf: "center",
                                        marginTop: 50,
                                        paddingTop: 45,
                                        backgroundColor: "red"

                                    }}
                                >

                                    <Text
                                        style={{ fontSize: 25, textAlign: "center", fontWeight: "bold" }}>Hiç resmin yok {"\n"}
                                        <Text style={{ fontSize: 60, fontWeight: "100" }}>
                                            <Emoji style={{ marginBottom: 20 }} name="scream"></Emoji>
                                        </Text>{"\n"}
                                        Dokun Ekle{"\n"}
                                        <Text style={{ fontSize: 45, fontWeight: "Bold" }}>+</Text>
                                    </Text>


                                </TouchableOpacity>



                            </View>
                        }
                    </View>


                    <SortableGrid itemsPerRow={3}
                        onDragRelease={(dat) => { itemCount(dat) }}
                    >
                        {
                            imagesContainer
                        }
                    </SortableGrid>

                    {
                        // (photos.length < 9) && (photos.length > 0) &&
                        // <View key="cont22">
                        //     <TouchableOpacity onPress={uploadImage}>
                        //         <LinearGradient colors={["#bdbdbd", "#eeeeee", "#bdbdbd", "#e0e0e0"]} style={styles.uploadNew}>
                        //             {/* <Emoji name="heavy_plus_sign" style={{  opacity: 0.6, fontSize: 27, alignSelf: "center", marginTop: 0 }}></Emoji> */}
                        //             <Text style={styles.uploadNewText}>+
                        //         Ekle</Text>
                        //         </LinearGradient>
                        //     </TouchableOpacity>
                        // </View>



                    }

                </View>
                {deletePopup.show && <View style={{ position: "absolute", width: Dimensions.get('window').width, backgroundColor: "#cfd8dc", flexDirection: "column", flex: 2, padding: 20 }}>
                    <TouchableOpacity onPress={async () => { setDeletePopUp(false) }} style={{ flex: 1, backgroundColor: "#e0f2f1", padding: 15, alignItems: "center", borderColor: "black", borderStyle: "solid", borderWidth: 1, marginBottom: 20, borderRadius: 10 }}>
                        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Vazgeç</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { _deleteImage(deletePopup.data); setDeletePopUp(false) }} style={{ flex: 1, backgroundColor: "#ef5350", padding: 15, alignItems: "center", borderColor: "black", borderStyle: "solid", borderWidth: 1, borderRadius: 10 }}>
                        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Sil</Text>
                    </TouchableOpacity>
                </View>}

            </ScrollView>
            <View style={{
                flexDirection: "row",
                padding: 10,
                borderWidth: 2,
                borderColor: "black",
                borderStyle: "dotted",
                borderTopEndRadius: 90,
                borderBottomStartRadius: 90,
                width: Dimensions.get("window").width - 30,
                alignSelf: "center",
                marginBottom: 10,
                marginTop: 10
            }} >
                <Text style={{ flex: 1, }}></Text>
                <Text style={{ flex: 4, fontSize: 12 }}>Resmine uzun süre dokunursan  {"\n"}sürükleyip sırasını değişirebilirsin  <Emoji name={"wink"}></Emoji> </Text>
                <Text style={{ flex: 1 }}></Text>
            </View>
        </View>
    )


}
const styles = StyleSheet.create({

    imagesItem: {
        width: 110,
        height: 120,
        borderWidth: 2,
        borderColor: "black",
        borderStyle: "dotted",

        alignContent: "center",

        borderRadius: 10,



    },
    uploadNew: {


        flexDirection: "row",
        margin: 5,
        borderRadius: 40,
        flex: 1,


        borderColor: "blue",
        borderWidth: 2,
        borderStyle: "dotted",
        justifyContent: "center",
        padding: 0,
        borderColor: "black",
        marginTop: 10,
        width: 100,

    },
    uploadNewText:
    {


        textAlign: "center",
        marginTop: 0,
        color: "black",
        textShadowColor: "white",
        textShadowOffset: { width: 1, height: 2 }, textShadowRadius: 5,

    }

})

export default Images