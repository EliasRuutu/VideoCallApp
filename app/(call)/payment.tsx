import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function CardDetailsScreen({ navigation }) {
    const [cardData, setCardData] = useState({
        cardNumber: '',
        date: '',
        cvv: '',
        name: '',
        cpf: '',
    });

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <TouchableOpacity onPress={() => navigation.openDrawer()}>
                        <Icon name="menu" size={16} color="#fff" style={styles.icon} />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>JK LIBRAS</Text>
                </View>
                <TouchableOpacity>
                    <Icon name="settings" size={16} color="#fff" style={styles.icon} />
                </TouchableOpacity>
            </View>

            {/* Form Container */}
            <View style={styles.formContainer}>
                <Text style={styles.formTitle}>INSIRA OS DADOS DO CARTÃO</Text>

                {/* Card Number */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>NÚMERO DO CARTÃO</Text>
                    <TextInput
                        style={styles.input}
                        value={cardData.cardNumber}
                        onChangeText={(text) => setCardData({ ...cardData, cardNumber: text })}
                        keyboardType="numeric"
                        maxLength={16}
                    />
                </View>

                {/* Date and CVV Row */}
                <View style={styles.row}>
                    <View style={[styles.inputContainer, { flex: 1, marginRight: 10 }]}>
                        <Text style={styles.label}>DATA</Text>
                        <TextInput
                            style={styles.input}
                            value={cardData.date}
                            onChangeText={(text) => setCardData({ ...cardData, date: text })}
                            keyboardType="numeric"
                            maxLength={5}
                        />
                    </View>
                    <View style={[styles.inputContainer, { flex: 1 }]}>
                        <Text style={styles.label}>CVV</Text>
                        <TextInput
                            style={styles.input}
                            value={cardData.cvv}
                            onChangeText={(text) => setCardData({ ...cardData, cvv: text })}
                            keyboardType="numeric"
                            maxLength={3}
                        />
                    </View>
                </View>

                {/* Name */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>NOME</Text>
                    <TextInput
                        style={styles.input}
                        value={cardData.name}
                        onChangeText={(text) => setCardData({ ...cardData, name: text })}
                        autoCapitalize="characters"
                    />
                </View>

                {/* CPF */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>CPF</Text>
                    <TextInput
                        style={styles.input}
                        value={cardData.cpf}
                        onChangeText={(text) => setCardData({ ...cardData, cpf: text })}
                        keyboardType="numeric"
                        maxLength={11}
                    />
                </View>

                {/* Buttons */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={styles.backButtonText}>VOLTAR</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.submitButton}
                        onPress={() => {
                            // Handle form submission
                            console.log(cardData);
                        }}
                    >
                        <Text style={styles.submitButtonText}>CONCLUIR</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        backgroundColor: '#3b5998',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        height: '15%'
    },
    headerTitle: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    formContainer: {
        flex: 1,
        padding: 20,
        paddingTop: 40,
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: -20,
    },
    formTitle: {
        color: '#436299',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 56,
        textAlign: 'center',
    },
    inputContainer: {
        marginBottom: 16,
    },
    label: {
        color: '#436299',
        fontSize: 14,
        fontWeight: "900",
        marginBottom: 8,
        textAlign: "center"
    },
    input: {
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 24,
    },
    backButton: {
        backgroundColor: '#f5f5f5',
        padding: 15,
        borderRadius: 8,
        flex: 1,
        marginRight: 10,
    },
    submitButton: {
        backgroundColor: '#ff7043',
        padding: 15,
        borderRadius: 8,
        flex: 1,
    },
    backButtonText: {
        color: '#666',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    },
    submitButtonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    },
    icon: {
        backgroundColor: '#EE7F48',
        padding: 5,
        borderRadius: 5
    },
    headerLeft: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20
    },
    headerText: {
        color: '#fff',
        fontSize: 28,
        fontWeight: '900',
    },
});