import PushNotification from "react-native-push-notification"
import { Platform, PushNotificationIOS } from "react-native"

class LocalNotificationService {

    configure = (onOpenNotification) => {
        PushNotification.configure({
            onRegister: function (token) {
                console.log("[LocalNotificationService] onRegister: ", token)
            },
            onNotification: function (notification) {
                console.log("[LocalNotificationService] onNotification:", notification)
                // if (notification?.data) {
                //     return
                // }
                notification.userInteraction = true;
                onOpenNotification(Platform.OS === "ios" ? notification.data.item : notification.data);

                if (Platform.OS === "ios") {
                    notification.finish(PushNotificationIOS.FetchResult.notification)

                }
            },
            permissions: {
                alert: true,
                badge: true,
                sound: true,
            },
            popInitialNotification: true,
            requestPermissions: true,

        })
    }
    unregister = () => {
        PushNotification.unregister()
    }

    showNotification = (id, title, message, data = {}, options = {}) => {
        PushNotification.localNotification({
            ...this.buildAndroidNotification(id, title, message, data, options),
            ...this.buidIOSNotification(id, title, message, data, options),
            title: title || "",
            message: message || "",
            playSound: options.playSound || false,
            soundName: options.soundName || 'default',
            userInteraction: false


        })
    }
    buildAndroidNotification = (id, title, message, data = {}, options = {}) => {
        return {
            id: id,
            autoCancel: true,
            largeIcon: options.largeIcon || "icn_launcher",
            smallIcon: options.smalIcon || "icn_notification",
            bigText: message || "",
            subText: title || "",
            vibrate: options.vibrate || true,
            vibration: options.vibration || 300,
            priority: options.priority || "high",
            importance: options.importance || "high",
            data: data
        }
    }
    buidIOSNotification = (id, title, data = {}, options = {}) => {
        return {
            alertAction: options.alertAction || "view",
            category:options.category || "",
            userInfo:{
                id:id,
                item:data
            }
        }
    } 
    cancelAllAllLocalNotifications=()=>{
        if (Platform.OS==="ios") {
            PushNotificationIOS.cancelAllLocalNotifications()
        }else{
            PushNotification.clearAllNotifications()
        }
    }
    removeDeliveredNotificationByID=(notificationId)=>{
        console.log("[LocalNotificationService] removeDeliveredNotificationByID: ",notificationId)
        PushNotification.clearAllNotifications({id:`${notificationId}`})
    }


}
export const localNotificationService=new LocalNotificationService()