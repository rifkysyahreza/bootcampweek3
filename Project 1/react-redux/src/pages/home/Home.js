import React, { useState, useEffect, useMemo } from "react";
import moment from "moment";
import {
  Flex,
  Box,
  Heading,
  Button,
  ButtonGroup,
  list,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Select,
  useToast,
} from "@chakra-ui/react";
import { useGetPost, useGetCategory, createPost } from "../../utils/api";

function Home() {
  const { post } = useGetPost();
  const { dataCategory } = useGetCategory();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [form, setForm] = useState({
    title: "",
    category_id: "",
    content: "",
  });

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.id]: event.target.value,
    });
  };

  async function handleCreatePost(event) {
    event.preventDefault();
    const { isSuccess } = await createPost(form);

    if (isSuccess.status) {
      toast({
        title: "Berhasil Post",
        description: "Postingan sudah dibuat, silahkan dilihat bos",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }
  }

  return (
    <div>
      <Flex className="flex-col items-center p-5">
        <Button
          colorScheme="blue"
          onClick={() => {
            onOpen();
          }}
        >
          Create Post
        </Button>
        <Flex className="flex justify-center gap-5">
          {post ? (
            post.map((elements, index) => (
              <Box key={index}>
                <h1>{elements.name}</h1>
                <h1>{elements.category_name}</h1>
                <h1>
                  {moment(elements.created_at).format("dddd, MMMM Do YYYY")}
                </h1>
                <h1>{elements.title}</h1>
                <h1>{elements.content}</h1>
              </Box>
            ))
          ) : (
            <h1>Tidak ada data!</h1>
          )}
        </Flex>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />

          <form onSubmit={handleCreatePost}>
            <ModalBody className="space-y-3">
              <FormControl isRequired>
                <FormLabel>Category</FormLabel>
                <Select
                  placeholder="Select category"
                  id="category_id"
                  onChange={handleChange}
                >
                  {dataCategory ? (
                    dataCategory.map((elements, index) => (
                      <option key={index} value={elements.id}>
                        {elements.category}
                      </option>
                    ))
                  ) : (
                    <h1>Tidak ada data!</h1>
                  )}
                </Select>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Title</FormLabel>
                <Input
                  type="text"
                  id="title"
                  placeholder="Post Title"
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Post Content</FormLabel>
                <Input
                  type="text"
                  id="content"
                  placeholder="Write your content...."
                  onChange={handleChange}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} type="submit">
                Submit
              </Button>
              <Button colorScheme="red" onClick={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
      ;
    </div>
  );
}

export default Home;
