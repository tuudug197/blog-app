import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';

export default function Article({route}) {
    const { slug } = route.params
    const { width } = useWindowDimensions();
    const [article, setArticle] = useState()
    useEffect(() => {
        fetch(`https://dev.to/api/articles/abbeyperini/${slug}`)
        .then((res) => res.json())
        .then((data) => setArticle(data))
    }, [])

    if(!article) return <Text>Loading...</Text>

    return ( 
        <ScrollView>
            <RenderHtml
                contentWidth={width - 20}
                source={{ html: article.body_html}}
            />
        </ScrollView>
       
    )
}