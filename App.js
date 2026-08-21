import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';


export default function App() {

  const [dados, setDados] = useState([])

  async function carregaProdutos() {
    try {
      let resposta = await fetch("https://fakestoreapi.com/products/");
      if (resposta.status == 200) {
        let novosDados = await resposta.json();
        setDados(novosDados);

      }
      else {
        throw Exception("falha no carregamento de dados");
      }
    }
    catch (e) {
      console.log(e)
      throw Exception("Falha no carregamento de dados")
    }
  }

  useEffect(() => {
    carregaProdutos()
  }, 
  [])



  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <View style={styles.container}>
        {dados.map((item) =>
          <Text>
            {item.title}
          </Text>
        )}
      </View>
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
});
