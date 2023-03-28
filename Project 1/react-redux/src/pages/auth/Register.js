import { useState } from "react";
import { Link } from "react-router-dom";
import { register } from "../../utils/api";
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

function Register() {
  const toast = useToast();

  const [form, setForm] = useState({
    name: "",
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.id]: event.target.value,
    });
  };

  async function handleSubmit(event) {
    event.preventDefault();
    const { isSuccess } = register(form);

    if (isSuccess.status) {
      toast({
        title: "Berhasil Register",
        description: "Akun sudah dibuat, silahkan log in bos",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }
  }

  return (
    <Flex className="w-full flex flex-col h-screen justify-center items-center">
      <Box className="p-2">
        <Box className="text-center">
          <Heading>Register</Heading>
        </Box>
        <Box className="my-4 text-left">
          <form onSubmit={handleSubmit}>
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
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                id="name"
                placeholder="Your Name"
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
              Register
            </Button>
          </form>
          <Link to={"/login"}>
            <Button className="w-full mt-4">Log In</Button>
          </Link>
        </Box>
      </Box>
    </Flex>
  );
}

export default Register;
