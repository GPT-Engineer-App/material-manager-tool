import React, { useState } from "react";
import { Box, Text, Input, Button, List, ListItem, IconButton } from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";

function Products() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: "", category: "" });
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editingProduct, setEditingProduct] = useState({ name: "", category: "" });

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.category) {
      setProducts([...products, newProduct]);
      setNewProduct({ name: "", category: "" });
    }
  };

  const handleEditProduct = (index) => {
    setEditingIndex(index);
    setEditingProduct(products[index]);
  };

  const handleUpdateProduct = () => {
    const updatedProducts = [...products];
    updatedProducts[editingIndex] = editingProduct;
    setProducts(updatedProducts);
    setEditingIndex(-1);
    setEditingProduct({ name: "", category: "" });
  };

  const handleDeleteProduct = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  };

  return (
    <Box p={5}>
      <Text fontSize="2xl">Products Page</Text>
      <Box my={4}>
        <Input placeholder="Product Name" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
        <Input placeholder="Product Category" value={newProduct.category} onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })} mt={2} />
        <Button onClick={handleAddProduct} colorScheme="blue" mt={2}>
          Add Product
        </Button>
      </Box>
      <List spacing={3}>
        {products.map((product, index) => (
          <ListItem key={index} d="flex" alignItems="center" justifyContent="space-between">
            {editingIndex === index ? (
              <>
                <Input value={editingProduct.name} onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })} />
                <Input value={editingProduct.category} onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })} mt={2} />
                <Button onClick={handleUpdateProduct} colorScheme="green" mt={2}>
                  Update
                </Button>
              </>
            ) : (
              <>
                <Text>
                  {product.name} - {product.category}
                </Text>
                <IconButton icon={<FaEdit />} onClick={() => handleEditProduct(index)} aria-label="Edit product" colorScheme="yellow" variant="outline" mr={2} />
                <IconButton icon={<FaTrash />} onClick={() => handleDeleteProduct(index)} aria-label="Delete product" colorScheme="red" variant="outline" />
              </>
            )}
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default Products;
