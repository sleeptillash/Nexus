import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Link,
  VStack,
  HStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";

const FooterLinks = [
  
];

const Home = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user) navigate("/chats");
  }, [navigate]);

  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box
      overflow="hidden"
      m="0"
      p="0"
      bg="#f9fafb"  // Light gray background
      color="gray.800"
      minH="100vh"
      display="flex"
      flexDirection="column"
    >
      <Flex
        direction={{ base: "column", md: "row" }}
        flex="1"
        w="100vw"
        color="gray.800"
      >
        {/* Left Section: Text Content + Accent Background */}
        {!isMobile && (
          <Flex
            flex="1"
            direction="column"
            justify="center"
            align="center"
            px={{ base: 6, md: 16 }}
            bg="white" // white background for left section
            position="relative"
            textAlign="center"
            // boxShadow="md"
          >
            {/* Decorative accent behind text */}
            <Box
              position="absolute"
              top="20%"
              left="50%"
              transform="translateX(-50%)"
              width="320px"
              height="320px"
              bgGradient="radial(circle at center, #81E6D9, transparent 70%)" // pastel teal glow
              borderRadius="full"
              zIndex={-1}
              opacity={0.3}
            />

            <Heading
              fontSize={{ base: "3xl", md: "5xl" }}
              fontWeight="extrabold"
              mb={6}
              lineHeight="shorter"
              maxW="lg"
            >
              Nexus: Chat Freely, Instantly
            </Heading>

            <Text fontSize="xl" color="gray.600" maxW="lg" mb={6}>
              Experience real-time messaging with zero distractions, just pure
              connection. Chat seamlessly — fast, secure, and beautifully simple.
            </Text>

            {/* Feature Highlights */}
            <VStack spacing={4} maxW="md" align="stretch">
              <Box border="1px solid #B2DFDB" p={4} borderRadius="md" bg="#E6FFFA">
                <Text fontWeight="bold" fontSize="lg" color="teal.600">✔️ End-to-end encryption</Text>
                <Text fontSize="sm" color="gray.600">
                  Your conversations are always private and secure.
                </Text>
              </Box>
              <Box border="1px solid #B2DFDB" p={4} borderRadius="md" bg="#E6FFFA">
                <Text fontWeight="bold" fontSize="lg" color="teal.600">⚡ Instant notifications</Text>
                <Text fontSize="sm" color="gray.600">
                  Stay updated with real-time message alerts.
                </Text>
              </Box>
              <Box border="1px solid #B2DFDB" p={4} borderRadius="md" bg="#E6FFFA">
                <Text fontWeight="bold" fontSize="lg" color="teal.600">🌍 Connect globally</Text>
                <Text fontSize="sm" color="gray.600">
                  Chat with friends and family from anywhere in the world.
                </Text>
              </Box>
            </VStack>
          </Flex>
        )}

        {/* Right Section: Auth Form */}
        <Flex
          flex="1"
          align="center"
          justify="center"
          bg="white" // light gray for form background
          direction="column"
          p={4}
        >
          <Box
            w="100%"
            maxW="400px"
            bg="white" // white form background
            p={6}
            // border="1px solid #CBD5E0"
            borderRadius="md"
            // boxShadow="sm"
            textAlign="center"
          >
            <Heading
              as="h1"
              fontFamily="cursive"
              fontSize="4xl"
              mb={8}
              color="teal.600"
            >
              Nexus
            </Heading>

            {isLogin ? <Login /> : <Signup />}
          </Box>

          <Box
            w="100%"
            maxW="400px"
            mt={4}
            p={4}
            // border="1px solid #CBD5E0"
            // borderRadius="md"
            textAlign="center"
            bg="white"
            // boxShadow="sm"
          >
            {isLogin ? (
              <Text fontSize="sm" color="gray.600">
                Don't have an account?{" "}
                <Text
                  as="span"
                  color="teal.500"
                  cursor="pointer"
                  _hover={{ textDecoration: "underline" }}
                  onClick={() => setIsLogin(false)}
                >
                  Sign up
                </Text>
              </Text>
            ) : (
              <Text fontSize="sm" color="gray.600">
                Have an account?{" "}
                <Text
                  as="span"
                  color="teal.500"
                  cursor="pointer"
                  _hover={{ textDecoration: "underline" }}
                  onClick={() => setIsLogin(true)}
                >
                  Log in
                </Text>
              </Text>
            )}
          </Box>
        </Flex>
      </Flex>

      {/* Footer Section */}
      <Box
        bg="#F7FAFC"
        borderTop="1px solid #E2E8F0"
        py={6}
        px={{ base: 4, md: 16 }}
        textAlign="center"
      >
        <HStack
          spacing={4}
          justify="center"
          wrap="wrap"
          mb={4}
          color="gray.500"
          fontSize="sm"
        >
          {FooterLinks.map((link, i) => (
            <Link key={i} href="#" _hover={{ color: "teal.500" }}>
              {link}
            </Link>
          ))}
        </HStack>
        <Text color="gray.400" fontSize="xs">
          © 2025 Nexus. All rights reserved.
        </Text>
      </Box>
    </Box>
  );
};

export default Home;
