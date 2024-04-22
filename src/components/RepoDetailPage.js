import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Box, Heading, Text } from "@chakra-ui/react";

const RepoDetailPage = () => {
  const { id } = useParams();
  const [repo, setRepo] = useState(null);

  useEffect(() => {
    fetch(`https://api.github.com/repos/nnaji-blaze/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched repo data:", data);
        setRepo(data);
      })
      .catch((error) =>
        console.error("Error fetching repository details:", error)
      );
  }, [id]);

  return (
    <Box p={4} bg="gray.100" borderRadius="md">
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>
      <Heading mb={4} fontSize="2xl" fontWeight="bold">
        Repository Details
      </Heading>
      {repo ? (
        <Box>
          <Text fontWeight="bold" fontSize="lg">
            Name:
          </Text>
          <Text>{repo.name || "N/A"}</Text>
          <Text fontWeight="bold" fontSize="lg" mt={2}>
            Description:
          </Text>
          <Text>{repo.description || "N/A"}</Text>
          {repo.homepage && (
            <Box mt={2}>
              <Text fontWeight="bold" fontSize="lg">
                Website:
              </Text>
              <Link href={repo.homepage} color="blue.500" isExternal>
                {repo.homepage}
              </Link>
            </Box>
          )}
          {/* Add more details as needed */}
        </Box>
      ) : (
        <Text>Loading...</Text>
      )}
    </Box>
  );
};

export default RepoDetailPage;
