//! Consider using FixedSizeList later for better performance.
// import { FixedSizeList } from 'react-window';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import { JobInfoUnion } from '../../types/job';

interface JobListProps {
  items: JobInfoUnion[];
  onItemClick?: (index: number) => void;
  selectedItemIndex?: number;
}

const JobList = ({ items, onItemClick, selectedItemIndex }: JobListProps) => {
  const handleItemClick = (index: number) => () => {
    onItemClick?.(index);
  };

  return (
    <>
      <Typography variant="h6" mt={2} gutterBottom>
        {items.length} Jobs.
      </Typography>
      <List
        sx={{
          height: 400,
          overflowY: 'auto',
          bgcolor: 'background.paper',
        }}
      >
        {items.map((item, idx) => (
          <ListItem
            key={idx}
            component="div"
            style={selectedItemIndex === idx ? { backgroundColor: '#ccc' } : {}}
            disablePadding
          >
            <ListItemButton onClick={handleItemClick(idx)}>
              <ListItemText primary={`${idx + 1}. ${item.jobTitle}`} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default JobList;
