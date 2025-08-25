import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Stack,
  Text,
  Button,
  useToast,
  Flex,
  Avatar,
  useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { getSender } from "../config/ChatLogics";
import ChatLoading from "./ChatLoading";
import GroupChatModal from "./miscellaneous/GroupChatModal";
import { ChatState } from "../Context/ChatProvider";

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
  const toast = useToast();

  const bgColor = useColorModeValue("white", "gray.800");
  const cardBg = useColorModeValue("gray.100", "gray.700");

  const fetchChats = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
      };
      const { data } = await axios.get("/api/chat", config);
      setChats(data);
    } catch (error) {
      toast({
        title: "Error occurred!",
        description: "Failed to load the chats.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
    // eslint-disable-next-line
  }, [fetchAgain]);

  return (
    <Flex
      direction="column"
      bg={bgColor}
      w={{ base: "100%", md: "30%" }}
      borderRadius="lg"
      boxShadow="md"
      overflow="hidden"
    >
      <Flex
        p={4}
        align="center"
        justify="space-between"
        borderBottom="1px"
        borderColor="gray.200"
      >
        <Text fontSize="xl" fontWeight="bold" color="teal.600">
          My Chats
        </Text>
        <GroupChatModal>
          <Button size="sm" colorScheme="teal" rightIcon={<AddIcon />}>
            New Group
          </Button>
        </GroupChatModal>
      </Flex>

      <Box flex="1" overflowY="auto" p={2}
        sx={{
          "::-webkit-scrollbar": { width: "6px" },
          "::-webkit-scrollbar-thumb": { bg: "gray.300", borderRadius: "3px" },
        }}
      >
        {chats ? (
          <Stack spacing={3}>
            {chats.map((chat) => {
              const isSelected = selectedChat?._id === chat._id;
              return (
                <Box
                  key={chat._id}
                  onClick={() => setSelectedChat(chat)}
                  cursor="pointer"
                  bg={isSelected ? "teal.100" : cardBg}
                  p={3}
                  borderRadius="md"
                  boxShadow={isSelected ? "lg" : "sm"}
                  _hover={{ bg: isSelected ? "teal.200" : "gray.200" }}
                  transition="0.2s"
                >
                  <Text fontWeight="semibold">
                    {!chat.isGroupChat
                      ? getSender(loggedUser, chat.users)
                      : chat.chatName}
                  </Text>
                  {chat.latestMessage && (
                    <Text fontSize="sm" color="gray.500" noOfLines={1}>
                      <b>{chat.latestMessage.sender.name}:</b>{" "}
                      {chat.latestMessage.content.length > 50
                        ? `${chat.latestMessage.content.slice(0, 50)}...`
                        : chat.latestMessage.content}
                    </Text>
                  )}
                </Box>
              );
            })}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Flex>
  );
};

export default MyChats;
