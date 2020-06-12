import React, { useEffect, useState } from 'react'
import { getCategories, postQuestionCreate } from '../dataCrud/dataAction';
import { questionCategoriesList, questionCategories } from '../models/responseModels';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Url from '../constants/apiConstant';
import CvpButton from '../components/CvpButton';
import LinearGradient from 'react-native-linear-gradient';
import Emoji from 'react-native-emoji';
import { questionCreatorRequestModel } from '../models/requestModels';
import Questions from './Questions';
const QuestionCreate = (props) => {
    const [user, setUser] = useState(props.navigation.state.params.userData);

    const [questionCat, setQuestionsCat] = useState(questionCategoriesList);
    const [ansverCat, setAnsverCat] = useState([]);
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(questionCategories);
    const [selectedAnsver, setSelectedAnsver] = useState(null);
    const [modalShow, setModalShow] = useState(false);
    const [ansverModalShow, setAnsverModalShow] = useState(false);
    const [pages, setPage] = useState("current")




    let arr = []
    useEffect(() => {
        async function start() {
            var data = await getCategories().then((x) => { return x }).catch((x) => { return x })
            setQuestionsCat(data.data.data.categoryList);

        }
        start()

    }, [])
    let questionListMap = [];
    let ansverListMap = [];

    const selectCategory = async (data) => {
        setModalShow(true);
        setSelectedCategory(data)

    }
    const addQuestion = async () => {
        let request = questionCreatorRequestModel;
        request.Question = selectedQuestion.question;
        request.QuestionBankId = selectedQuestion.refId;
        request.Ansver = selectedAnsver.ansver;
        request.AnsverBankId = selectedAnsver.refId;

        if (props.navigation.state.params.refId != null) {
            request.refId = props.navigation.state.params.refId
        }


        const User = await postQuestionCreate(request).then((x) => { return x }).catch((x) => { return x })

        setUser(User.data.data)
        console.log("userBilgi", user)
        props.navigation.state.params.renderAndGoBack(User.data.data)
        props.navigation.navigate("Questions")

    }
    const selectQuestion = async (data) => {
        setAnsverModalShow(true);
        let ansvers = [];
        ansvers = selectedCategory.ansvers.filter(ansvers => {
            return ansvers.questionBankId == data.refId
        })
        setAnsverCat(ansvers)
        setSelectedQuestion(data)
    }

    questionListMap = selectedCategory.questions.map((item, key) => {
        return (

            <TouchableOpacity key={key} onPress={() => { selectQuestion(item) }} style={style.questionListStyle}>
                <Text>
                    {item.question}
                </Text>

            </TouchableOpacity>


        )
    })
    ansverListMap = ansverCat.map((item, key) => {

        return (

            <TouchableOpacity key={key} onPress={() => { setSelectedAnsver(item) }} style={style.questionListStyle}>
                {selectedAnsver == item && <Text style={{ color: "green", fontWeight: "bold" }}>
                    <Emoji name="white_check_mark" style={{ backgroundColor: "green" }}></Emoji>
                    &nbsp; &nbsp;
                     {item.ansver}</Text>}

                {selectedAnsver != item && <Text> {item.ansver}</Text>}


            </TouchableOpacity>


        )
    })
    arr = questionCat.map((item, key) => {
        return (

            <View style={{ backgroundColor: "red", width: 100, height: 100, margin: 10, alignSelf: "center" }}>

                <TouchableOpacity onPress={() => { selectCategory(item) }} key={key} >


                    <Image style={{ resizeMode: "contain", height: 100, width: 100 }} source={{ uri: Url.CATEGORYIMAGES + "/" + item.imageUrl }}></Image>
                    <Text>{item.categoriName}</Text>

                </TouchableOpacity>

            </View>



        )
    })
    if (pages == "questions") { return (<Questions values={user}></Questions>) }

    return (
        <View>
            <View style={{ flexDirection: "row", backgroundColor: "#E4E4E3" }}>

                <View style={{ alignSelf: "flex-start", flex: 1 }}>
                    <CvpButton onPress={() => { props.navigation.navigate("Questions", { userData: user }) }} emojiname="leftwards_arrow_with_hook" text="Geri"></CvpButton>

                </View>
            </View>

            <ScrollView style={{ flexDirection: "column", }}>
                <View style={{ flexDirection: "row", flexWrap: "wrap", width: 375, alignSelf: "center" }}>
                    {arr}
                </View>



            </ScrollView>



            {modalShow &&
                <View style={style.modalStyle}>

                    <View style={{ flexDirection: "row", backgroundColor: "#E4E4E3" }}>

                        <View style={{ alignSelf: "flex-start", flex: 1 }}>
                            <CvpButton onPress={() => { setModalShow(false) }} emojiname="leftwards_arrow_with_hook" text="Geri"></CvpButton>

                        </View>
                    </View>
                    <LinearGradient colors={["#b39ddb", "#ede7f6", "#b39ddb"]} style={style.titleAnsver}>
                        <Text style={style.questionName}>"{selectedCategory.categoriName}" </Text>
                        <Text style={style.questionNameLabel}>kategorisinden bir soru seçsenya</Text>
                    </LinearGradient>
                    <ScrollView style={style.modalScrolViewStyle}>
                        {questionListMap}

                    </ScrollView>
                </View>

            }

            {ansverModalShow &&
                <View style={style.ansverModalStyle}>

                    <View style={{ flexDirection: "row", backgroundColor: "#E4E4E3" }}>

                        <View style={{ alignSelf: "flex-start", flex: 1 }}>
                            <CvpButton onPress={() => { setAnsverModalShow(false); setSelectedAnsver(null) }} emojiname="leftwards_arrow_with_hook" text="Geri"></CvpButton>

                        </View>
                        {selectedAnsver != null && <View style={{ alignSelf: "flex-end", flex: 1 }}>
                            <CvpButton emojiname="+1" onPress={() => { addQuestion() }} style={{ alignSelf: "flex-end" }} text="Tamam"></CvpButton>

                        </View>}

                    </View>

                    <LinearGradient colors={["#80cbc4", "#b2fef7", "#80cbc4"]} style={style.titleAnsver}>
                        <Text style={style.questionName}>"{selectedQuestion.question}" </Text>
                        <Text style={style.questionNameLabel}>sorusunun cevabını seç bence {"\n"} (Yoksa nerden bileceğiz
                      &nbsp;{<Emoji name="woman-shrugging"></Emoji>}
                        )</Text>
                    </LinearGradient>




                    <ScrollView style={style.modalScrolViewStyle}>
                        {ansverListMap}

                    </ScrollView>
                </View>

            }
        </View>


    )

}
const style = StyleSheet.create({
    modalStyle: {
        position: "absolute",
        backgroundColor: "white",
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
        padding: 5,
        zIndex: 50
    },
    ansverModalStyle: {
        position: "absolute",
        backgroundColor: "white",
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
        padding: 5,
        zIndex: 999
    },
    modalScrolViewStyle: { paddingTop: 20 },
    questionListStyle: {
        alignSelf: "flex-start",
        marginBottom: 15,
        padding: 7,
        backgroundColor: "#e0f2f1",
        width: "100%",
        borderRadius: 5,
        borderColor: "black",
        borderStyle: "solid",
        borderWidth: 1
    },
    questionName: {
        fontSize: 15,
        fontWeight: "bold"
    },
    titleAnsver: {
        alignItems: "center",
        backgroundColor: "red",
        padding: 10,
        marginTop: 10,
        borderWidth: 2,
        borderStyle: "dashed",
        borderColor: "#003d33",
        borderRadius: 5

    }

})
export default QuestionCreate 