import {
  Button,
  Box,
  Text,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Input,
  Avatar,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import { BellIcon, ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";
import { useDisclosure } from "@chakra-ui/hooks";
import { ChatState } from "../../Context/ChatProvider";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileModal from "./ProfileModal";
import ChatLoading from "../ChatLoading";
import { Spinner } from "@chakra-ui/spinner";
import UserListItem from "../userAvatar/UserListItem";
import { getSender } from "../../config/ChatLogics";

function SideDrawer() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const {
    user,
    notification,
    setNotification,
    setSelectedChat,
    chats,
    setChats,
  } = ChatState();

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  const handleSearch = async () => {
    if (!search.trim()) {
      return toast({
        title: "Enter something to search",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top-left",
      });
    }

    setLoading(true);
    try {
      const { data } = await axios.get(`/api/user?search=${search}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setSearchResult(data);
    } catch (err) {
      toast({
        title: "Search failed",
        description: err.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-left",
      });
    } finally {
      setLoading(false);
    }
  };

  const accessChat = async (userId) => {
    setLoadingChat(true);
    try {
      const { data } = await axios.post(
        "/api/chat",
        { userId },
        { headers: { "Content-type": "application/json", Authorization: `Bearer ${user.token}` } }
      );
      if (!chats.some((c) => c._id === data._id)) {
        setChats([data, ...chats]);
      }
      setSelectedChat(data);
      onClose();
    } catch (err) {
      toast({
        title: "Couldn't open chat",
        description: err.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-left",
      });
    } finally {
      setLoadingChat(false);
    }
  };

  const handleNotificationClick = () => {
    if (notification.length) {
      toast({
        title: `${notification.length} new message(s)`,
        status: "info",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    }
  };

  return (
    <>
      {/* Header */}
      <Box
        bg="white"
        px={4}
        py={3}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        boxShadow="sm"
        borderBottom="1px"
        borderColor="gray.200"
      >
        <Tooltip label="Search Users" hasArrow>
          <Button
            leftIcon={<SearchIcon />}
            colorScheme="teal"
            variant="outline"
            onClick={onOpen}
          >
            Search Users
          </Button>
        </Tooltip>

        <Text fontSize="xl" fontWeight="bold" color="teal.600">
          Nexus
        </Text>

        <Box display="flex" alignItems="center" gap={4}>
          {/* Notifications */}
          <Menu>
            <MenuButton onClick={handleNotificationClick} position="relative">
              <BellIcon boxSize={6} color="teal.600" />
              {notification.length > 0 && (
                <Box
                  position="absolute"
                  top="-1"
                  right="-1"
                  bg="red.500"
                  color="white"
                  fontSize="xs"
                  fontWeight="bold"
                  borderRadius="full"
                  px={2}
                  py={0.5}
                >
                  {notification.length}
                </Box>
              )}
            </MenuButton>
            <MenuList>
              {!notification.length ? (
                <Text px={2} py={1} color="gray.500">
                  No new messages
                </Text>
              ) : (
                notification.map((notif) => (
                  <MenuItem
                    key={notif._id}
                    onClick={() => {
                      setSelectedChat(notif.chat);
                      setNotification(notification.filter((n) => n !== notif));
                    }}
                  >
                    {notif.chat.isGroupChat
                      ? `New message in ${notif.chat.chatName}`
                      : `New message from ${getSender(user, notif.chat.users)}`}
                  </MenuItem>
                ))
              )}
            </MenuList>
          </Menu>

          {/* Profile Menu */}
          <Menu>
            <MenuButton>
              <Avatar name={user.name} src={user.pic} />
            </MenuButton>
            <MenuList>
              <ProfileModal user={user}>
                <MenuItem>My Profile</MenuItem>
              </ProfileModal>
              <MenuDivider />
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Box>

      {/* Search Drawer */}
      <Drawer onClose={onClose} isOpen={isOpen} placement="left" size="md">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
          <DrawerBody>
            <Box mb={4} display="flex">
              <Input
                placeholder="Search by name or email"
                variant="filled"
                _focus={{ bg: "white", borderColor: "teal.500" }}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button ml={2} colorScheme="teal" onClick={handleSearch}>
                Go
              </Button>
            </Box>

            {loading ? (
              <ChatLoading />
            ) : (
              searchResult.map((u) => (
                <UserListItem
                  key={u._id}
                  user={u}
                  handleFunction={() => accessChat(u._id)}
                />
              ))
            )}
            {loadingChat && (
              <Spinner mt={4} alignSelf="center" color="teal.500" />
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default SideDrawer;
