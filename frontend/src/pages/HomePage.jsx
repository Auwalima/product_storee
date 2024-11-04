import { useEffect } from 'react'
import { Box, Heading, VStack, Container, Input, Button, Text, Grid, } from "@chakra-ui/react";
import { Link } from 'react-router-dom';
import { useProductStore } from '../store/product';
import ProductCard from '../components/ProductCard';

const HomePage = () => {

  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  console.log("products", products);

  return (
    <Container maxW='container.xl' py={12}>
      <VStack spacing={8}>
        <Text
          fontSize={{ base: "22", sm: "28" }}
          fontWeight={"bold"}
          //textTransform={"uppercase"}
          textAlign={"center"}
          css={{
            background: "linear-gradient(to right, #0BC5EA, #03A9F4)",
            "-webkit-background-clip": "text",
            "-webkit-text-fill-color": "transparent",
          }}
        >
          <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
          Current Products 🚀
          </Heading>
        </Text>

      <Grid 
        templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} 
        gap={10} 
        w={"full"}
      >
         {products.map((product) => (
          <ProductCard key={product._id} product={product} />
         ))}
      </Grid>


        {products.length === 0 && (
          <Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500'>
          No products found 😢{" "}
        <Link to="/create">
          <Text as='span' color='blue.500' _hover={{ textDecoration: "underline" }}>
            Create Product
          </Text>
        </Link>
      </Text>
        )}
      </VStack>
    </Container>
  )
};

export default HomePage