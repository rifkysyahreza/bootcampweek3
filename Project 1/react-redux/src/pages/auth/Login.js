import { useState } from "react";
import { Link } from "react-router-dom";
import { login } from "../../utils/api";
import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";

function Login() {
  const toast = useToast();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.id]: event.target.value,
    });
  };

  async function HandleSubmit(event) {
    event.preventDefault();
    const { isSuccess } = await login(form);

    if (!isSuccess.status) {
      toast({
        title: "Gagal Login",
        description: isSuccess.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }

  return (
    <Flex className="w-full flex flex-col h-screen justify-center items-center">
      <Box className="p-2">
        <Box className="text-center">
          <Heading>Login</Heading>
        </Box>
        <Box className="my-4 text-left">
          <form onSubmit={HandleSubmit}>
            <FormControl isRequired>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                id="username"
                placeholder="yourusername"
                onChange={handleChange}
              />
            </FormControl>
            <FormControl isRequired className="mt-6">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                id="password"
                placeholder="*********"
                onChange={handleChange}
              />
            </FormControl>
            <Button className="w-full mt-4" type="submit">
              Sign In
            </Button>
          </form>
          <Link to={"/register"}>
            <Button className="w-full mt-4">Register</Button>
          </Link>
        </Box>
      </Box>
    </Flex>
  );
}

export default Login;
