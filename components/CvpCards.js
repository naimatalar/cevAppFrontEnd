import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native'
import apiConstant from '../constants/apiConstant'
import { cardModel } from '../models/responseModels'
import LinearGradient from 'react-native-linear-gradient'
import Emoji from 'react-native-emoji'
const CvpCards = (props) => {
  const [imageChanges, setImageChange] = useState(null)
  let model = null;

  const [imageIndex, setImageIndex] = useState(0)
  const [imageLine, setImageLine] = useState([])
  let imageLineFirs = []

  useEffect(() => {

    setImageChange(null)
    setImageIndex(0)
    setImageLine(imageLineFirs)
  }, [props])


  const start = () => {



    // setModel(cardModel)

  }

  cardModel.user = props.data;


  if (props.data.photos.length > 0) {

    var ph = props.data.photos.sort((a, b) => parseFloat(a.order) > parseFloat(b.order));


    let imageMap = []
    imageMap = ph.map((item, key) => {
      return ({ url: apiConstant.USERIMAGES + "/" + item.url, index: key, imageName: item.url })
    })
    cardModel.allImages = imageMap
    cardModel.currnetImageUrl = { uri: imageMap[0].url }

    imageLineFirs = props.data.photos.map((item, key) => {

      if (key == 0) {
        return (<View key={key} style={styles.activePhoto}></View>)
      } else {
        return (<View key={key} style={styles.pasivePhoto}></View>)

      }

    })



  } else {
    cardModel.currnetImageUrl = require('../assets/noImage.png')

  }

  model = cardModel

  const imageChange = async () => {
    if (props.data.photos.length == 0) {

      return false
    }
    if ((model.allImages.length - 1) > imageIndex) {
      let imageIn = imageIndex + 1
      setImageIndex(imageIn)
      setImageChange(model.allImages[imageIn].url)

      setImageLine(props.data.photos.map((item, key) => {

        if (item.url == model.allImages[imageIn].imageName) {
          return (<View key={key} style={styles.activePhoto}></View>)
        } else {
          return (<View key={key} style={styles.pasivePhoto}></View>)

        }

      }))
    }

  }

  const imagePrew = async () => {
    if (props.data.photos.length == 0) {
      return false
    }
    if (imageIndex > 0) {

      let imageIn = imageIndex - 1
      setImageIndex(imageIn)
      setImageChange(model.allImages[imageIn].url)

      setImageLine(props.data.photos.map((item, key) => {

        if (item.url == model.allImages[imageIn].imageName) {
          return (<View key={key} style={styles.activePhoto}></View>)
        } else {
          return (<View key={key} style={styles.pasivePhoto}></View>)

        }

      }))
    }

  }
  return (
    <View style={[styles.card]}>



      <View style={styles.panel}>

        <View style={{ flexDirection: "row", position: "absolute", height: 5, width: "97%", zIndex: 9999, top: 5 }}>


          {imageLine.length > 0 && imageLine}


        </View>


        {imageChanges == null &&
          <Image style={styles.image} source={model.currnetImageUrl}></Image>

        }

        {imageChanges != null &&
          <Image style={styles.image} source={{ uri: imageChanges }}></Image>

        }
        <View style={{ position: "absolute", bottom: 1, flexDirection: "row" }}>
          <LinearGradient colors={["#fff0","#000000b8","#000000cc"]} style={{ flex: 1, flexDirection:"column",paddingBottom:5 }}>
                  <View style={{flex:1 }}>
              <Text style={styles.userInfo}> <Text style={styles.userName}>{props.data.userName}  </Text>{props.data.birthDate}</Text>

            </View>
            <View style={{flex:1}}>
              
              <Text style={styles.distinceLabel}><Emoji name="pushpin"></Emoji>{props.data.distinceKm} uzaklıkta</Text>

            </View>
      
          </LinearGradient>

        </View>

      </View>


      <View style={{ position: "absolute", zIndex: 999, flexDirection: "row", height: "100%", width: "100%" }}>

        <TouchableOpacity onPress={() => { imagePrew() }} style={{ flex: 1, }}>
          <Text style={{ fontSize: 60 }}>
            {/* {model.user.userName} - {model.allImages.length} / {imageIndex} */}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity key={564165} onPress={() => { imageChange() }} style={{ flex: 1, }}>
          <Text style={{ fontSize: 60 }}>
            {/* {model.user.userName} - {model.allImages.length} / {imageIndex} */}
          </Text>
        </TouchableOpacity>
      </View>


    </View>


  )

}



const styles = StyleSheet.create({
  card: {

    // justifyContent: 'center',
    // alignItems: 'center',
    width: 400,
    flex:1
    // height: "95%",
 

  },
  image:{
     
     top: 0, 
     height: Dimensions.get("window").height-140,
      width: Dimensions.get("window").width-20,
       alignSelf: "center", 
       borderRadius: 5 
  },
  panel: {
    position: "absolute", alignItems: "center", alignSelf: "center", backgroundColor: "white", borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 110,
    shadowRadius: 9.51,
 
    elevation: 15,
  },
  noMoreCardsText: {
    fontSize: 22,
  },
  distinceLabel: {
    marginLeft:10,
    marginBottom:10 ,
    margin:5,
  
    fontSize: 18,
    
    // backgroundColor: "#ffffffab",
    color:"white",
    
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  //  borderColor:"black",
  //  borderStyle:"dashed",
  //  borderWidth:1,
  //  borderBottomColor:"white",
  //  borderStyle:"solid",
   alignSelf:"flex-start",
   
 
  },
  userName:{
    fontWeight:"bold",
    fontSize:19,
    textShadowOffset:{width:1,height:1},
    textShadowRadius:1,
    textShadowColor:"black"
    
  },
  userInfo:{
    // backgroundColor:"#8e24aa",
    // textAlign:"center",
    alignSelf:"flex-start",
     marginTop:70,
    fontSize:15,
    marginLeft:10,
 
    // padding:7,
    // paddingLeft:7,
    // paddingRight:7,
    // borderRadius:15,
    color:"white"
  },

  activePhoto: {
    backgroundColor: "#ffffffde",
    flex: 1,
    marginRight: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#757575"
  },
  pasivePhoto: {
    backgroundColor: "#ffffff6b", flex: 1, marginRight: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#757575"
  }
})
export default CvpCards