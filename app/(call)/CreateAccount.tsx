import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    Image,
    Alert,
    ScrollView,
    BackHandler,
} from 'react-native';
import { auth, firestore } from "../../service/firebase";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import DateTimePicker from '@react-native-community/datetimepicker';
import { isValidCPF, isValidCEP, isValidEmail, getStates, getCities } from '@brazilian-utils/brazilian-utils';
import { useNavigation } from '@react-navigation/native';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const emojisWithIcons = [
    { title: 'happy', icon: 'emoticon-happy-outline' },
    { title: 'cool', icon: 'emoticon-cool-outline' },
    { title: 'lol', icon: 'emoticon-lol-outline' },
    { title: 'sad', icon: 'emoticon-sad-outline' },
    { title: 'cry', icon: 'emoticon-cry-outline' },
    { title: 'angry', icon: 'emoticon-angry-outline' },
    { title: 'confused', icon: 'emoticon-confused-outline' },
    { title: 'excited', icon: 'emoticon-excited-outline' },
    { title: 'kiss', icon: 'emoticon-kiss-outline' },
    { title: 'devil', icon: 'emoticon-devil-outline' },
    { title: 'dead', icon: 'emoticon-dead-outline' },
    { title: 'wink', icon: 'emoticon-wink-outline' },
    { title: 'sick', icon: 'emoticon-sick-outline' },
    { title: 'frown', icon: 'emoticon-frown-outline' },
];
type StateName =
    | "AC" | "AL" | "AP" | "AM" | "BA" | "CE" | "DF" | "ES"
    | "GO" | "MA" | "MG" | "MT" | "MS" | "PA" | "PB"
    | "PE" | "PI" | "PR" | "RJ" | "RN" | "RO" | "RS"
    | "RR" | "SC" | "SE" | "SP" | "TO";

