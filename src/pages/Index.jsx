import React, { useState } from "react";
import { Box, Button, Flex, FormControl, FormLabel, Input, Table, Thead, Tbody, Tr, Th, Td, IconButton, useToast } from "@chakra-ui/react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const Index = () => {
  const [materials, setMaterials] = useState([]);
  const [newMaterial, setNewMaterial] = useState({ name: "", colorCode: "" });
  const toast = useToast();

  const handleAddMaterial = () => {
    if (!newMaterial.name || !newMaterial.colorCode) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setMaterials([...materials, newMaterial]);
    setNewMaterial({ name: "", colorCode: "" });
    toast({
      title: "Success",
      description: "Material added successfully.",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleDeleteMaterial = (index) => {
    const updatedMaterials = materials.filter((_, i) => i !== index);
    setMaterials(updatedMaterials);
    toast({
      title: "Deleted",
      description: "Material removed successfully.",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  const [editingIndex, setEditingIndex] = useState(-1);
  const [editingMaterial, setEditingMaterial] = useState({ name: "", colorCode: "" });

  const handleEditMaterial = (index) => {
    setEditingIndex(index);
    setEditingMaterial(materials[index]);
  };

  const handleUpdateMaterial = () => {
    const updatedMaterials = [...materials];
    updatedMaterials[editingIndex] = editingMaterial;
    setMaterials(updatedMaterials);
    setEditingIndex(-1);
    setEditingMaterial({ name: "", colorCode: "" });
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
              <Td>{material.name}</Td>
              <Td>{material.colorCode}</Td>
              <Td>
                {editingIndex === index ? (
                  <Box d="flex" alignItems="center">
                    <Text mr={2}>{material.name}</Text>
                    <Input value={editingMaterial.name} onChange={(e) => setEditingMaterial({ ...editingMaterial, name: e.target.value })} />
                    <Text mr={2} ml={4}>
                      {material.colorCode}
                    </Text>
                    <Input value={editingMaterial.colorCode} onChange={(e) => setEditingMaterial({ ...editingMaterial, colorCode: e.target.value })} ml={2} />
                    <Button onClick={handleUpdateMaterial} colorScheme="green" ml={2}>
                      Save
                    </Button>
                  </Box>
                ) : (
                  <>
                    <IconButton aria-label="Edit material" icon={<FaEdit />} variant="outline" onClick={() => handleEditMaterial(index)} />
                    <IconButton aria-label="Delete material" icon={<FaTrash />} variant="outline" onClick={() => handleDeleteMaterial(index)} ml={2} />
                  </>
                )}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default Index;
