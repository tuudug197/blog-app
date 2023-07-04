import React from 'react'
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { Card } from 'react-native-paper';

export default function Home({ navigation}) {
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