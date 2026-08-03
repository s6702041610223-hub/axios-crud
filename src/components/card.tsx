
import { Link } from "expo-router";
import { Alert, Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Card(props) {
    const updatePhone = (id:string) => {
        Alert.alert("Update: " + id);
    } 

    const delPhone = (id: string) => {
      Alert.alert("Delete: " + id);
    }

    return (
        <View style={styles.container} key={props.phone.id}>
          <View style={styles.text}>
            <Text style={styles.text}>Name: {props.phone.name}</Text>
            <Text style={styles.text}>Sect: {props.phone.sect}</Text>
            <Text style={styles.text}>Sect: {props.phone.tel}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
              <Link href={{
                pathname: "/edit",
                params: { 
                    id: props.phone.id, 
                    name:  props.phone.name,
                    sect: props.phone.sect,
                    tel: props.phone.tel,
                  },
                }}            
                push asChild>
                    <Button title="Edit" />
            </Link>
            <TouchableOpacity onPress={()=>delPhone(props.phone.id)}
                style={{backgroundColor: 'rgb(213, 67, 9)', padding: 10,
                    margin: 10, borderRadius: 5,}}>
                <Text style={{color: 'white', fontWeight: 'bold'}}>Delelte</Text>
            </TouchableOpacity>
          </View>
        </View>
    )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: "center",
    justifyContent:"space-between",
    borderRadius: 10,
    padding: 5,
    marginVertical: 5,
    marginHorizontal: 20,
    backgroundColor: '#47F',
  },
  list: {
    backgroundColor: '#47F',
    padding: 10,
    margin: 5,
    borderRadius: 10,
    borderColor: 'red',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 18,
  }
});