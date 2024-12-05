import { useEffect } from "react"; //useState
import { Container, Text, Group, Button } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import { useSelector, useDispatch } from "react-redux";
import { setCartTotal } from "../../store/slices/cartSlice";
import CartItem from "../../components/Cart/CartItem/CartItem";
import { useNavigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";

import classes from "./Cart.module.css";

// Define types for the cart state
interface CartItemType {
  packageId: string;
  packageName: string;
  packagePrice: string; // The price should be a string, but we'll convert it to a number when needed
  country: string;
  flightDetails: string;
  stayDetails: string;
  activities: string[];
  bookDate: string;
  packageDuration: string;
  packageImage: string;
}

interface RootState {
  cartDetails: {
    cartItems: CartItemType[];
    cartTotal: number;
  };
  user: {
    userType: string | null;
  };
}

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems, cartTotal } = useSelector(
    (state: RootState) => state.cartDetails
  );
  const user = useSelector((state: RootState) => state.user);

  // Calculate total whenever cartItems change
  useEffect(() => {
    const newCartTotal = cartItems.reduce(
      (total, cartItem) => total + parseFloat(cartItem.packagePrice),
      0
    );
    dispatch(setCartTotal(newCartTotal)); // Update the total in the Redux store
  }, [cartItems, dispatch]);

  // Handle booking process
  const handleBook = () => {
    if (user !== null) {
      navigate("/checkout");
    } else {
      notifications.show({
        title: "You need to login first",
        message: "Please login to proceed with your booking.",
        icon: <IconInfoCircle size="1.1rem" />,
        color: "blue",
      });
      navigate("/auth");
    }
  };

  return (
    <Container>
      <Text size="xl" fw="bold" mt="xl" className={classes.title}>
        Cart Items
      </Text>
      {cartItems.length !== 0 ? (
        <CartItem data={cartItems} />
      ) : (
        <Text>Your cart is empty</Text>
      )}
      <Group justify="flex-end" mt="xl">
        <Text className={classes.totalLabel}>Your Total:</Text>
        <Text className={classes.totalPrice}>${cartTotal.toFixed(2)}</Text>
        <Button
          variant="gradient"
          gradient={{ from: "indigo", to: "cyan" }}
          onClick={handleBook}
        >
          Book Now
        </Button>
      </Group>
    </Container>
  );
};

export default Cart;
