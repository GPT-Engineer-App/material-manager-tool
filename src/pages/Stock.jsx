import { useState, useEffect } from "react";
import { Box, FormControl, FormLabel, Input, Select, Button, useToast } from "@chakra-ui/react";

function Stock() {
  const [materials, setMaterials] = useState([]);
  const [stores, setStores] = useState([]);
  const [selectedMaterial, setMaterial] = useState("");
  const [selectedStore, setStore] = useState("");
  const toast = useToast();

  useEffect(() => {
    fetch("https://onzqccelfknbthepvesf.supabase.co/rest/v1/materials", {
      headers: {
        "Content-Type": "application/json",
        apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9uenFjY2VsZmtuYnRoZXB2ZXNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQzMDQyMzUsImV4cCI6MjAyOTg4MDIzNX0.t7wOjwXFl0fFh2-N-59WT7090CwMTn8YBwWR1Z1_TUQ",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9uenFjY2VsZmtuYnRoZXB2ZXNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQzMDQyMzUsImV4cCI6MjAyOTg4MDIzNX0.t7wOjwXFl0fFh2-N-59WT7090CwMTn8YBwWR1Z1_TUQ`,
      },
    })
      .then((response) => response.json())
      .then((data) => setMaterials(data))
      .catch((error) => {
        console.error("Error fetching materials:", error);
        toast({
          title: "Error fetching materials",
          description: "Unable to fetch materials data.",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      });

    fetch("https://onzqccelfknbthepvesf.supabase.co/rest/v1/stores", {
      headers: {
        "Content-Type": "application/json",
        apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9uenFjY2VsZmtuYnRoZXB2ZXNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQzMDQyMzUsImV4cCI6MjAyOTg4MDIzNX0.t7wOjwXFl0fFh2-N-59WT7090CwMTn8YBwWR1Z1_TUQ",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9uenFjY2VsZmtuYnRoZXB2ZXNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQzMDQyMzUsImV4cCI6MjAyOTg4MDIzNX0.t7wOjwXFl0fFh2-N-59WT7090CwMTn8YBwWR1Z1_TUQ`,
      },
    })
      .then((response) => response.json())
      .then((data) => setStores(data))
      .catch((error) => {
        console.error("Error fetching stores:", error);
        toast({
          title: "Error fetching stores",
          description: "Unable to fetch stores data.",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      });
  }, []);
  const [rolls, setRolls] = useState("");
  const [length, setLength] = useState("");
  const [unit, setUnit] = useState("");

  return (
    <Box p={4}>
      <FormControl>
        <FormLabel>Material Name</FormLabel>
        <Select placeholder="Select material" value={selectedMaterial} onChange={(e) => setMaterial(e.target.value)}>
          {materials.map((material) => (
            <option key={material.id} value={material.id}>
              {material.name}
            </option>
          ))}
        </Select>

        <FormLabel>Store</FormLabel>
        <Select placeholder="Select store" value={selectedStore} onChange={(e) => setStore(e.target.value)}>
          {stores.map((store) => (
            <option key={store.id} value={store.id}>
              {store.name}
            </option>
          ))}
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

        <Button mt={4} colorScheme="blue">
          Submit
        </Button>
      </FormControl>
    </Box>
  );
}

export default Stock;
