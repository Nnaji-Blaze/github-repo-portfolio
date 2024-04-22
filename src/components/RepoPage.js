import React, { useState, useEffect } from "react";
import { Box, Heading, List, ListItem, Button, Input } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import NewRepoModal from "./NewRepoModal";

const RepoPage = () => {
  const [repositories, setRepositories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRepositories, setFilteredRepositories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRepositories();
  }, [currentPage, perPage]);

  useEffect(() => {
    // Filter repositories based on search query
    const filtered = repositories.filter((repo) =>
      repo.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredRepositories(filtered);
  }, [searchQuery, repositories]);

  const fetchRepositories = async () => {
    try {
      const response = await fetch(
        `https://api.github.com/users/nnaji-blaze/repos?page=${currentPage}&per_page=${perPage}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch repositories");
      }
      const data = await response.json();
      setRepositories(data);
    } catch (error) {
      console.error("Error fetching repositories:", error);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const createRepository = async (repositoryData) => {
    // Call API to create repository with repositoryData
    // Example: await fetch('api/createRepository', { method: 'POST', body: JSON.stringify(repositoryData) });
    // After successful creation, update state or fetch repositories again
    console.log("Creating repository:", repositoryData);
    // For example, you can refetch repositories:
    // fetchRepositories();
  };

  const nextPage = () => {
    // Check if there are repositories on the next page
    if (filteredRepositories.length === 0 && repositories.length > 0) {
      // If there are no repositories on the next page but there are repositories in total
      // Navigate to the NotFound page
      navigate("/notfound");
    } else {
      // If there are repositories on the next page or the repositories are still being fetched
      // Update the currentPage state
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <Box p={4} textAlign="center">
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Heading mb={4}>My GitHub Repositories</Heading>
      <Input
        placeholder="Search repositories"
        value={searchQuery}
        onChange={handleSearchChange}
        mb={4}
      />
      <List spacing={3} textAlign="center" mx="auto" maxWidth="500px">
        {filteredRepositories.map((repo) => (
          <Box
            key={repo.id}
            bg="gray.100"
            border="1px solid"
            borderColor="gray.300"
            borderRadius="md"
            p={3}
          >
            <Link to={`/repositories/${repo.name}`}>
              <ListItem>{repo.name}</ListItem>
            </Link>
          </Box>
        ))}
      </List>
      <Button
        bg="tomato"
        onClick={prevPage}
        disabled={currentPage === 1}
        mr={2}
        _hover={{ bg: "orange" }}
      >
        Previous
      </Button>
      <Button onClick={nextPage} _hover={{ bg: "orange" }}>
        Next
      </Button>
      <Button onClick={openModal} ml={4}>
        Create New Repository
      </Button>
      <NewRepoModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onCreate={createRepository}
      />
    </Box>
  );
};

export default RepoPage;
