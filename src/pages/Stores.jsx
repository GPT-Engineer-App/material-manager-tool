import React, { useState } from 'react';
import { Box, Input, Button, List, ListItem, ListIcon, IconButton } from '@chakra-ui/react';
import { FaTrash } from 'react-icons/fa';

function Stores() {
  const [stores, setStores] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleAddStore = () => {
    if (inputValue.trim() !== '') {
      setStores([...stores, inputValue]);
      setInputValue('');
    }
  };

  const handleDeleteStore = (index) => {
    const newStores = stores.filter((_, i) => i !== index);
    setStores(newStores);
  };

  return (
    <Box p={5}>
      <Input
        placeholder="Enter store name"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        mb={2}
      />
      <Button onClick={handleAddStore} colorScheme="blue">Add Store</Button>
      <List spacing={3} mt={4}>
        {stores.map((store, index) => (
          <ListItem key={index} d="flex" alignItems="center" justifyContent="space-between">
            {store}
            <IconButton
              icon={<FaTrash />}
              onClick={() => handleDeleteStore(index)}
              aria-label="Delete store"
              colorScheme="red"
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default Stores;