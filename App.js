import { StatusBar } from 'expo-status-bar';
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Task from './components/Task';
import React, { useState } from "react";

export default function App() {

  const [task, setTask] = useState("");
  const [taskItems, setTasksItems] = useState([]);

  const handleAddTask = () => {
    setTasksItems([...taskItems, task]);
    setTask("");
    Keyboard.dismiss();
  }

  const completeTask = (index)  => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTasksItems(itemsCopy);
  }

  return (
    <View style={styles.container}>
      <View style={styles.taskWrapper}>
        <Text stylE={styles.sectionTitle}>Today's tasks!</Text>
        <View style={styles.items}>
          { taskItems.map((task, index) => {
            return (
              <TouchableOpacity onPress={() => completeTask(index)}>
                <Task text={task} />
              </TouchableOpacity>
            )
          }) }
        </View>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput style={styles.input} placeholder={"Write a task!"} onChangeText={ task => setTask(task) } value={task} />
        <TouchableOpacity onPress={handleAddTask} >
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F1F1',
  },
  taskWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 60,
    backgroundColor: "#FFF",
    borderRadius: 60,
    borderColor: "C0C0C0",
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "C0C0C0",
    borderWidth: 1,
  },
  addText: {},
});
