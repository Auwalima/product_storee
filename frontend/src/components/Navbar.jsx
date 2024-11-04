
import { Button, Container, Flex, HStack, } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { AiOutlinePlusSquare } from "react-icons/ai";
import { chakra } from '@chakra-ui/react';
import { useTheme } from "next-themes";
import { LuSun, LuMoon } from 'react-icons/lu';

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const toggleColorMode = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };



  return (
    <Container maxW={"1140px"} px={4} className={theme} bg={theme === 'light' ? 'gray.100' : 'gray.900'}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"} flexDir={{ base: "column", sm: "row", }} >
        <chakra.span
          fontSize={{ base: "22", sm: "28" }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          css={{
            background: "linear-gradient(to right, #0BC5EA, #03A9F4)",
            "-webkit-background-clip": "text",
            "-webkit-text-fill-color": "transparent",
          }}
        >
          <Link to={"/"}>Product Store 🛒</Link>
        </chakra.span>
        <HStack spacing={2} alignItems={"center"}>
          <Link to={"/create"}>
            <Button 
              border="none"
              color={theme === 'light' ? 'gray.900' : 'gray.100'} 
              bg={theme === 'light' ? 'gray.100' : 'gray.900'}
              _hover={{
                bg: theme === 'light' ? 'gray.200' : 'gray.800',
              }}
            >
              <AiOutlinePlusSquare fontSize={20} />
            </Button>
          </Link>
          <Button 
            border="none"
            color={theme === 'light' ? 'gray.900' : 'gray.100'} 
            bg={theme === 'light' ? 'gray.100' : 'gray.900'}
            _hover={{
              bg: theme === 'light' ? 'gray.200' : 'gray.800',
            }}
            onClick={toggleColorMode}
          >
            {theme === 'light' ? <LuSun fontSize={20} /> : <LuMoon fontSize={20} />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
