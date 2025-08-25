import { Box, Flex } from "@chakra-ui/react";
import { useState } from "react";
import Chatbox from "../components/ChatBox";
import MyChats from "../components/MyChats";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import { ChatState } from "../Context/ChatProvider";

const Chatpage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();

  return (
    <Box w="100%" minH="100vh" bg="gray.50">
      {user && <SideDrawer />}
      <Flex
        w="100%"
        h="91.5vh"
        p={{ base: 2, md: 4 }}
        gap={4}
        justify="space-between"
        overflow="hidden"
      >
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Flex>
    </Box>
  );
};

export default Chatpage;
