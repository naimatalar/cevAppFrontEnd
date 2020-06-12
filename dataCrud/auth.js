
import AsyncStorage from '@react-native-community/async-storage'
export const getTokenAsync = () => {
    return AsyncStorage.getItem('userToken')

}
export const getUserIdAsync = () => {
    return AsyncStorage.getItem('userId')

}

export const setUserIdAsync = (id) => {
    try {
        AsyncStorage.removeItem('userId')

    } catch{

    }
    return AsyncStorage.setItem('userId', id)

}
export const setTokenAsync = (token) => {
    try {
        AsyncStorage.removeItem('userToken')

    } catch{

    }
    return AsyncStorage.setItem('userToken', token)

}


export const reomveTokenAsync = () => {
    try {
        AsyncStorage.removeItem('userToken')

    } catch{

    }


}

export const setHubConnectionAsync = (hub) => {
    try {
        AsyncStorage.removeItem('hubControl')

    } catch{

    }
    return AsyncStorage.setItem('hubControl', hub)

}
export const getHubHubControlAsync = () => {
    return AsyncStorage.getItem('hubControl')

}

export const setDeviceToken = (hub) => {
    try {
        AsyncStorage.removeItem('deviceToken')

    } catch{

    }
    return AsyncStorage.setItem('deviceToken', hub)

}
export const getDeviceToken = () => {
    return AsyncStorage.getItem('deviceToken')

}