import { useState } from 'react';
import { Box, Button, Input, Textarea, useToast } from '@chakra-ui/react';
import { client } from 'lib/crud';

const Notes = () => {
  const [note, setNote] = useState('');
  const toast = useToast();

  const handleCreateNote = async () => {
    const success = await client.set(`note:${Date.now()}`, { note });
    if (success) {
      toast({
        title: 'Note created.',
        description: "We've created your note.",
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
      setNote('');
    } else {
      toast({
        title: 'Error.',
        description: "There was an error creating your note.",
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const handleInputChange = (event) => setNote(event.target.value);

  return (
    <Box p={4}>
      <Textarea
        value={note}
        onChange={handleInputChange}
        placeholder="Enter your note here..."
        size="sm"
      />
      <Button mt={4} colorScheme="blue" onClick={handleCreateNote}>
        Create Note
      </Button>
    </Box>
  );
};

export default Notes;