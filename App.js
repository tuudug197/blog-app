import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Chip, Card } from 'react-native-paper';
import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Article from './screens/Article';

const Stack = createNativeStackNavigator();

export default function App() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={ Home} />     
        <Stack.Screen name="Article" component={ Article} />     
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}

const Home = ({ navigation }) => {
  const [articles, setArticles] = useState([])
  useEffect(() => {
    fetch("https://dev.to/api/articles?username=abbeyperini")
      .then((res) => res.json())
      .then((data) => setArticles(data))
  }, [])

  return (
    <ScrollView style={styles.container}>
      {articles.map((article) => {
        return (
          <Card
            key={article.id}
            style={ styles.card}
            onPress={() => navigation.navigate("Article", {slug: article.slug}) }
          >
          <Card.Content>
            <Text>{article.title}</Text>
          </Card.Content>
          </Card>
      )})}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    
  },
  card: {
    width: "100%",
    display: "flex",
    alignItems: "center"
  }
});