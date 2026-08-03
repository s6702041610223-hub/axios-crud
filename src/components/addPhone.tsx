import api from '@/utils/crud-api';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { RadioButton } from 'react-native-paper'; // npm install ....
import { v4 as uuidv4 } from 'uuid';


export default function AddPhone(props) {
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
            props.refresh();
            //console.log(res);
        } catch(err) {
            console.log(err);
        }
    }

    return(
        <View style={styles.form}>
            <Text style={{fontWeight: 'bold'}}>Name: </Text>
            <TextInput style={styles.input}
                    value={name}
                    onChangeText={(text)=> setName(text)}
                    placeholder='Your Name' />
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
            <Text style={{fontWeight: 'bold'}}>Tel: </Text>
            <TextInput style={styles.input}
                    value={tel}
                    onChangeText={(text)=> setTel(text)}
                    placeholder='Phone No.' />
            <TouchableOpacity onPress={()=>addPhone()}
                style={{backgroundColor: '#4C4', padding: 10,
                    margin: 10, borderRadius: 5,}}>
                <Text style={{color: 'white', fontWeight: 'bold'}}>Add Phone</Text>
            </TouchableOpacity>


        </View>
    )


}

const styles = StyleSheet.create({
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
    display: {
        height: 120,
        padding: 10,
        backgroundColor: 'pink',
        paddingHorizontal: 20,
    },
    comment: {
        height: 80,
        borderColor: '#ccc',
        marginBottom: 15,
        padding: 10,
        borderRadius: 5,
        backgroundColor: 'white',
    },
    switch_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 20,
    }
})