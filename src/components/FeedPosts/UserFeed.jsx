import React, { useEffect, useRef, useState } from "react";
import { Box, Container, Flex, Skeleton, SkeletonCircle, Text, VStack } from "@chakra-ui/react";
import FeedPost from "./FeedPost";
import useGetUserFeed from "../../hooks/useGetUserFeed";
import { useLocation, useParams } from "react-router-dom";

const UserFeed = () => {
  const { username } = useParams();
  const location = useLocation();
  const postId = location.state?.postId;
  const { isLoading, posts } = useGetUserFeed(username);
  const postRefs = useRef({});
  const [shouldScroll, setShouldScroll] = useState(false);

  useEffect(() => {
    if (!isLoading && postId && postRefs.current[postId]) {
      postRefs.current[postId].scrollIntoView({ behavior: "smooth" });
      setShouldScroll(false); // Reset to false after scrolling
    }
  }, [posts, postId, isLoading]);

  useEffect(() => {
    if (!isLoading) {
      // Once posts are loaded, check if postId exists
      if (postId && postRefs.current[postId]) {
        postRefs.current[postId].scrollIntoView({ behavior: "smooth" });
        setShouldScroll(false); // Reset to false after scrolling
      }
    } else {
      setShouldScroll(true); // Set to true to attempt scrolling once posts are loaded
    }
  }, [isLoading]);

  return (
    <Container p={0} maxW="100vw" m={0}>
			<Box
			px={0}
			mx={0}
			height={{base: "90vh", md: "auto"}}
			width={{base: "100vw", md: "27vw"}}
			
			bottom={{base: "10vh", md: "60px"}}

			// left={{ base: 0, md: "30%" }} 
			// transform={{ base: "none", md: "translateX(-30%)" }} 

			left={{ base: 0, md: "0%" }} 
			transform={{ base: "none", md: "none" }} 
      
		>
      {isLoading &&
        [0, 1, 2].map((_, idx) => (
          <VStack key={idx} gap={4} alignItems={"flex-start"} mb={10}>
            <Flex gap="2">
              <SkeletonCircle size="10" />
              <VStack gap={2} alignItems={"flex-start"}>
                <Skeleton height="10px" w={"200px"} />
                <Skeleton height="10px" w={"200px"} />
              </VStack>
            </Flex>
            <Skeleton w={"full"}>
              <Box h={"400px"}>contents wrapped</Box>
            </Skeleton>
          </VStack>
        ))}

      {!isLoading && posts.length > 0 &&
        posts.map((post) => (
          <FeedPost
            key={post.id}
            post={post}
            ref={(el) => (postRefs.current[post.id] = el)}
          />
        ))
      }

      

      {/* Conditional rendering for scroll attempt when posts are loaded */}
      {shouldScroll && <div style={{ visibility: "hidden", height: 0 }} ref={(el) => el && el.scrollIntoView({ behavior: "smooth" })}></div>}
      </Box>
    </Container>
  );
};

export default UserFeed;