interface FormData {
    nome: string;
    sobrenome: string;
    dataNascimento: Date;
    cpf: string;
    rua: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
    estado: StateName | ''; // Allow empty string or one of the state names
    cep: string;
}
export default function CreateAccountScreen() {
    const [profileStep, setProfileStep] = useState(1);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isCity, setIsCity] = useState(true);
    const [formData, setFormData] = useState<FormData>({
        nome: '',
        sobrenome: '',
        dataNascimento: new Date(),
        cpf: '',
        rua: '',
        numero: '',
        complemento: '',
        bairro: '',
        cidade: '',
        estado: '',
        cep: '',
    });
    const states = getStates();
    const [cities, setCities] = useState<string[]>([]); // Adjust type as needed
    
    useEffect(() => {
        if(formData.estado !== '') {
            setIsCity(false);
            setFormData({...formData, cidade: ''});
            setCities(getCities(formData.estado)); 
        }
    }, [formData.estado])
    useEffect(() => {
        const backAction = () => {
          handleCancel();
          return true; // Prevent default behavior (exit app)
        };
    
        const backHandler = BackHandler.addEventListener(
          'hardwareBackPress',
          backAction
        );
    
        return () => backHandler.remove(); // Clean up the event listener on unmount
      }, [profileStep]);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const onChangeDate = (event: any, selectedDate: any) => {
        const currentDate = selectedDate || formData.dataNascimento;
        setShowDatePicker(false);
        setFormData({ ...formData, dataNascimento: currentDate });
    };
    const navigator = useNavigation();

    const signUp = async (email: string, password: string, profileData: any) => {
        try {
            // Create user with email and password
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            // Get user ID
            const userId = userCredential.user.uid;

            // Save additional profile data in Firestore
            await setDoc(doc(firestore, 'users', userId), {
                email: email,
                ...profileData,
                createdAt: new Date(),
            });

            console.log('User account created & profile data saved!');
        } catch (error: any) {
            console.error('Error signing up:', error.message);
        }
    };

    const handleSubmit = () => {
        // Handle form submission
        if (profileStep <= 2) {
            if (profileStep == 1) {
                const emptyFields = [];

                // Check for empty fields and collect their names
                if (formData.nome === '') emptyFields.push('Nome');
                if (formData.sobrenome === '') emptyFields.push('Sobrenome');
                if (formData.dataNascimento === null) emptyFields.push('Data de Nascimento');
                if (formData.cpf === '') emptyFields.push('CPF');
                if (email === '') emptyFields.push('Email');
                if (password === '') emptyFields.push('Password');
                if (confirmPassword === '') emptyFields.push('Confirm Password');
                if (emptyFields.length > 0) {
                    Alert.alert('Please fill all fields: ' + emptyFields.join(', '));
                } else if (password !== confirmPassword) {
                    Alert.alert('Password did not match!');
                } else if (!isValidEmail(email)) {
                    Alert.alert('Invalid email!');
                } else if (!isValidCPF(formData.cpf)) {
                    Alert.alert('Invalid CPF!');
                } else {
                    setProfileStep((prev) => prev + 1);
                }
            } else if (profileStep == 2) {
                const emptyFields = [];

                // Check for empty address fields and collect their names
                if (formData.rua === '') emptyFields.push('Rua');
                if (formData.numero === '') emptyFields.push('Número');
                if (formData.complemento === '') emptyFields.push('Complemento');
                if (formData.bairro === '') emptyFields.push('Bairro');
                if (formData.cidade === '') emptyFields.push('Cidade');
                if (formData.estado === '') emptyFields.push('Estado');
                if (formData.cep === '') emptyFields.push('CEP');

                // If there are empty fields, show an alert
                if (emptyFields.length > 0) {
                    Alert.alert('Please fill all fields: ' + emptyFields.join(', '));
                } else if (!isValidCEP(formData.cep)) {
                    Alert.alert('Invalid CEP!');
                } else {
                    setProfileStep((prev) => prev + 1);
                }
            }
        }
    };
    const handleSignUp = () => {
        if (!email || !password || !confirmPassword) {
            Alert.alert('Please fill all fields!');
            return;
        }
        const profileData = formData;
        if (password === confirmPassword) {
            signUp(email, password, profileData);
            navigator.navigate('home');
        }
    }
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
                    <ScrollView contentContainerStyle={styles.scrollView}>
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
                                <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                                    <Text style={styles.input}>
                                        {formData.dataNascimento.toLocaleDateString()}
                                    </Text>
                                </TouchableOpacity>
                                {showDatePicker && (
                                    <DateTimePicker
                                        value={formData.dataNascimento}
                                        mode="date"
                                        display="default"
                                        onChange={onChangeDate}
                                    />
                                )}
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
                                    value={email}
                                    onChangeText={(text) => setEmail(text)}
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
                                    value={password}
                                    onChangeText={(text) => setPassword(text)}
                                    placeholder=""
                                    placeholderTextColor="#999"
                                    secureTextEntry
                                />
                            </View>

                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>CONFIRMAR SENHA</Text>
                                <TextInput
                                    style={styles.input}
                                    value={confirmPassword}
                                    onChangeText={(text) => setConfirmPassword(text)}
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
                    </ScrollView>
                ) : profileStep === 2 ? (
                    <ScrollView contentContainerStyle={styles.scrollView}>
                        <View style={styles.header}>
                            <Text style={styles.headerText}>CRIE SUA CONTA</Text>
                        </View>
                        <View style={styles.formContainer}>
                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>RUA</Text>
                                <TextInput
                                    style={styles.input}
                                    value={formData.rua}
                                    onChangeText={(text) => setFormData({ ...formData, rua: text })}
                                    placeholder=""
                                    placeholderTextColor="#999"
                                />
                            </View>

                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>NÚMERO</Text>
                                <TextInput
                                    style={styles.input}
                                    value={formData.numero}
                                    onChangeText={(text) => setFormData({ ...formData, numero: text })}
                                    placeholder=""
                                    placeholderTextColor="#999"
                                />
                            </View>

                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>COMPLEMENTO</Text>
                                <TextInput
                                    style={styles.input}
                                    value={formData.complemento}
                                    onChangeText={(text) => setFormData({ ...formData, complemento: text })}
                                    placeholderTextColor="#999"
                                />
                            </View>

                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>BAIRRO</Text>
                                <TextInput
                                    style={styles.input}
                                    value={formData.bairro}
                                    onChangeText={(text) => setFormData({ ...formData, bairro: text })}
                                    placeholder=""
                                    placeholderTextColor="#999"
                                />
                            </View>

                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>CIDADE</Text>
                                <SelectDropdown
                                    data={cities}
                                    disabled={isCity}
                                    onSelect={(selectedItem, index) => {
                                        console.log(selectedItem, index);
                                        setFormData({...formData, cidade: selectedItem})
                                    }}
                                    renderButton={(selectedItem, isOpened) => {
                                        return (
                                            <View style={styles.dropdownButtonStyle}>
                                                <Text style={styles.dropdownButtonTxtStyle}>
                                                    {(selectedItem) || ''}
                                                </Text>
                                                <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
                                            </View>
                                        );
                                    }}
                                    renderItem={(item, index, isSelected) => {
                                        return (
                                            <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>
                                                <Text style={styles.dropdownItemTxtStyle}>{item}</Text>
                                            </View>
                                        );
                                    }}
                                    showsVerticalScrollIndicator={false}
                                    dropdownStyle={styles.dropdownMenuStyle}
                                />
                            </View>

                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>ESTADO</Text>
                                <SelectDropdown
                                    data={states}
                                    onSelect={(selectedItem, index) => {
                                        console.log(selectedItem.name, index);
                                        setFormData({...formData, estado: selectedItem.name})
                                    }}
                                    renderButton={(selectedItem, isOpened) => {
                                        return (
                                            <View style={styles.dropdownButtonStyle}>
                                                <Text style={styles.dropdownButtonTxtStyle}>
                                                    {(selectedItem && selectedItem.name) || ''}
                                                </Text>
                                                <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
                                            </View>
                                        );
                                    }}
                                    renderItem={(item, index, isSelected) => {
                                        return (
                                            <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>
                                                <Text style={styles.dropdownItemTxtStyle}>{item.name}</Text>
                                            </View>
                                        );
                                    }}
                                    showsVerticalScrollIndicator={false}
                                    dropdownStyle={styles.dropdownMenuStyle}
                                />
                            </View>

                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>CEP</Text>
                                <TextInput
                                    style={styles.input}
                                    value={formData.cep}
                                    onChangeText={(text) => setFormData({ ...formData, cep: text })}
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
                    </ScrollView>
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
                                    <Text style={styles.cancelButtonText}>SAIR</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.cancelButton}
                                >
                                    <Text style={styles.cancelButtonText}>REENVIAR LINK</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity style={styles.loginButton} onPress={handleSignUp}>
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
        backgroundColor: '#ff0000',
    },
    scrollView: {
        flexGrow: 1,
        backgroundColor: "00ff00",
        justifyContent: 'center'
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
        textAlign: 'center',
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
    picker: {
        height: 50,
        width: 150,
    },
    selectedText: {
        marginTop: 20,
        fontSize: 16,
    },
    dropdownButtonStyle: {
        width: "100%",
        height: 42,
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 12,
    },
    dropdownButtonTxtStyle: {
        textAlign: 'center',
        flex: 1,
        marginRight: -25,
        fontSize: 16,
    },
    dropdownButtonArrowStyle: {
        fontSize: 28,
    },
    dropdownButtonIconStyle: {
        fontSize: 28,
        marginRight: 8,
    },
    dropdownMenuStyle: {
        backgroundColor: '#E9ECEF',
        borderRadius: 8,
    },
    dropdownItemStyle: {
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 12,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
    },
    dropdownItemTxtStyle: {
        flex: 1,
        fontSize: 18,
        fontWeight: '500',
        color: '#151E26',
    },
    dropdownItemIconStyle: {
        fontSize: 28,
        marginRight: 8,
    },
});