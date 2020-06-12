import messaging from "@react-native-firebase/messaging"
import { Platform } from "react-native"

class FcmService {

    register = (onRegister, onNotification, onOpenNotification) => {
        this.chechPermission(onRegister)
        this.createNotificationListener(onRegister, onNotification, onOpenNotification)
    }
    registerAppWithFCM = async () => {
        if (Platform.OS === 'ios') {
            await messaging().registerDeviceForRemoteMessages();
            await messaging().setAutoInitEnabled(true)
        }


    }
    chechPermission = (onRegister) => {
        messaging().hasPermission()
            .then(enable => {
                if (enable) {
                    this.getToken(onRegister)
                } else {
                    this.requestPermission(onRegister)
                }
            }).catch(error => {
                console.log("[FCMService] permision rejected ", error)
            })
    }

    getToken = (onRegister) => {
        messaging().getToken()
            .then(fcmToken => {
                if (fcmToken) {
                    onRegister(fcmToken)
                } else {
                    console.log("[FCMService] user does not have a device token")
                }
            }).catch(error => {
                console.log("[FCMService] eroor getToken ", error)
            })
    }

    requestPermission = (onRegister) => {
        messaging().requestPermission()
            .then(() => {
                this.getToken(onRegister)
            }).catch(error => {
                console.log("[FCMService] error  Request Permission ", error)
            })
    }

    deleteToken = () => {
        console.log("[FCMService] delete token")
        messaging().deleteToken()
            .catch(error => {
                console.log("[FCMService] Delete token error ", error)
            })
    }
    createNotificationListener = (onRegister, onNotification, onOpenNotification) => {
        messaging().onNotificationOpenedApp(remoteMessage => {
            console.log("[FCMService] createNotificationListener work")
            if (remoteMessage) {
                const notification = remoteMessage.notification
                onOpenNotification(notification)
            }
        });
        messaging()
            .getInitialNotification()
            .then(remoteMessage => {
                console.log("[FCMService] getInitialNotification Working")
                if (remoteMessage) {
                    const notification = remoteMessage.notification
                    onOpenNotification(notification)
                }
            })

        this.messageListener = messaging().onMessage(async remoteMessage => {
            console.log("[FCMService messagelistener working}", remoteMessage);
            if (remoteMessage) {
                let notification = null;
                
                if (Platform.OS === 'ios') {
                    notification = remoteMessage.data.notification
                } else {
                    notification = remoteMessage.notification
                }
                onNotification(notification)
            }
        })
        messaging().onTokenRefresh(fcmtoken => {
            console.log("[FCMService] New token refresh ", fcmtoken)
            onRegister(fcmtoken)
        })

    }
unRegister=()=>{
    this.messageListener()
}

}
export const fcmService=new FcmService()