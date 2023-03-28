import React from "react";
import moment from "moment";
import { useEffect } from "react";
import { useGetProfile } from "../../utils/api";
import { useSelector, useDispatch } from "react-redux";
import { getDataUser } from "../../redux/action";
import { Flex, Box, Heading, Button, ButtonGroup } from "@chakra-ui/react";

function Profile() {
  // const { name, username, createdAt } = useGetProfile();
  const data = useSelector((state) => state.data.data);
  const dateOnlyText = data.created_at.slice(0, 10);
  const date = moment(dateOnlyText).format("dddd, MMMM Do YYYY");
  console.log(data);
  // const dateOnlyNumber = [];
  // for (var i = 0; i < dateOnlyText.length; i++) {
  //   dateOnlyNumber.push(parseInt(dateOnlyText[i]));
  // }
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDataUser());
  }, [dispatch]);

  // console.log(moment(dateOnlyNumber));

  const logOut = () => {
    localStorage.removeItem("Bearer");
    window.location.reload(true);
  };

  return (
    <Flex className="w-full flex flex-col h-screen justify-center items-center">
      <Box className="p-2 border-2 rounded-xl flex flex-col justify-center">
        <Box className="text-center">
          <Heading>Your Details</Heading>
        </Box>
        <Box className="my-4 text-left grid grid-cols-2">
          <div>
            <h1>Name </h1>
            <h1>Username </h1>
            <h1>Created at </h1>
          </div>
          <div>
            <h1>: {data.name}</h1>
            <h1>: {data.username}</h1>
            <h1>: {date}</h1>
          </div>
        </Box>
        <Button colorScheme="blue" onClick={logOut}>
          Sign Out
        </Button>
      </Box>
    </Flex>
  );
}

export default Profile;
