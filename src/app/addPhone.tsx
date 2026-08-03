import api from '@/utils/crud-api';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { RadioButton } from 'react-native-paper'; // npm install ....
import { v4 as uuidv4 } from 'uuid';

export default function AddPhone() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [sect, setSect] = useState('');
    const [tel, setTel] = useState('');
    
    const addPhone = async () => {
        if(name===''|| sect==='' || tel==='') {
            console.log("Please Enter phone info");
            Alert.alert("Please Enter phone info");
            return;
        }
        let phone = {
            id: uuidv4(),
            name: name,
            sect: sect,
            tel: tel,
          }

        try {
            const res = await api.post('phones', phone);
            setName('');
            setSect('');
            setTel('');
            //console.log(res);
            router.navigate('/');
        } catch(err) {
            console.log(err);
        }
    }

    return(
        <View style={styles.form}>
            <Text style={styles.title}>Add New Phone</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{fontWeight: 'bold'}}>Name: </Text>
                <TextInput style={styles.input}
                        value={name}
                        onChangeText={(text)=> setName(text)}
                        placeholder='Your Name' />
            </View>
            <RadioButton.Group  value={sect}
                onValueChange={value => setSect(value)}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{fontWeight: 'bold'}}>Section: </Text>
                    <RadioButton value="CED" />
                    <Text>CED</Text>
                    <RadioButton value="TCT" />
                    <Text>TCT</Text>
                </View>
            </RadioButton.Group>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{
                    fontWeight: 'bold',
                }}>Tel: </Text>
                <TextInput style={styles.input}
                        value={tel}
                        onChangeText={(text)=> setTel(text)}
                        placeholder='Phone No.' />
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 20,}}>
            <TouchableOpacity onPress={()=>router.back()}
                style={{backgroundColor: 'rgb(204, 184, 68)', padding: 10,
                    margin: 10, borderRadius: 5,}}>
                <Text style={{color: 'white', fontWeight: 'bold',
                    textAlign: 'center',
                }}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>addPhone()}
                style={{backgroundColor: '#4C4', padding: 10,
                    margin: 10, borderRadius: 5,}}>
                <Text style={{color: 'white', fontWeight: 'bold',
                    textAlign: 'center',
                }}>Add Phone</Text>
            </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
        fontSize: 32,
        fontWeight: 'bold',
        color:'green',
        marginTop: 10,
        marginBottom: 30,
    },
    form: {
        flex: 1,
        backgroundColor: '#DDF',
        paddingHorizontal: 20,
        marginHorizontal: 20,
    },
    input: {
        height: 35,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        backgroundColor: 'white',
    },
})