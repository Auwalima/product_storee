import { Box, Image, Heading, Text, HStack, IconButton, Input, VStack, Button } from '@chakra-ui/react'
import { useState } from 'react'
import { RiDeleteBinLine } from 'react-icons/ri';
import { MdEdit } from 'react-icons/md';
import { useTheme } from 'next-themes';
import { useProductStore } from '../store/product';
import { Toaster, toaster } from "../components/ui/toaster";
import { DialogTrigger, DialogRoot, DialogContent, DialogHeader, DialogTitle, DialogCloseTrigger, DialogBody, DialogActionTrigger, DialogFooter } from './ui/dialog';
  


const ProductCard = ({product}) => {
  const { deleteProduct, updateProduct } = useProductStore();
    const [ updatedProduct, setUpdatedProduct ] = useState(product);
    const { theme } = useTheme();
    const textColor = theme === 'light' ? 'gray.600' : 'gray.200';
    const bg = theme === 'light' ? 'white' : 'gray.800';

    
    const [open, setOpen] = useState(false);

    const handleDeleteProduct = async (pid) => {
        const { success, message } = await deleteProduct(pid);
        if (success) {
          toaster.create({
            title: "Product Deleted",
            description: message || "The product has been successfully deleted.",
            type: "success",
            action: {
              label: "Close",
              onClick: () => console.log("Close"),
            },
          });
        } else {
          toaster.create({
            title: "Error",
            description: message || "There was an Error deleting Product.",
            type: "error",
            action: {
              label: "Close",
              onClick: () => console.log("Close"),
            },
          });
        }
      };

      const handleUpdateProduct = async (pid, updatedProduct) => {
        const { success, message } = await updateProduct(pid, updatedProduct);
        setOpen(false);
        if(!success){
          toaster.create({
            title: "Product Not Updated",
            description: message || "Product Not Updated. Try Again.",
            type: "error",
            duration: 3000,
            action: {
              label: "Close",
              onClick: () => console.log("Close"),
            },
          });
        } else {
          toaster.create({
            title: "Success",
            description: message || "Product Was Successfully Updated.",
            type: "success",
            duration: 3000,
            action: {
              label: "Close",
              onClick: () => console.log("Close"),
            },
          });
        }
      };

  return (
    <Box
        shadow='lg'
        rounded='lg'
        overflow='hidden'
        transition='all 0.3s'
        _hover={{ transform: "translateY(-5px)", shadow: "xl"}}
        bg={bg}
    >
    {/* Render Toaster component here */}
    <Toaster />
        <Image src={product.image} alt={product.name} h={48} w='full' objectFit='cover' />

        <Box p={4}>
            <Heading as='h3' size='md' mb={2}>
                {product.name}
            </Heading>

            <Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>
                ${product.price}
            </Text>

            <HStack spacing={2}>
                <DialogRoot lazyMount open={open} onOpenChange={(e) => setOpen(e.open)}>
                    <DialogTrigger aschild>
                        <IconButton aria-label="Edit Product" colorPalette='blue'>
                            <MdEdit />
                        </IconButton>
                    </DialogTrigger>
                    <DialogContent>
                         <DialogHeader>
                            <DialogTitle>
                                Update Product 📝
                            </DialogTitle>
                            <DialogCloseTrigger />
                         </DialogHeader>
                         <DialogBody>
                            <VStack spacing={4}>
                         <Input 
                             placeholder="Product Name"
                             variant="outline"
                             name="name"
                             value={updatedProduct.name}
                             onChange={(e) => setUpdatedProduct({...updatedProduct, name: e.target.value})}
                        />
                        <Input
                             placeholder="Product Price"
                             variant="outline"
                             name="price"
                             type="number"
                             value={updatedProduct.price}
                             onChange={(e) => setUpdatedProduct({...updatedProduct, price: e.target.value})}
                         />
                        <Input
                             placeholder="Image URL"
                             variant="outline"
                             name="image"
                             value={updatedProduct.image}
                             onChange={(e) => setUpdatedProduct({...updatedProduct, image: e.target.value})}
                         />
                         </VStack>
                         </DialogBody>
                         <DialogFooter>
                            <Button colorPalette='blue'
                              onClick={() => handleUpdateProduct(product._id, updatedProduct)}
                            >
                                Update
                            </Button>
                            <DialogActionTrigger asChild>
                                <Button variant="outline" mr={"3"}>Cancel</Button>
                            </DialogActionTrigger>
                         </DialogFooter>
                    </DialogContent>
                </DialogRoot>
                <IconButton aria-label="Delete Product" colorPalette='red' >
                    <RiDeleteBinLine onClick={() => handleDeleteProduct(product._id)} />
                </IconButton>
            </HStack>
        </Box>

        

    </Box>
  )
}

export default ProductCard;