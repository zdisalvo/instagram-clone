import React from "react";
import { Box, Container, Flex } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import UserFeedPosts from "../../components/FeedPosts/UserFeedPosts";
import SuggestedUsers from "../../components/SuggestedUsers/SuggestedUsers";

const ProfilePageFeed = () => {
  const { username } = useParams();

  return (
    <Container maxW={"container.lg"}>
      <Flex gap={20}>
        <Box flex={2} py={10}>
          <UserFeedPosts username={username} />
        </Box>
        <Box flex={3} mr={20} display={{ base: "none", lg: "block" }} maxW={"300px"}>
          <SuggestedUsers />
        </Box>
      </Flex>
    </Container>
  );
};

export default ProfilePageFeed;
