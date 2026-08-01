import Card from "@/components/card";
import api from "@/utils/crud-api";
import { useState } from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";

type phone = {
  id: string;
  name:string;
  sect: string;
  tel: string;
}

export default function Index() {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const response = await api.get("phones");
      setData(response.data);
      //console.log(response.data);
    } catch(err) {
      console.log("ERROR", err);
    }

  }
  return (
    <View style={styles.container}>
      <Text>Edit src/app/index.tsx to edit this screen.</Text>

      <Button onPress={getData}>
        <Text>Get Data</Text>
      </Button>
      <FlatList 
        data={data}        
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          let phone = {
            id: item.id,
            name: item.name,
            sect: item.sect,
            tel: item.tel,
          }
          return (
            <Card phone={phone} />
          )
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
