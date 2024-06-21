import React from "react";
import { Box, Container, Flex } from "@chakra-ui/react";
import { useParams, useLocation } from "react-router-dom";
import UserFeedPosts from "../../components/FeedPosts/UserFeedPosts";
import SuggestedUsers from "../../components/SuggestedUsers/SuggestedUsers";
import ErrorBoundary from "../../components/ErrorBoundary/ErrorBoundary";
import ProfileFeed from "../../components/Profile/ProfileFeed";
import UserFeed from "../../components/FeedPosts/UserFeed";

const ProfilePageFeed = () => {
  const { username } = useParams();
  const location = useLocation();
  
  const searchParams = new URLSearchParams(location.search);
  const postId = searchParams.get("postId");

  return (
    <ErrorBoundary>
      <Container maxW={"100vw"}>
        <Flex gap={20}>
          <Box flex={2} py={2} ml={20}>
            <UserFeed username={username} postId={postId} />
          </Box>
          <Box flex={3} mr={20} display={{ base: "none", lg: "block" }} maxW={"300px"}>
            <SuggestedUsers />
          </Box>
        </Flex>
      </Container>
    </ErrorBoundary>
  );
};

export default ProfilePageFeed;
