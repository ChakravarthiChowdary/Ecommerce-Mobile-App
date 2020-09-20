import React, { useState } from "react";
import { FlatList } from "react-native";
import { List } from "react-native-paper";

const OrderItem = ({ order }) => {
  const [expanded, setExpanded] = useState(false);

  let deliveryDate = new Date(order.expectedDelivery).toString().slice(0, 15);

  const handlePress = () => setExpanded(!expanded);
  return (
    <List.Accordion
      title={`Order Id: ${order.id} \nExpected Date: ${deliveryDate}\nAddress: ${order.orderDetails.address}`}
      left={(props) => <List.Icon {...props} icon="basket" />}
      titleStyle={{ fontFamily: "RobotoBold" }}
      titleNumberOfLines={3}
      expanded={expanded}
      onPress={handlePress}
    >
      <FlatList
        data={order.cartProducts}
        renderItem={(itemData) => (
          <List.Item
            title={`${itemData.item.title} \nQty: ${
              itemData.item.quantity
            } Price:${itemData.item.quantity * itemData.item.sellingprice}`}
            titleStyle={{ fontFamily: "RobotoBold" }}
            titleNumberOfLines={3}
          />
        )}
      />
    </List.Accordion>
  );
};

export default OrderItem;
