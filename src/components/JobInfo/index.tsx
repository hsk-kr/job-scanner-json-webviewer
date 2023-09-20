import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { IndeedJobInfo } from '../../types/indeed';

interface JobInfoProps extends IndeedJobInfo {
  onView?: (url: string) => void;
}

const JobInfo = ({ jobTitle, companyName, url }: JobInfoProps) => {
  return (
    <Card sx={{ width: '100%' }}>
      <CardContent>
        <Typography variant="h5">{jobTitle}</Typography>
        <Typography variant="h6" color="text.secondary">
          {companyName}
        </Typography>
        <Typography variant="body2">
          <Link href={url}>{url}</Link>
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">View</Button>
      </CardActions>
    </Card>
  );
};

export default JobInfo;
