import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  IconButton,
  Text,
  Box,
  Avatar,
  Input,
  Textarea,
  Divider,
  useToast,
  Flex,
} from "@chakra-ui/react";
import { ViewIcon, EditIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons";

const ProfileModal = ({ user, children, onImageChange }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const [aboutText, setAboutText] = useState(user.about || "");
  const [isEditingAbout, setIsEditingAbout] = useState(false);
  const [tempAbout, setTempAbout] = useState(user.about || "");
  const [updatingAbout, setUpdatingAbout] = useState(false);

  // Image upload logic
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && /image\/(jpeg|png)/.test(file.type)) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      toast({
        title: "Invalid file",
        description: "Only JPEG or PNG files allowed.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleUpload = () => {
    if (!selectedFile) return;
    setUploading(true);

    // Replace with backend upload logic
    setTimeout(() => {
      onImageChange?.(previewUrl);
      setUploading(false);
      toast({
        title: "Profile picture updated!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setSelectedFile(null);
    }, 1000);
  };

  // About update logic
  const handleUpdateAbout = () => {
    setUpdatingAbout(true);

    // Simulated backend request
    setTimeout(() => {
      setAboutText(tempAbout.trim());
      setIsEditingAbout(false);
      setUpdatingAbout(false);
      toast({
        title: "About info updated!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }, 800);
  };

  // Cancel editing about - revert to saved about
  const cancelEditAbout = () => {
    setTempAbout(aboutText);
    setIsEditingAbout(false);
  };

  return (
    <>
      {children ? (
        <Box onClick={onOpen} cursor="pointer">
          {children}
        </Box>
      ) : (
        <IconButton
          icon={<ViewIcon />}
          onClick={onOpen}
          variant="ghost"
          aria-label="View Profile"
        />
      )}

      <Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
        <ModalOverlay />
        <ModalContent bg="white" borderRadius="lg" boxShadow="xl">
          <Box bg="teal.600" p={4} position="relative" h="60px">
            <Avatar
              size="2xl"
              name={user.name}
              src={previewUrl || user.pic}
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -60%)"
              border="4px solid white"
            />
          </Box>

          <ModalCloseButton color="white" />

          <ModalBody pt="70px" textAlign="center">
            <Text fontSize="2xl" fontWeight="bold">
              {user.name}
            </Text>
            <Text fontSize="sm" color="gray.500" mb={2}>
              {user.email}
            </Text>

            {/* ABOUT SECTION */}
            <Divider my={4} />
            <Text fontWeight="semibold" mb={2} fontSize="lg" textAlign="left">
              About
            </Text>

            {!isEditingAbout ? (
              <Box textAlign="left" mb={3} minH="60px" whiteSpace="pre-wrap">
                {aboutText ? (
                  <>
                    <Text mb={2}>{aboutText}</Text>
                    <Button
                      size="sm"
                      colorScheme="teal"
                      leftIcon={<EditIcon />}
                      onClick={() => setIsEditingAbout(true)}
                    >
                      Update About
                    </Button>
                  </>
                ) : (
                  <Button
                    size="sm"
                    variant="outline"
                    colorScheme="teal"
                    onClick={() => setIsEditingAbout(true)}
                  >
                    Add About
                  </Button>
                )}
              </Box>
            ) : (
              <Box textAlign="left" mb={3}>
                <Textarea
                  placeholder="Tell us something about yourself..."
                  value={tempAbout}
                  onChange={(e) => setTempAbout(e.target.value)}
                  resize="none"
                  fontSize="sm"
                  mb={2}
                  minH="80px"
                />
                <Flex gap={2}>
                  <Button
                    size="sm"
                    colorScheme="teal"
                    isLoading={updatingAbout}
                    onClick={handleUpdateAbout}
                    leftIcon={<CheckIcon />}
                    isDisabled={tempAbout.trim().length === 0}
                  >
                    Save
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={cancelEditAbout}
                    leftIcon={<CloseIcon />}
                    isDisabled={updatingAbout}
                  >
                    Cancel
                  </Button>
                </Flex>
              </Box>
            )}

            {/* PROFILE PICTURE UPLOAD */}
            <Divider my={3} />
            <Text fontWeight="semibold" mb={2} textAlign="left">
              Change Profile Picture
            </Text>
            <Input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              mt={2}
              border="none"
              p={1}
              _focus={{ outline: "none" }}
            />
            {previewUrl && (
              <Box mt={4} textAlign="center">
                <Avatar size="xl" src={previewUrl} mb={2} />
              </Box>
            )}
          </ModalBody>

          <ModalFooter justifyContent="center">
            <Button
              colorScheme="teal"
              leftIcon={<EditIcon />}
              onClick={handleUpload}
              isLoading={uploading}
              isDisabled={!previewUrl}
              mr={3}
            >
              Update Photo
            </Button>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModal;
