import React, { useRef, useState } from 'react';
import { TextField, Button, List, ListItem, ListItemText, IconButton, Typography, Box } from '@mui/material';
import { MdOutlineCancel } from 'react-icons/md';  
import { CiEdit } from 'react-icons/ci';            
import './App.css';

function App() {
  const [item, setItem] = useState<string>('');
  const [items, setItems] = useState<string[]>([]);
  const [toggle, setToggle] = useState<{ show: boolean; id: number | null }>({ show: false, id: null });
  const editRef = useRef<HTMLInputElement | null>(null);

  const search = (event: React.ChangeEvent<HTMLInputElement>) => {
    setItem(event.target.value);
  };

  const addItem = () => {
    if (item.trim() === "" || items.includes(item)) return;
    setItems((prevItems) => [...prevItems, item]);
    setItem('');
  };

  const deleteItem = (index: number) => {
    setItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  const editItem = (id: number) => {
    if (editRef.current) {
      editRef.current.focus();
    }
    setToggle({ show: true, id });
    setItem(items[id]);
  };

  const updateItems = () => {
    if (toggle.id !== null) {
      const updatedItems = [...items];
      updatedItems[toggle.id] = item;
      setItems(updatedItems);
      setItem('');
      setToggle({ show: false, id: null });
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: '0 auto', padding: 2 }}>
      {/* Add the heading */}
      <Typography variant="h4" align="center" gutterBottom>
        To-Do-List
      </Typography>

      <TextField
        label="My list  "
        variant="outlined"
        onChange={search}
        value={item}
        inputRef={editRef}
        fullWidth
      />
      
 

      <Box sx={{ display: 'flex', gap: 1, marginTop: 2 }}>
        <Button variant="contained"  size="medium" onClick={addItem} style={{ backgroundColor: 'brown', color: 'white' }}>
          Add
        </Button>
        {toggle.show && (
          <Button variant="contained" color="secondary" onClick={updateItems}>
            Update
          </Button>
        )}
      </Box>

      <Box sx={{ marginTop: 2 }}>
        {items.length > 0 ? (
          <List>
            {items.map((item, index) => (
              <ListItem key={index} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <ListItemText primary={item} />
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <IconButton onClick={() => deleteItem(index)} aria-label="Delete item">
                    <MdOutlineCancel />
                  </IconButton>
                  <IconButton onClick={() => editItem(index)} aria-label="Edit item">
                    <CiEdit />
                  </IconButton>
                </Box>
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="h5">List is empty</Typography>
        )}
      </Box>
    </Box>
  );
}

export default App;
