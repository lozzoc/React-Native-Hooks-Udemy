import React, {useContext,useState} from 'react';
import { StyleSheet, Text, View,
  FlatList, TextInput, Button,
  TouchableOpacity} from 'react-native';
import {Feather } from "@expo/vector-icons"

import {Context} from "../context/BlogContext"
import BlogForm from "../components/BlogForm"

function CreateScreen({navigation}){
  const {state,addBlogPost} = useContext(Context)
  const [title,setTitle] = useState("")
  const [body,setBody] = useState("")

  return <BlogForm
    title={title}
    setTitle={setTitle}
    body={body}
    setBody={setBody}
    onSubmit={function(){
      addBlogPost({
        title,
        content: body
      },function(){
        navigation.pop()
      })
    }}
    />

}


const s = StyleSheet.create({
  input: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 15,
    padding: 5,
    margin: 5,
  },
  label: {
    fontSize: 20,
    marginBottom: 5,
    marginLeft: 5,
  }
})
export default CreateScreen
