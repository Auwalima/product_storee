import { Box, Heading, VStack, Container, Input, Button } from "@chakra-ui/react";
import { useState } from "react";
import { useTheme } from "next-themes";
import { useProductStore } from '../store/product.js';
import { Toaster, toaster } from "../components/ui/toaster";

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const { createProduct } = useProductStore();

  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct);
    if (success) {
      toaster.create({
        title: "Product Added",
        description: message || "The product has been successfully added.",
        type: "success",
        action: {
          label: "Close",
          onClick: () => console.log("Close"),
        },
      });
    } else {
      toaster.create({
        title: "Error",
        description: message || "There was an error adding the product.",
        type: "error",
        action: {
          label: "Close",
          onClick: () => console.log("Close"),
        },
      });
    }
    setNewProduct({ name: "", price: "", image: "" });
  };

  const { theme } = useTheme();

  return (
    <Container maxW={"md"}>
      {/* Render Toaster component here */}
      <Toaster />
      <VStack spacing={8}>
        <Heading as={"h1"} size={"3xl"} textAlign={"center"} mb={8}>
          Create New Product
        </Heading>
        <Box w={"full"} bg={theme === 'light' ? 'white' : 'gray.800'} p={"6"} rounded={"lg"} shadow={"md"}>
          <VStack spacing={4}>
            <Input 
              placeholder="Product Name"
              variant="outline"
              name="name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
            />
            <Input
              placeholder="Product Price"
              variant="outline"
              name="price"
              value={newProduct.price}
              onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
            />
            <Input
              placeholder="Product Image"
              variant="outline"
              name="image"
              value={newProduct.image}
              onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
            />
            <Button bg={'cyan'} onClick={handleAddProduct} w={"full"}>
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
