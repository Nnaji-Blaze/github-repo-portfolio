import React from "react";
import {
  Box,
  Container,
  Flex,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

const SocialIcon = ({ href, icon }) => {
  return (
    <Box as="a" href={href} target="_blank" rel="noopener noreferrer" mx={2}>
      {icon}
    </Box>
  );
};

export default function Footer() {
  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
      py={4}
    >
      <Container maxW={"6xl"}>
        <Flex direction="column" align="center">
          <Text textAlign="center" mb={4}>
            © 2024 Nnaji Blaze GitHub Archives. All rights reserved
          </Text>
          <Flex direction="row" justify="center">
            <SocialIcon
              href="http://twitter.com/nnaji_blaze"
              icon={<FaTwitter size={24} />}
            />
            <SocialIcon
              href="http://us.linkedin.com/in/nnaji-blaze"
              icon={<FaLinkedin size={24} />}
            />
            <SocialIcon
              href="http://instagram.com/nnaji_blaze"
              icon={<FaInstagram size={24} />}
            />
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}
