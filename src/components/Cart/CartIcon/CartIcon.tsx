import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setCartCount } from "../../../store/slices/cartSlice";
import { Container, Indicator } from "@mantine/core";
import { IconShoppingCart } from "@tabler/icons-react";

const CartIcon = () => {
  const { cartItems, cartCount } = useSelector(
    (state: {
      cartDetails: {
        cartItems: { packageId: string; quantity: number }[];
        cartCount: number;
      };
    }) => state.cartDetails
  );

  const dispatch = useDispatch();

  useEffect(() => {
    // Update cart count based on the cartItems array length
    dispatch(setCartCount(cartItems.length));
  }, [cartItems, dispatch]);

  return (
    <Container pr={15}>
      <Indicator inline label={cartCount} size={17}>
        <Link to="/cart">
          <IconShoppingCart />
        </Link>
      </Indicator>
    </Container>
  );
};

export default CartIcon;
