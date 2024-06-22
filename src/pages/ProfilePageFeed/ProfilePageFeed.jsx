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
    
      <Container p={0} maxW={{base: "100vw", md: "100vw"}} m={0} mb={{base: "12vh", md: "20px"}}>
			<Box
        px={0}
        mx="auto"
        height={{ base: "100vh", md: "auto" }}
        width={{ base: "100vw", md: "65vw" }}
        bottom={{ base: "10vh", md: "60px" }}
        left={0}
        transform="none"
        display="flex"
        flexDirection="column"
        justifyContent={{base: "none", md: "center"}}
        alignItems="center"
      >
        <Flex gap={20} px={0} mx={0} 
				justifyContent="center"
				>
          <Box flex={2} py={0} px={0} ml={{base: "none", md: "20"}}>
            <UserFeed username={username} postId={postId} />
          </Box>
          <Box px={0} ml={0} flex={3} mr={{base: "none", md: "20"}} display={{ base: "none", lg: "block" }} maxW={{base: "20vw", lg: "20vw"}}>
            <SuggestedUsers />
          </Box>
        </Flex>
        </Box>
      </Container>
    
  );
};

export default ProfilePageFeed;
