import React, { useState, useEffect } from "react";
import { Box, Button, Flex, FormControl, FormLabel, Input, Table, Thead, Tbody, Tr, Th, Td, IconButton, useToast, Text } from "@chakra-ui/react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const Index = () => {
  const [materials, setMaterials] = useState([]);
  const apiUrl = "https://onzqccelfknbthepvesf.supabase.co/rest/v1/materials";
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
      .then((data) => setMaterials(data.map((item) => ({ ...item, colorCode: item.color }))))
      .catch((error) => console.error("Error fetching materials:", error));
  }, []);
  const [newMaterial, setNewMaterial] = useState({ name: "", colorCode: "" });
  const toast = useToast();

  const handleAddMaterial = () => {
    if (newMaterial.name.trim() === "" || newMaterial.colorCode.trim() === "") {
      toast({
        title: "Error",
        description: "All fields must be filled.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    } else {
      fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: apiKey,
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({ name: newMaterial.name, color: newMaterial.colorCode }),
      })
        .then((response) => response.json())
        .then((response) => response.json())
        .then((data) => {
          setMaterials((prevMaterials) => [...prevMaterials, { ...newMaterial, id: data.id }]);
          setNewMaterial({ name: "", colorCode: "" });
          toast({
            title: "Material Added",
            description: "The material has been added successfully.",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
        })
        .catch((error) => console.error("Error adding material:", error));
      setNewMaterial({ name: "", colorCode: "" });
      toast({
        title: "Material Added",
        description: "The material has been added successfully.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleDeleteMaterial = (materialId) => {
    fetch(`${apiUrl}?id=eq.${materialId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        apikey: apiKey,
        Authorization: `Bearer ${apiKey}`,
      },
    })
      .then(() => {
        setMaterials((prevMaterials) => prevMaterials.filter((material) => material.id !== materialId));
        toast({
          title: "Material Deleted",
          description: "The material has been removed.",
          status: "info",
          duration: 2000,
          isClosable: true,
        });
      })
      .catch((error) => console.error("Error deleting material:", error));
    toast({
      title: "Material Deleted",
      description: "The material has been removed.",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  const [editingIndex, setEditingIndex] = useState(-1);
  const [editingMaterial, setEditingMaterial] = useState({ name: "", colorCode: "" });

  const handleEditMaterial = (materialId) => {
    const material = materials.find((m) => m.id === materialId);
    if (material) {
      setEditingIndex(materials.indexOf(material));
      setEditingMaterial({ ...material });
    }
  };

  const handleUpdateMaterial = () => {
    if (editingMaterial.name.trim() === "" || editingMaterial.colorCode.trim() === "") {
      toast({
        title: "Error",
        description: "All fields must be filled.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    } else {
      fetch(`${apiUrl}?id=eq.${editingMaterial.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          apikey: apiKey,
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({ name: editingMaterial.name, color: editingMaterial.colorCode }),
      })
        .then(() => {
          setMaterials((prevMaterials) => prevMaterials.map((material) => (material.id === editingMaterial.id ? editingMaterial : material)));
          setEditingIndex(-1);
          setEditingMaterial({ name: "", colorCode: "" });
          toast({
            title: "Material Updated",
            description: "The material has been updated successfully.",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
        })
        .catch((error) => console.error("Error updating material:", error));
      setEditingIndex(-1);
      setEditingMaterial({ name: "", colorCode: "" });
      toast({
        title: "Material Updated",
        description: "The material has been updated successfully.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={5}>
      <Flex gap="20px" mb={5}>
        <FormControl>
          <FormLabel htmlFor="material-name">Material Name</FormLabel>
          <Input id="material-name" value={newMaterial.name} onChange={(e) => setNewMaterial({ ...newMaterial, name: e.target.value })} />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="color-code">Color Code</FormLabel>
          <Input id="color-code" value={newMaterial.colorCode} onChange={(e) => setNewMaterial({ ...newMaterial, colorCode: e.target.value })} />
        </FormControl>
        <Button leftIcon={<FaPlus />} colorScheme="blue" onClick={handleAddMaterial}>
          Add Material
        </Button>
      </Flex>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Material Name</Th>
            <Th>Color Code</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {materials.map((material, index) => (
            <Tr key={index}>
              {editingIndex === index ? (
                <>
                  <Td>
                    <Input value={editingMaterial.name} onChange={(e) => setEditingMaterial({ ...editingMaterial, name: e.target.value })} />
                  </Td>
                  <Td>
                    <Input value={editingMaterial.colorCode} onChange={(e) => setEditingMaterial({ ...editingMaterial, colorCode: e.target.value })} />
                  </Td>
                  <Td>
                    <Button onClick={handleUpdateMaterial} colorScheme="green" ml="2">
                      Save
                    </Button>
                  </Td>
                </>
              ) : (
                <>
                  <Td>{material.name}</Td>
                  <Td>{material.colorCode}</Td>
                  <Td>
                    <IconButton aria-label="Edit material" icon={<FaEdit />} variant="outline" onClick={() => handleEditMaterial(material.id)} />
                    <IconButton aria-label="Delete material" icon={<FaTrash />} variant="outline" onClick={() => handleDeleteMaterial(material.id)} ml={2} />
                  </Td>
                </>
              )}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default Index;
