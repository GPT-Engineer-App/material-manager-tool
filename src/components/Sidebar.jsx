import React from "react";
import { Box, Drawer, DrawerContent, useDisclosure } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Sidebar() {
  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: true });
  return (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerContent>
        <Box p="5">
          <Link to="/">Home</Link>
          <Link to="/materials">Materials</Link>
        </Box>
      </DrawerContent>
    </Drawer>
  );
}

export default Sidebar;
