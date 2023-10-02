import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { JobInfoUnion } from '../../types/job';

interface JobInfoProps extends JobInfoUnion {
  onView?: (url: string) => void;
}

const JobInfo = ({
  jobTitle,
  companyName,
  url,
  jobAdditionalInfo,
}: JobInfoProps) => {
  return (
    <Card sx={{ width: '100%' }}>
      <CardContent>
        <Typography variant="h5">{jobTitle}</Typography>
        <Typography variant="h6" color="text.secondary">
          {companyName ?? jobAdditionalInfo}
        </Typography>
        <Typography variant="body2">
          <Link href={url} target="_blank">
            {url}
          </Link>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default JobInfo;
