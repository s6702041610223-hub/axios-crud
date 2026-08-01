
import { StyleSheet, Text, View } from "react-native";

export default function Card(props) {
    return (
        <View style={styles.list} key={props.phone.id}>
            <Text style={styles.text}>Name: {props.phone.name}</Text>
            <Text style={styles.text}>Sect: {props.phone.sect}</Text>
            <Text style={styles.text}>Sect: {props.phone.tel}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
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