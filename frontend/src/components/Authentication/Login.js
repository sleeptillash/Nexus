import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  useToast,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Please fill all the fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      const config = { headers: { "Content-type": "application/json" } };
      const { data } = await axios.post("/api/user/login", { email, password }, config);

      toast({
        title: "Login successful!",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/chats");
    } catch (error) {
      toast({
        title: "Error occurred!",
        description:
          error.response?.data?.message || "An unexpected error occurred.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  return (
    <VStack spacing={5} align="stretch" w="100%">
      <FormControl id="email" isRequired>
        {/* <FormLabel>Email Address</FormLabel> */}
        <Input
          value={email}
          type="email"
          placeholder="Enter your email address"
          onChange={(e) => setEmail(e.target.value)}
          focusBorderColor="teal.400"
          border="1px solid #B2DFDB"
          boxShadow="sm"
          _hover={{ boxShadow: "md" }}
        />
      </FormControl>

      <FormControl id="password" isRequired>
        {/* <FormLabel>Password</FormLabel> */}
        <InputGroup size="md">
          <Input
            value={password}
            type={show ? "text" : "password"}
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            focusBorderColor="teal.400"
            border="1px solid #B2DFDB"
            boxShadow="sm"
            _hover={{ boxShadow: "md" }}
          />
          <InputRightElement width="4.5rem">
            <Button
              h="1.75rem"
              size="sm"
              onClick={handleClick}
              variant="ghost"
              aria-label={show ? "Hide password" : "Show password"}
            >
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        colorScheme="teal"
        width="100%"
        mt={4}
        onClick={submitHandler}
        isLoading={loading}
        loadingText="Logging in"
        boxShadow="md"
        _hover={{ boxShadow: "lg" }}
      >
        Login
      </Button>

      {/* <Button
        variant="outline"
        colorScheme="teal"
        width="100%"
        onClick={() => {
          setEmail("guest@example.com");
          setPassword("123456");
        }}
        mt={2}
        boxShadow="sm"
        _hover={{ bg: "teal.50" }}
      >
        Get Guest User Credentials
      </Button>
      
      <Text fontSize="sm" color="gray.500" textAlign="center" mt={4}>
        (Use guest credentials to explore the app without signup)
      </Text> */}
    </VStack>
  );
};

export default Login;
