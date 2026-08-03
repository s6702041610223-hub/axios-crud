import Card from "@/components/card";
import api from "@/utils/crud-api";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
type phone = {
  id: string;
  name:string;
  sect: string;
  tel: string;
}

export default function Index() {
  const [data, setData] = useState([]);

  useEffect(()=>{
      getData();
    }, [])

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
      <Text style={styles.title}>Student Phones</Text>
      <Pressable onPress={()=>router.push('/addPhone')}
        style={{backgroundColor: 'green', padding: 10,
          margin: 10, borderRadius: 5,}}>
        <Text style={{color: 'white', textAlign: 'center'}}>Add Phone</Text>
      </Pressable>
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
            <Card phone={phone} refresh={getData} />
          )
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    textAlign: 'center',
    fontSize: 32,
    fontWeight: 'bold',
    color: '#44F',
  },
});
