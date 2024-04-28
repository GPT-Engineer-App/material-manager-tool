import React, { useState, useEffect } from "react";
import { Box, Input, Button, List, ListItem, ListIcon, IconButton } from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";

import { FaEdit } from "react-icons/fa";

function Stores() {
  const [stores, setStores] = useState([]);
  const apiUrl = "https://onzqccelfknbthepvesf.supabase.co/rest/v1/stores";
  const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9uenFjY2VsZmtuYnRoZXB2ZXNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQzMDQyMzUsImV4cCI6MjAyOTg4MDIzNX0.t7wOjwXFl0fFh2-N-59WT7090CwMTn8YBwWR1Z1_TUQ";
  useEffect(() => {
    fetch(apiUrl, {
      headers: {
        "Content-Type": "application/json",
        apikey: apiKey,
        Authorization: `Bearer ${apiKey}`,
      },
    })
      .then((response) => response.json())
      .then((data) =>
        setStores(
          data.map((store) => ({
            ...store,
            createdAt: new Date(store.created_at).toLocaleDateString("en-US"),
          })),
        ),
      )
      .catch((error) => console.error("Error fetching stores:", error));
  }, []);
  const [inputValue, setInputValue] = useState("");
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editingValue, setEditingValue] = useState("");

  const handleAddStore = () => {
    if (inputValue.trim() !== "") {
      fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: apiKey,
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({ name: inputValue }),
      })
        .then((response) => {
          if (response.status === 201) {
            return response.json().then((data) => data || {});
          }
          return {};
        })
        .then((data) => {
          setStores((prevStores) => [...prevStores, { ...inputValue, id: data.id }]);
          setInputValue("");
        })
        .catch((error) => console.error("Error adding store:", error));
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
      fetch(`${apiUrl}?id=eq.${stores[index].id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          apikey: apiKey,
          Authorization: `Bearer ${apiKey}`,
        },
      })
        .then(() => {
          const updatedStores = stores.filter((_, i) => i !== index);
          setStores(updatedStores);
        })
        .catch((error) => console.error("Error deleting store:", error));
    }
  };

  return (
    <Box p={5}>
      <Input placeholder="Enter store name" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyPress={(e) => e.key === "Enter" && handleAddStore()} mb={2} />
      <Button onClick={handleAddStore} colorScheme="blue">
        Add Store
      </Button>
      <List spacing={3} mt={4}>
        {stores.map((store, index) => (
          <ListItem key={index} d="flex" alignItems="center" justifyContent="space-between">
            {editingIndex === index ? <Input value={editingValue} onChange={(e) => setEditingValue(e.target.value)} size="sm" /> : `${store.name} - Created on: ${store.createdAt}`}
            <IconButton icon={<FaEdit />} onClick={() => handleEditStore(index, store)} aria-label="Edit store" colorScheme="yellow" variant="outline" mr={2} />
            <IconButton icon={<FaTrash />} onClick={() => handleDeleteStore(index)} aria-label="Delete store" colorScheme="red" variant="outline" />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default Stores;
