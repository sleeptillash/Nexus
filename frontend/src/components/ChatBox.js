import { Box, Text, Flex } from "@chakra-ui/react";
import SingleChat from "./SingleChat";
import { ChatState } from "../Context/ChatProvider";

const Chatbox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();

  return (
    <Flex
      display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      align="center"
      justify="center"
      flexDirection="column"
      w={{ base: "100%", md: "68%" }}
      p={4}
      bg="white"
      borderRadius="lg"
      boxShadow="md"
      transition="0.3s"
    >
      {selectedChat ? (
        <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
      ) : (
        <Flex
          align="center"
          justify="center"
          h="100%"
          color="gray.500"
          textAlign="center"
          p={5}
        >
          <Text fontSize="xl" fontWeight="medium">
            Select a chat to start messaging
          </Text>
        </Flex>
      )}
    </Flex>
  );
};

export default Chatbox;
