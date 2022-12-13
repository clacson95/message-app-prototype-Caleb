import { Box, Text } from "@chakra-ui/react";
import React from "react";

function UserListItem({ user, handleFunction }) {

  return (
    <Box
      onClick={handleFunction}
      cursor="pointer"
      w="100%"
      d="flex"
      alignItems="center"
      px={3}
      py={2}
      mb={2}
      borderRadius="lg"
    >
      <Box>
        <Text>{user.name}</Text>
        <Text fontSize="xs">
          <b>Email: </b>
          {user.email}
        </Text>
      </Box>
    </Box>
  );
}

export default UserListItem;
