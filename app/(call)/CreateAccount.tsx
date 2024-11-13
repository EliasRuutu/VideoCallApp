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
    KeyboardAvoidingView,
} from 'react-native';
import { auth, firestore } from "../../service/firebase";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import DateTimePicker from '@react-native-community/datetimepicker';
import { isValidCPF, isValidCEP, isValidEmail, getStates, getCities } from '@brazilian-utils/brazilian-utils';
import { useNavigation } from '@react-navigation/native';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AutocompleteDropdownItem, AutocompleteDropdown, AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown';
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
    const [profileStep, setProfileStep] = useState(2);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isCity, setIsCity] = useState(false);
    const [isDateSelected, setIsDateSelected] = useState(false);
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
    const [cities, setCities] = useState<string[]>([]); // Adjust type as neededr

    useEffect(() => {
        if (formData.estado !== '') {
            setIsCity(true);
            setFormData({ ...formData, cidade: '' });
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
        setIsDateSelected(true);
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
    const transformedStates = states.map((state, index) => ({
        id: (index + 1).toString(),
        title: state.name
    }));

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

    const formatDate = (date: any) => {
        if (!isDateSelected) return '';
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const handleOnSelect = (item: AutocompleteDropdownItem | null) => {
        setFormData({
            ...formData,
            estado: (item?.title as "" | StateName) || "", // Default to empty string if null/undefined
        });
        console.log('Selected City:')
    };
    const handleOnSelectCity = (item: AutocompleteDropdownItem | null) => {
        setFormData({
            ...formData,
            cidade: (item?.title as "" | StateName) || "", // Default to empty string if null/undefined
        });
    };

    return (
        <AutocompleteDropdownContextProvider>
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
                                            {formatDate(formData.dataNascimento)}
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
                                    <Text style={styles.label}>ESTADO</Text>
                                    <AutocompleteDropdown
                                        onSelectItem={handleOnSelect}
                                        initialValue={{ id: '' }}
                                        dataSet={transformedStates}
                                        clearOnFocus={false}
                                        closeOnBlur={true}
                                        showClear={true}
                                        containerStyle={styles.dropdownAutocomplete}
                                    />
                                </View>
                                <View style={styles.inputContainer}>
                                    <Text style={styles.label}>CIDADE</Text>
                                    <AutocompleteDropdown
                                        onSelectItem={handleOnSelectCity}
                                        initialValue={{ id: '0' }}
                                        dataSet={[
                                            { id: '0', title: 'Selecione um Estado' },
                                            ...cities.map((city, index) => ({
                                                id: (index + 1).toString(),
                                                title: city
                                            }))]}
                                        clearOnFocus={false}
                                        closeOnBlur={true}
                                        showClear={true}
                                        editable={isCity}
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
        </AutocompleteDropdownContextProvider>
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
    dropdownAutocomplete: {
        backgroundColor: '#f5f5f5'
    }
});