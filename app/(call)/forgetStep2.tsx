import React from 'react';
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

export default function Step2Screen() {
  const navigation = useNavigation(); 
    const handleStep3 = () => {
        navigation.navigate('forgetStep3'); // Navigate to ForgetStep2
    };
  return (
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
        <TouchableOpacity style={styles.loginButton} onPress={handleStep3}>
          <Text style={styles.loginButtonText}>CONCLUIR</Text>
        </TouchableOpacity>
      </View>
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