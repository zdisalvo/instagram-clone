import { Box, Container, Flex } from "@chakra-ui/react";
import FeedPostsOrig from "../../components/FeedPosts/FeedPostsOrig";
import SuggestedUsers from "../../components/SuggestedUsers/SuggestedUsers";

const HomePage = () => {
	return (
		<Container>
			<Box
			height={{base: "90vh", md: "90vh"}}
			width={{base: "100vw", md: "70vw"}}
			
			bottom={{base: "10vh", md: "60px"}}

			left={{ base: 0, md: "30%" }} // Center horizontally on medium and larger screens
			transform={{ base: "none", md: "translateX(-30%)" }} // Center horizontally on medium and larger screens
      
		>
			<Flex gap={0}>
				<Box flex={2} py={0}>
					<FeedPostsOrig />
				</Box>
				<Box flex={3} mr={20} display={{ base: "none", lg: "block" }} maxW={"300px"}>
					<SuggestedUsers />
				</Box>
			</Flex>
			</Box>
		</Container>
	);
};

export default HomePage;
