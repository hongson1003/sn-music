import React, { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View, Button } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { AccountEditHeader } from "../../components/account/accountHeader";

export default function AccountEditScreen() {
  const [name, setName] = useState("Lưu Trung Nghĩa");
  const [email, setEmail] = useState("luutrungnghia1901@gmail.com");
  const [address, setAddress] = useState("61/6 Nguyễn Văn Bảo phường 4 Gò Vấp Tp Hồ Chí Minh");
  const [gender, setGender] = useState("male"); // Trạng thái giới tính

  const handleSave = () => {
    console.log("Thông tin người dùng đã được cập nhật");
    console.log({ name, email, address, gender });
  };

  return (
    <SafeAreaView style={styles.container}>
      <AccountEditHeader src="https://cdn.giaoducthoidai.vn/images/87a7b2442062a13f399c8570bdaf2565c6e9fee887635e3df24ab654c546ca1c360523c166d730e899ab5decfecbfeb2e3f8b3502d607816d964998653596079/son-tung-m-tp-1.jpg" />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thông tin cá nhân</Text>
          <TextInput
            style={styles.input}
            placeholder="Nhập tên"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Nhập email"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={[styles.input, styles.addressInput]}
            placeholder="Nhập địa chỉ"
            value={address}
            onChangeText={setAddress}
            multiline={true}
            numberOfLines={4}
          />

          <Text style={styles.label}>Giới tính</Text>
          <Picker
            selectedValue={gender}
            onValueChange={(itemValue) => setGender(itemValue)}
            style={styles.picker}
            dropdownIconColor="#fff" 
          >
            <Picker.Item label="Nam" value="male" />
            <Picker.Item label="Nữ" value="female" />
            <Picker.Item label="Khác" value="other" />
          </Picker>

          <Button title="Lưu thay đổi" onPress={handleSave} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  scrollViewContent: {
    padding: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    color: "#fff",
    borderRadius: 5,
    backgroundColor: "#333",
  },
  addressInput: {
    height: 80,
    textAlignVertical: "top",
  },
  label: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 5,
  },
  picker: {
    color: "#fff", 
    backgroundColor: "#333",
    borderRadius: 5,
    marginBottom: 15,
  },
});
