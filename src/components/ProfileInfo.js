import React, { useState, useEffect } from "react";
import { Avatar, Box, Heading, Text, Flex } from "@chakra-ui/react";

const ProfileInfo = () => {
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(
          "https://api.github.com/users/nnaji-blaze"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch profile data");
        }
        const data = await response.json();
        setProfileData(data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !profileData) {
    return <div>Error fetching profile data</div>;
  }

  return (
    <Box aria-labelledby="profile-heading" margin="50px">
      <Heading id="profile-heading" size="lg" mb={4} textAlign="center">
        GitHub Profile Information
      </Heading>
      <Flex
        flexDirection={{ base: "column", md: "row" }}
        justifyContent="center"
        alignItems="center"
      >
        <Box
          maxW="200px"
          margin="20px"
          p={4}
          borderRadius="full"
          bg="white"
          boxShadow="lg"
          mb={{ base: 4, md: 0 }}
        >
          <Avatar
            src={profileData.avatar_url}
            name={profileData.name}
            size="xl"
            alt={`Avatar of ${profileData.name}`}
            borderRadius="full" // Circular border
            border="2px solid black" // Solid black border
          />
        </Box>
        <Box maxW="300px" p={4} ml={{ base: 0, md: 8 }}>
          <Text fontSize="lg" fontWeight="bold" mb={2}>
            Username: {profileData.login}
          </Text>
          <Text fontSize="lg" mb={2}>
            Name: {profileData.name}
          </Text>
          <Text fontSize="lg" mb={2}>
            Bio: {profileData.bio}
          </Text>
          <Text fontSize="lg" mb={2}>
            Followers: {profileData.followers}
          </Text>
          <Text fontSize="lg" mb={2}>
            Following: {profileData.following}
          </Text>
          <Text fontSize="lg">
            Public Repositories: {profileData.public_repos}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default ProfileInfo;
