import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    Image
} from 'react-native';

export default function CreateAccountScreen({ navigation }) {
    const [profileStep, setProfileStep] = useState(1);
    const [formData, setFormData] = useState({
        nome: '',
        sobrenome: '',
        dataNascimento: '',
        cpf: '',
        email: '',
        senha: '',
        confirmarSenha: '',
    });

    const handleSubmit = () => {
        // Handle form submission
        if (profileStep < 3) {
            setProfileStep((prev) => prev + 1);
        }
    };
    const handleCancel = () => {
        // Handle form submission
        if (profileStep >= 2) {
            setProfileStep((prev) => prev - 1);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            {
                profileStep === 1 ? (
                    <View style={styles.scrollView}>
                        <View style={styles.header}>
                            <Text style={styles.headerText}>CRIE SUA CONTA</Text>
                        </View>
                        <View style={styles.formContainer}>
                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>NOME</Text>
                                <TextInput
                                    style={styles.input}
                                    value={formData.nome}
                                    onChangeText={(text) => setFormData({ ...formData, nome: text })}
                                    placeholder=""
                                    placeholderTextColor="#999"
                                />
                            </View>

                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>SOBRENOME</Text>
                                <TextInput
                                    style={styles.input}
                                    value={formData.sobrenome}
                                    onChangeText={(text) => setFormData({ ...formData, sobrenome: text })}
                                    placeholder=""
                                    placeholderTextColor="#999"
                                />
                            </View>

                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>DATA DE NASCIMENTO</Text>
                                <TextInput
                                    style={styles.input}
                                    value={formData.dataNascimento}
                                    onChangeText={(text) => setFormData({ ...formData, dataNascimento: text })}
                                    placeholderTextColor="#999"
                                    keyboardType="numeric"
                                    maxLength={10}
                                />
                            </View>

                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>CPF</Text>
                                <TextInput
                                    style={styles.input}
                                    value={formData.cpf}
                                    onChangeText={(text) => setFormData({ ...formData, cpf: text })}
                                    placeholder=""
                                    placeholderTextColor="#999"
                                    keyboardType="numeric"
                                    maxLength={11}
                                />
                            </View>

                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>E-MAIL</Text>
                                <TextInput
                                    style={styles.input}
                                    value={formData.email}
                                    onChangeText={(text) => setFormData({ ...formData, email: text })}
                                    placeholder=""
                                    placeholderTextColor="#999"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                />
                            </View>

                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>SENHA</Text>
                                <TextInput
                                    style={styles.input}
                                    value={formData.senha}
                                    onChangeText={(text) => setFormData({ ...formData, senha: text })}
                                    placeholder=""
                                    placeholderTextColor="#999"
                                    secureTextEntry
                                />
                            </View>

                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>CONFIRMAR SENHA</Text>
                                <TextInput
                                    style={styles.input}
                                    value={formData.confirmarSenha}
                                    onChangeText={(text) => setFormData({ ...formData, confirmarSenha: text })}
                                    placeholder=""
                                    placeholderTextColor="#999"
                                    secureTextEntry
                                />
                            </View>
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity
                                    style={styles.cancelButton}
                                    onPress={handleCancel}
                                >
                                    <Text style={styles.cancelButtonText}>CANCELAR</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.submitButton}
                                    onPress={handleSubmit}
                                >
                                    <Text style={styles.submitButtonText}>PROSSEGUIR</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                ) : profileStep === 2 ? (
                    <View style={styles.scrollView}>
                        <View style={styles.header}>
                            <Text style={styles.headerText}>CRIE SUA CONTA</Text>
                        </View>
                        <View style={styles.formContainer}>
                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>RUA</Text>
                                <TextInput
                                    style={styles.input}
                                    value={formData.nome}
                                    onChangeText={(text) => setFormData({ ...formData, nome: text })}
                                    placeholder=""
                                    placeholderTextColor="#999"
                                />
                            </View>

                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>NÚMERO</Text>
                                <TextInput
                                    style={styles.input}
                                    value={formData.sobrenome}
                                    onChangeText={(text) => setFormData({ ...formData, sobrenome: text })}
                                    placeholder=""
                                    placeholderTextColor="#999"
                                />
                            </View>

                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>COMPLEMENTO</Text>
                                <TextInput
                                    style={styles.input}
                                    value={formData.dataNascimento}
                                    onChangeText={(text) => setFormData({ ...formData, dataNascimento: text })}
                                    placeholderTextColor="#999"
                                    keyboardType="numeric"
                                    maxLength={10}
                                />
                            </View>

                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>BAIRRO</Text>
                                <TextInput
                                    style={styles.input}
                                    value={formData.cpf}
                                    onChangeText={(text) => setFormData({ ...formData, cpf: text })}
                                    placeholder=""
                                    placeholderTextColor="#999"
                                    keyboardType="numeric"
                                    maxLength={11}
                                />
                            </View>

                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>CIDADE</Text>
                                <TextInput
                                    style={styles.input}
                                    value={formData.email}
                                    onChangeText={(text) => setFormData({ ...formData, email: text })}
                                    placeholder=""
                                    placeholderTextColor="#999"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                />
                            </View>

                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>ESTADO</Text>
                                <TextInput
                                    style={styles.input}
                                    value={formData.senha}
                                    onChangeText={(text) => setFormData({ ...formData, senha: text })}
                                    placeholder=""
                                    placeholderTextColor="#999"
                                />
                            </View>

                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>CEP</Text>
                                <TextInput
                                    style={styles.input}
                                    value={formData.confirmarSenha}
                                    onChangeText={(text) => setFormData({ ...formData, confirmarSenha: text })}
                                    placeholder=""
                                    placeholderTextColor="#999"
                                />
                            </View>
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity
                                    style={styles.cancelButton}
                                    onPress={handleCancel}
                                >
                                    <Text style={styles.cancelButtonText}>VOLTAR</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.submitButton}
                                    onPress={handleSubmit}
                                >
                                    <Text style={styles.submitButtonText}>CONCLUIR</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                ) : profileStep === 3 ? (
                    <SafeAreaView style={styles.container}>
                        <View style={styles.header3}>
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
                                <Text style={styles.contentText}>UM LINK DE CONFIRMAÇÃO FOI ENVIADO PARA SEU E-MAIL.</Text>
                            </View>
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity
                                    style={styles.cancelButton}
                                >
                                    <Text style={styles.cancelButtonText}>VOLTAR</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.cancelButton}
                                >
                                    <Text style={styles.cancelButtonText}>CONCLUIR</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity style={styles.loginButton} onPress={handleCancel}>
                                <Text style={styles.loginButtonText}>CONCLUIR</Text>
                            </TouchableOpacity>
                        </View>

                    </SafeAreaView>
                ) : ""
            }
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollView: {
        flex: 1,
        height: "100%",
        backgroundColor: "ff0000"
    },
    formContainer: {
        padding: 12,
        marginTop: -20,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        backgroundColor: "#fff"
    },
    title: {
        color: '#436299',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    inputContainer: {
        marginBottom: 18,
    },
    label: {
        color: '#436299',
        fontSize: 14,
        marginBottom: 8,
        fontWeight: '900',
        textAlign: "center",
    },
    input: {
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        padding: 7,
        fontSize: 16,
        color: '#333',
    },
    buttonContainer: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
    },
    cancelButton: {
        backgroundColor: '#f5f5f5',
        padding: 15,
        borderRadius: 8,
        flex: 1,
    },
    submitButton: {
        backgroundColor: '#ff7043',
        padding: 15,
        borderRadius: 8,
        flex: 1,
    },
    cancelButtonText: {
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
    header3: {
        backgroundColor: '#436299',
        height: '40%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        backgroundColor: '#436299',
        height: '12%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '900',
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
    contentText: {
        fontWeight: "900",
        color: "#436299",
        textAlign: "center",
        fontSize: 20
    },
    textContainer: {
        padding: 20,
        marginBottom: 60,
        marginTop: 40
    },
    loginButton: {
        backgroundColor: '#FF7043',
        borderRadius: 5,
        padding: 15,
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 20,
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});