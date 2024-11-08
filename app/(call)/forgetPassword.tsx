import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { isValidCPF } from '@brazilian-utils/brazilian-utils';
import { isValidEmail } from '@brazilian-utils/brazilian-utils';
import { auth } from "../../service/firebase";
import { sendPasswordResetEmail } from "firebase/auth";


export default function ForgetPassword() {
    const [profileStep, setProfileStep] = useState(1);
    const [email, setEmail] = useState('');
    const [cpf, setCPF] = useState('');
    const navigation = useNavigation();
    const handleNext = () => {
        // Handle form submission
        if (profileStep <= 1) {
            setProfileStep((prev) => prev + 1);
        }
    };
    const handlePrev = () => {
        // Handle form submission
        if (profileStep >= 1) {
            setProfileStep((prev) => prev - 1);
        }
    };
    const handleSubmit = () => {
        sendPasswordResetEmail(auth, email)
            .then(() => {
                console.log("Password reset email sent!");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
            });
    }
    return (
        <>
            {
                profileStep === 1 ? (
                    <SafeAreaView style={styles.container}>
                        <View style={styles.header}>
                            <Text style={styles.headerText}>JK LIBRAS</Text>
                        </View>

                        <View style={styles.content}>
                            <View style={styles.iconContainer}>
                                <Image
                                    source={require('../../assets/images/ear-icon.png')}
                                    style={styles.icon}
                                />
                            </View>

                            <View style={styles.inputContainer}>
                                <Text style={styles.inputLabel}>E-MAIL</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder=""
                                    placeholderTextColor="#999"
                                    value={email}
                                    onChangeText={(text) => setEmail(text)}
                                />

                                <Text style={styles.inputLabel}>CPF</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder=""
                                    placeholderTextColor="#999"
                                    value={cpf}
                                    onChangeText={(text) => setCPF(text)}
                                />
                            </View>

                            <TouchableOpacity style={styles.loginButton} onPress={() => {
                                if (isValidCPF(cpf) && isValidEmail(email)) {
                                    handleNext();
                                }
                            }}>
                                <Text style={styles.loginButtonText}>ENVIAR LINK</Text>
                            </TouchableOpacity>

                            <View style={styles.footer}>
                                <TouchableOpacity>
                                    <Text style={styles.footerText}>VOLTAR AO LOGIN</Text>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Text style={styles.footerText}>CRIAR CONTA</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </SafeAreaView>
                ) : profileStep === 2 ? (
                    <SafeAreaView style={styles.container}>
                        <View style={styles.header}>
                            <Text style={styles.headerText}>JK LIBRAS</Text>
                        </View>

                        <View style={styles.content}>
                            <View style={styles.iconContainer}>
                                <Image
                                    source={require('../../assets/images/ear-icon.png')}
                                    style={styles.icon}
                                />
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={styles.contentText}>UM LINK DE REDEFINIÇÃO FOI ENVIADO PARA SEU E-MAIL.</Text>
                            </View>
                            <TouchableOpacity style={styles.loginButton} onPress={handleNext}>
                                <Text style={styles.loginButtonText}>CONCLUIR</Text>
                            </TouchableOpacity>
                        </View>
                    </SafeAreaView>
                ) : ""
            }
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#436299',
    },
    header: {
        backgroundColor: '#436299',
        height: '40%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    content: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        paddingTop: 60
    },
    iconContainer: {
        position: "absolute",
        left: '50%',
        top: -40,
        transform: [{ translateX: -20 }],
        width: 80,
        height: 80,
    },
    icon: {
        width: "100%",
        height: "100%",
    },
    inputContainer: {
        marginBottom: 20,
    },
    inputLabel: {
        color: '#436299',
        fontSize: 12,
        marginBottom: 15,
        textAlign: "center",
        fontWeight: '600'
    },
    input: {
        backgroundColor: '#F5F5F5',
        borderRadius: 5,
        padding: 15,
        marginBottom: 15,
    },
    loginButton: {
        backgroundColor: '#FF7043',
        borderRadius: 5,
        padding: 15,
        alignItems: 'center',
        marginBottom: 20,
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    footerText: {
        color: '#436299',
        fontSize: 12,
        fontWeight: '600'
    },
    contentText: {
        fontWeight: "900",
        color: "#436299",
        textAlign: "center"
    },
    textContainer: {
        padding: 20,
        marginBottom: 150
    }
});