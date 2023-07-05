import React from 'react'
import { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, View, Text, Image } from 'react-native'
import { Card } from 'react-native-paper'

export default function Home({ navigation }) {
  const [articles, setArticles] = useState([])
  useEffect(() => {
    fetch('https://dev.to/api/articles?username=abbeyperini')
      .then((res) => res.json())
      .then((data) => setArticles(data))
  }, [])

  return (
    <ScrollView style={styles.container}>
      {articles.map((article) => {
        return (
          <Card
            style={styles.card}
            key={article.id}
            onPress={() =>
              navigation.navigate('Article', {
                slug: article.slug,
              })
            }
            children={
              <>
                <Image
                  style={styles.coverImage}
                  source={{ url: article.cover_image }}
                />
                <Card.Content>
                  <View style={{ paddingVertical: 10 }}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontSize: 16,
                      }}
                    >
                      {article.title}
                    </Text>
                    <Text style={{ fontSize: 14 }}>{article.description}</Text>
                  </View>
                </Card.Content>
              </>
            }
          />
        )
      })}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 14,
  },
  card: {
    width: '100%',
    marginVertical: 7,
  },
  coverImage: {
    width: '100%',
    height: 200,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
})
