import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { RadioButton } from 'react-native-paper'; // npm install ....
import api from './utils/crud-api';

const EditPhone = () => {
    const {id, name, sect, tel} = useLocalSearchParams();
    const [newName, setNewName] = useState(name);
    const [newSect, setNewSect] = useState(sect);
    const [newTel, setNewTel] = useState(tel);
    const router = useRouter();

    const updatePhone = async () => {
        if(name===''|| sect==='' || tel==='') {
            console.log("Please Enter phone info");
            Alert.alert("Please Enter phone info");
            return;
        }
        try {
            const res = await api.put('phones/'+id, {
                name: newName,
                sect: newSect,
                tel: newTel
            });
            router.navigate('/');
            //console.log(res);
        } catch(err) {
            console.log(err);
        }

    }

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Update Information</Text>
            <Text style={{fontWeight: 'bold'}}>Name: </Text>
            <TextInput style={styles.input}
                    value={newName}
                    onChangeText={(text)=> setNewName(text)}
                    placeholder='Your Name' />
            <RadioButton.Group  value={newSect}
                onValueChange={value => setNewSect(value)}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{fontWeight: 'bold'}}>Section: </Text>
                    <RadioButton value="CED" />
                    <Text>CED</Text>
                    <RadioButton value="TCT" />
                    <Text>TCT</Text>
                </View>
            </RadioButton.Group>
            <Text style={{fontWeight: 'bold'}}>Tel: </Text>
            <TextInput style={styles.input}
                    value={newTel}
                    onChangeText={(text)=> setNewTel(text)}
                    placeholder='Phone No.' />

            <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 20,}}>
                <TouchableOpacity onPress={()=>router.back()}
                    style={{backgroundColor: 'rgb(209, 182, 2)', padding: 10,
                        borderRadius: 5, marginRight: 10,
                    }}>
                    <Text style={{color: 'white', fontWeight: 'bold',
                        textAlign: 'center',
                    }}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>updatePhone()}
                    style={{backgroundColor: 'rgb(200, 100, 50)', padding: 10,
                        borderRadius: 5,
                    }}>
                    <Text style={{color: 'white', fontWeight: 'bold',
                        textAlign: 'center',
                    }}>Update Info</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default EditPhone;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
        padding: 20,
        backgroundColor: '#ddd',
    },
    title:{
        fontSize: 32,
        color: '#47F',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    form: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: '#DDF',
        paddingHorizontal: 20,
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        backgroundColor: 'white',
    },
});
