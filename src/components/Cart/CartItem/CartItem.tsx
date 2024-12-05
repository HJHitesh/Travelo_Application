import { useDispatch } from "react-redux";
import { deleteItemFromCart } from "../../../store/slices/cartSlice";
import { Table, Text, ActionIcon, ScrollArea } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";

// Define the Package type
type Package = {
  packageId: string;
  packageName: string;
  bookDate: string;
  country: string;
  packagePrice: string;
  packageDuration: string;
  stayDetails: string;
  flightDetails: string;
  packageImage: string;
  activities: string[];
};

// Define the component props
interface CartItemProps {
  data: Package[];
}

const CartItem = ({ data }: CartItemProps) => {
  const dispatch = useDispatch();

  // Handler to delete item from the cart
  const deleteItemHandler = (item: Package): void => {
    dispatch(deleteItemFromCart(item));
  };

  // Render the rows with item details
  const rows = data.map((item) => {
    const price = parseFloat(item.packagePrice);
    const formattedPrice = !isNaN(price) ? price.toFixed(2) : "0.00"; // Safe price formatting

    return (
      <Table.Tr key={item.packageId}>
        <Table.Td>
          <Text fz="sm" fw={500}>
            {item.packageName}
          </Text>
        </Table.Td>
        <Table.Td>
          <Text fz="sm">{item.bookDate}</Text>
        </Table.Td>
        <Table.Td>
          <Text fz="sm">{item.country}</Text>
        </Table.Td>
        <Table.Td>
          <Text fz="sm" fw="bold">
            ${formattedPrice}
          </Text>
        </Table.Td>
        <Table.Td>
          <ActionIcon color="red" onClick={() => deleteItemHandler(item)}>
            <IconTrash size="1rem" stroke={1.5} />
          </ActionIcon>
        </Table.Td>
      </Table.Tr>
    );
  });

  return (
    <ScrollArea>
      <Table striped highlightOnHover verticalSpacing="sm" mt="xl">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Package Name</Table.Th>
            <Table.Th>Booking Date</Table.Th>
            <Table.Th>Country</Table.Th>
            <Table.Th>Price</Table.Th>
            <Table.Th />
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </ScrollArea>
  );
};

export default CartItem;
