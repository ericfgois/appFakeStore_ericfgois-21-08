import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
// Added Image to the imports and combined the react-native imports
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';

export default function App() {
  const [dados, setDados] = useState([]);

  async function carregaProdutos() {
    try {
      let resposta = await fetch("https://fakestoreapi.com/products/");
      if (resposta.status == 200) {
        let novosDados = await resposta.json();
        setDados(novosDados);
      }
      else {
        // Changed Exception to new Error
        throw new Error("falha no carregamento de dados"); 
      }
    }
    catch (e) {
      console.log(e);
      // Changed Exception to new Error
      // Avoid re-throwing here if you don't have an ErrorBoundary set up, 
      // or just console.log it.
    }
  }

  useEffect(() => {
    carregaProdutos()
  }, [])

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>

      <FlatList
        style ={{ width: '100%', flex: 1}}
        data={dados}
        keyExtractor={(item) => item.id.toString()}
        // Changed (prod) to ({ item }) to properly destructure the FlatList data
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{uri: item.image}} style={{width: 50, height: 50}} />
            <Text>{item.title}</Text>
            <Text>{item.price}</Text>
          </View>
        )}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center', 
  },
  card: {
    flexDirection: 'column',
    color: '#fff',
    elevation: 8,
    padding: 16,
    width: '100%'
  }
});