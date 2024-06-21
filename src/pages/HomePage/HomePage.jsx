import { Box, Container, Flex } from "@chakra-ui/react";
import FeedPostsOrig from "../../components/FeedPosts/FeedPostsOrig";
import SuggestedUsers from "../../components/SuggestedUsers/SuggestedUsers";

const HomePage = () => {
	return (
		<Container p={0} maxW={{base: "100vw", md: "100vw"}} m={0}>
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
					<FeedPostsOrig />
				</Box>
				<Box px={0} ml={0} flex={3} mr={{base: "none", md: "20"}} display={{ base: "none", lg: "block" }} maxW={{base: "20vw", lg: "20vw"}}>
					<SuggestedUsers />
				</Box>
			</Flex>
			</Box>
		</Container>
	);
};

export default HomePage;
