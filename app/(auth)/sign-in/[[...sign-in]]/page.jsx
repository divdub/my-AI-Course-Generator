import { SignIn } from "@clerk/nextjs";
import { Box, Grid, GridItem, Heading, Text, VStack } from "@chakra-ui/react";

export default function Page() {
  return (
    <Box
      bg="gray.50"
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Grid
        templateColumns={{ base: "1fr", md: "1.3fr 1fr" }}
        maxW="container.xl"
        bg="white"
        boxShadow="lg"
        borderRadius="md"
        overflow="hidden"
      >
        {/* Left Side - Full Background Image */}
        <GridItem
          bg="blue.600"
          backgroundImage="url('/loginPage.jpg')" // Path to your image
          backgroundSize="cover"
          backgroundPosition="center"
          backgroundRepeat="no-repeat"

        >
          {/* Optional Content */}
          
        </GridItem>

        {/* Right Side - Login Form */}
        <GridItem
          display="flex"
          alignItems="center"
          justifyContent="center"
          p={8}
        >
         
            
            <SignIn />
          
        </GridItem>
      </Grid>
    </Box>
  );
}
