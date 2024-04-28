import { Box, Flex, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

function NavigationHeader() {
  return (
    <Flex as="nav" padding="1.5rem" bg="blue.500" color="white" justifyContent="space-between">
      <Box>
        <Link as={RouterLink} to="/" px="4">Home</Link>
        <Link as={RouterLink} to="/materials" px="4">Materials</Link>
      </Box>
    </Flex>
  );
}

export default NavigationHeader;