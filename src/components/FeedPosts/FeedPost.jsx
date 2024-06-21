import React, { forwardRef } from "react";
import { Box, Container, Image } from "@chakra-ui/react";
import PostFooter from "./PostFooter";
import PostHeader from "./PostHeader";
import useGetUserProfileById from "../../hooks/useGetUserProfileById";

const FeedPost = forwardRef(({ post }, ref) => {
  const { userProfile } = useGetUserProfileById(post.createdBy);

  return (
    <div ref={ref}>
      <Container
        //h={{ base: "auto", md: "70%" }}
        maxW={{ base: "100vw", md: "container.md" }}
        //maxW="container.md"
        marginBottom={{ base: "10vh", md: "40px" }}
        maxH={{ base: "auto", md: "80%" }}
        px={0}
      >
      <PostHeader post={post} creatorProfile={userProfile} />
      <Box my={2} borderRadius={4} overflow={"hidden"}>
        <Image src={post.imageURL} alt={"FEED POST IMG"} width="100%" height="auto"/>
      </Box>
      <PostFooter post={post} creatorProfile={userProfile} />
      </Container>
    </div>
  );
});

export default FeedPost;
