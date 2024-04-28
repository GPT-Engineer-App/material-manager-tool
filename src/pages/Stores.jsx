import React, { useState } from "react";
import { Box, Input, Button, List, ListItem, ListIcon, IconButton } from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";

import { FaEdit } from "react-icons/fa";

function Stores() {
  const [stores, setStores] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editingValue, setEditingValue] = useState("");

  const handleAddStore = () => {
    if (inputValue.trim() !== "") {
      setStores([...stores, inputValue]);
      setInputValue("");
    }
  };

  const handleEditStore = (index, store) => {
    setEditingIndex(index);
    setEditingValue(store);
  };

  const confirmEditStore = () => {
    const updatedStores = [...stores];
    updatedStores[editingIndex] = editingValue;
    setStores(updatedStores);
    setEditingIndex(-1);
    setEditingValue("");
  };

  const handleDeleteStore = (index) => {
    if (editingIndex !== index) {
      const newStores = stores.filter((_, i) => i !== index);
      setStores(newStores);
    }
  };

  return (
    <Box p={5}>
      <Input placeholder="Enter store name" value={inputValue} onChange={(e) => setInputValue(e.target.value)} mb={2} />
      <Button onClick={handleAddStore} colorScheme="blue">
        Add Store
      </Button>
      <List spacing={3} mt={4}>
        {stores.map((store, index) => (
          <ListItem key={index} d="flex" alignItems="center" justifyContent="space-between">
            {editingIndex === index ? <Input value={editingValue} onChange={(e) => setEditingValue(e.target.value)} size="sm" /> : store}
            <IconButton icon={<FaEdit />} onClick={() => handleEditStore(index, store)} aria-label="Edit store" colorScheme="yellow" variant="outline" mr={2} />
            <IconButton icon={<FaTrash />} onClick={() => handleDeleteStore(index)} aria-label="Delete store" colorScheme="red" variant="outline" />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default Stores;
