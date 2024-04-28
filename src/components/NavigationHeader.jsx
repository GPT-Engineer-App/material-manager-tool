import { Box, Flex, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

function NavigationHeader() {
  return (
    <Flex as="nav" padding="1.5rem" bg="blue.500" color="white" justifyContent="space-between">
      <Box>
        <Link as={RouterLink} to="/" px="4">
          Home
        </Link>
        <Link as={RouterLink} to="/materials" px="4">
          Materials
        </Link>
        <Link as={RouterLink} to="/stores" px="4">
          Stores
        </Link>
        <Link as={RouterLink} to="/products" px="4">
          Products
        </Link>
        <Link as={RouterLink} to="/stock" px="4">
          Stock
        </Link>
      </Box>
    </Flex>
  );
}

export default NavigationHeader;
