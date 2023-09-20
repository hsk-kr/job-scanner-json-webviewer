import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Layout from './components/Layout';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import JobInfo from './components/JobInfo';
import JobList from './components/JobList';
import { useRef, useState } from 'react';
import { IndeedJobInfo } from './types/indeed';

function App() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [jobInfos, setJobInfos] = useState<IndeedJobInfo[]>([]);
  const [selectedJobInfo, setSelectedJobInfo] = useState<IndeedJobInfo | null>(
    null
  );

  const handleFileUpload = () => {
    if (!fileRef?.current?.files?.length) return;

    const fr = new FileReader();
    fr.onload = () => {
      try {
        if (typeof fr.result !== 'string') {
          alert('Failed to load file as text.');
          return;
        }

        const jobInfos = JSON.parse(fr.result || '[]') as IndeedJobInfo[];

        const getRidOfDuplicationAndSetJobInfos = () => {
          const jobInfoMap = jobInfos.reduce((map, value) => {
            map.set(value.url, value);

            return map;
          }, new Map<string, IndeedJobInfo>());

          const newJobInfos = [...jobInfoMap.values()];
          setJobInfos(newJobInfos);
        };

        getRidOfDuplicationAndSetJobInfos();
        alert('Succeeded to load the json file.');
      } catch {
        alert('Failed to load the json file. Check the format.');
      }

      if (fileRef.current) {
        fileRef.current.value = '';
      }
    };

    fr.readAsText(fileRef.current.files[0]);
  };

  const handleLoadButtonClick = () => {
    fileRef.current?.click();
  };

  const handleItemClick = (index: number) => {
    setSelectedJobInfo(jobInfos[index]);
  };

  return (
    <Layout>
      <>
        <input
          ref={fileRef}
          type="file"
          accept="application/JSON"
          style={{ display: 'none ' }}
          onChange={handleFileUpload}
        />
        <Button
          fullWidth
          variant="contained"
          color="secondary"
          onClick={handleLoadButtonClick}
        >
          Load File
        </Button>
        {selectedJobInfo && <JobInfo {...selectedJobInfo} />}
        <Divider sx={{ height: 10 }} />
        <JobList items={jobInfos} onItemClick={handleItemClick} />
      </>
    </Layout>
  );
}

export default App;
