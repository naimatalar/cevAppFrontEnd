import React from 'react'
import { View, Text } from 'react-native'

export const CvpLoading = (props) => {

    return (
        <View {...props}>

            <View style={{flex:1}}></View>
            <View style={{flex:1,alignItems:'center'}}>
                <Text>
                    Loading...
                </Text>
            </View>
            <View style={{flex:1}}></View>
        </View>

    )

}
export default CvpLoading