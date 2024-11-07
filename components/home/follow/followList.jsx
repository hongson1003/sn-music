import React from "react";
import { FlatList, View } from "react-native";
import FollowItem from "./followItem";

const FollowList = ({ data = [] }) => {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => {
        return <FollowItem />;
      }}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => <View style={{ width: 14 }} />}
      horizontal
    />
  );
};

export default FollowList;
