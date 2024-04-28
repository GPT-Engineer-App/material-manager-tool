import { useState } from 'react';
import { Box, FormControl, FormLabel, Input, Select, Button } from '@chakra-ui/react';

function Stock() {
  const [material, setMaterial] = useState('');
  const [store, setStore] = useState('');
  const [rolls, setRolls] = useState('');
  const [length, setLength] = useState('');
  const [unit, setUnit] = useState('');

  return (
    <Box p={4}>
      <FormControl>
        <FormLabel>Material Name</FormLabel>
        <Select placeholder="Select material" onChange={(e) => setMaterial(e.target.value)}>
          {}
        </Select>

        <FormLabel>Store</FormLabel>
        <Select placeholder="Select store" onChange={(e) => setStore(e.target.value)}>
          {}
        </Select>

        <FormLabel>Total Number of Rolls</FormLabel>
        <Input placeholder="Enter total rolls" value={rolls} onChange={(e) => setRolls(e.target.value)} />

        <FormLabel>Total Length of Material</FormLabel>
        <Input placeholder="Enter total length" value={length} onChange={(e) => setLength(e.target.value)} />

        <FormLabel>Unit</FormLabel>
        <Select placeholder="Select unit" value={unit} onChange={(e) => setUnit(e.target.value)}>
          <option value="yard">Yard</option>
          <option value="meter">Meter</option>
        </Select>

        <Button mt={4} colorScheme="blue">Submit</Button>
      </FormControl>
    </Box>
  );
}

export default Stock;