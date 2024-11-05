import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    ImageBackground,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export default function CallScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#436299" barStyle="light-content" />
            <View style={styles.header}>
                <Text style={styles.headerText}>JK LIBRAS</Text>
            </View>

            <ImageBackground style={styles.content} imageStyle={styles.image} source={require('../../assets/images/Rectangle 18.png')} >
                <TouchableOpacity style={styles.actionButton}>
                    <Icon name="x" size={28} color="#fff" />
                </TouchableOpacity>
            </ImageBackground>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#436299',
    },
    header: {
        backgroundColor: '#436299',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: '13%',
    },
    headerLeft: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20
    },
    headerText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '900',
    },
    content: {
        flex: 1,
        marginTop: -20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: 30
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#436299',
        marginBottom: 20,
    },
    buttonContainer: {
        gap: 16,
    },
    icon: {
        backgroundColor: '#EE7F48',
        padding: 5,
        borderRadius: 5
    },
    actionButton: {
        backgroundColor: '#EE7F48',
        borderRadius: 100,
        alignItems: 'center',
        width: 60,
        height: 60,
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    image: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
});