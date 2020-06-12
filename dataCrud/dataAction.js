import React, { useState } from 'react'
import Axios from 'axios'
import apiConstant from '../constants/apiConstant'
import AsyncStorage from '@react-native-community/async-storage'
import { setTokenAsync, getTokenAsync } from '../dataCrud/auth'
import ImgToBase64 from 'react-native-image-base64';



export const registerOrCheck = async (data) => {

    // console.log(data)
    var headers = {
        'Content-Type': 'application/Json'
    }
    return Axios.post(apiConstant.USER_REGISTER, data, headers)
}

export const getTokenBack = async (data) => {
    var headers = {
        'Content-Type': 'application/Json'
    }
    return Axios.post(apiConstant.GET_TOKEN, data, headers)

}




export const getLoginCheck = async () => {

    const token = await getTokenAsync()

    const headers =
    {
        headers: {
            'Content-Type': 'application/Json',
            Authorization: 'Bearer ' + token
        }
    }
    return Axios.post(apiConstant.USER_LOGIN, null, headers);

}
export const getCurrentUser = async () => {

    const token = await getTokenAsync()

    const headers =
    {
        headers: {
            'Content-Type': 'application/Json',
            Authorization: 'Bearer ' + token
        }
    }
    return Axios.get(apiConstant.GET_CURRENT_USER, headers);

}
export const getCategories = async () => {

    const token = await getTokenAsync()

    const headers =
    {
        headers: {
            'Content-Type': 'application/Json',
            Authorization: 'Bearer ' + token
        }
    }
    return Axios.get(apiConstant.GET_CATEGORİES, headers);

}
export const postQuestionCreate = async (data) => {

    const token = await getTokenAsync()

    const headers =
    {
        headers: {
            'Content-Type': 'application/Json',
            Authorization: 'Bearer ' + token
        }
    }
    return Axios.post(apiConstant.QUESTION_CREATE, data, headers);
}
export const listUser = async (data) => {

    const token = await getTokenAsync()

    const headers =
    {
        headers: {
            'Content-Type': 'application/Json',
            Authorization: 'Bearer ' + token
        }
    }
    return Axios.post(apiConstant.LIST_USER, data, headers);
}
export const swipeRecord = async (data) => {

    let serializeData = {
        "SwippedUserId": data
    }
    const token = await getTokenAsync()

    const headers =
    {
        headers: {
            'Content-Type': 'application/Json',
            Authorization: 'Bearer ' + token
        }
    }
    return Axios.post(apiConstant.SWIPE_RECORD, serializeData, headers);
}



export const postUserEdit = async (data) => {

    const token = await getTokenAsync()

    const headers =
    {
        headers: {
            'Content-Type': 'application/Json',
            Authorization: 'Bearer ' + token
        }
    }

    return Axios.post(apiConstant.USER_EDIT, data, headers);

}
export const getCurrentProfile = async (data) => {

    const parseData = { type: data }

    const token = await getTokenAsync()

    const headers =
    {
        headers: {
            'Content-Type': 'application/Json',
            Authorization: 'Bearer ' + token
        }
    }

    return Axios.post(apiConstant.GET_CURRENT_PROFILE, parseData, headers);

}
export const deleteImage = async (data) => {
    const token = await getTokenAsync()

    const headers =
    {
        headers: {
            'Content-Type': 'application/Json',
            Authorization: 'Bearer ' + token
        }
    }

    return Axios.post(apiConstant.DELETE_IMAGE, data, headers);

}
export const getMessageUserList = async () => {
    const token = await getTokenAsync()

    const headers =
    {
        headers: {
            'Content-Type': 'application/Json',
            Authorization: 'Bearer ' + token
        }
    }

    return Axios.get(apiConstant.GET_MESSAGE_USER_LIST, headers);

}

export const imageOrder = async (data) => {
    const token = await getTokenAsync()
    const parseData = { refIds: data }
    console.warn(parseData)
    const headers =
    {
        headers: {
            'Content-Type': 'application/Json',
            Authorization: 'Bearer ' + token
        }
    }

    return Axios.post(apiConstant.IMAGE_ORDER, parseData, headers);

}

export const postUserImage = async (data) => {

    var base64S = await ImgToBase64.getBase64String(data.path)
        .then(base64String => { return base64String })
        .catch(err => doSomethingWith(err));
    const body = {
        base64String: base64S,
        type: data.mime
    }
    const token = await getTokenAsync()
    const headers =
    {
        headers: {

            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/Json',
        }
    }
    return Axios.post(apiConstant.POST_USER_IMAGE_base64, body, headers);

}
export const getQuestionAnsver = async (data) => {
    const token = await getTokenAsync()
    const parseData = { userId: data }

    const headers =
    {
        headers: {
            'Content-Type': 'application/Json',
            Authorization: 'Bearer ' + token
        }
    }

    return Axios.post(apiConstant.GET_QUESTION_ANSVER, parseData, headers);

}
export const giveAnsver = async (data) => {
    const token = await getTokenAsync()
    const headers =
    {
        headers: {
            'Content-Type': 'application/Json',
            Authorization: 'Bearer ' + token
        }
    }

    return Axios.post(apiConstant.GIVE_ANSVER, data, headers);

}

export const readMessage = async (data) => {
    const token = await getTokenAsync()
    const parseData = { userId: data }

    const headers =
    {
        headers: {
            'Content-Type': 'application/Json',
            Authorization: 'Bearer ' + token
        }
    }

    return Axios.post(apiConstant.READ_MESSAGE, parseData, headers);

}


export const getAllMessage = async (data) => {

    const token = await getTokenAsync()
    const parseData = { userId: data }
    console.log(parseData)
    const headers =
    {
        headers: {
            'Content-Type': 'application/Json',
            Authorization: 'Bearer ' + token
        }
    }
    return Axios.post(apiConstant.GET_ALL_MESSAGE, parseData, headers);
}
export const getUnreadMessageCount = async () => {

    const token = await getTokenAsync()
    const headers =
    {
        headers: {
            'Content-Type': 'application/Json',
            Authorization: 'Bearer ' + token
        }
    }
    return Axios.get(apiConstant.GET_UNREADMESSAGE_COUNT, headers);
}
export const getQuestionResult = async () => {

    const token = await getTokenAsync()
    const headers =
    {
        headers: {
            'Content-Type': 'application/Json',
            Authorization: 'Bearer ' + token
        }
    }
    return Axios.get(apiConstant.GET_QUESTIONRESULT, headers);
}
export const getQuestionResultDetail = async (data) => {

    const token = await getTokenAsync()
    const headers =
    {
        headers: {
            'Content-Type': 'application/Json',
            Authorization: 'Bearer ' + token
        }
    }
    return Axios.post(apiConstant.GET_QUESTIONRESULT_DETAIL,{ansverQuestionRecordId:data}, headers);
}