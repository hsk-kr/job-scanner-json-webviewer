import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Layout from './components/Layout';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import JobInfo from './components/JobInfo';
import JobList from './components/JobList';
import { useEffect, useRef, useState } from 'react';
import { JobInfoUnion } from './types/job';
import { retrieveValue, storeValue } from './lib/storage';

function App() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [jobInfos, setJobInfos] = useState<JobInfoUnion[]>([]);
  const [selectedItemIndex, setSelectedItemIndex] = useState<number>();

  const handleFileUpload = () => {
    if (!fileRef?.current?.files?.length) return;

    const fr = new FileReader();
    fr.onload = () => {
      try {
        if (typeof fr.result !== 'string') {
          alert('Failed to load file as text.');
          return;
        }

        const jobInfos = JSON.parse(fr.result || '[]') as JobInfoUnion[];

        const getRidOfDuplicationAndSetJobInfos = () => {
          const jobInfoMap = jobInfos.reduce((map, value) => {
            map.set(value.url, value);

            return map;
          }, new Map<string, JobInfoUnion>());

          const newJobInfos = [...jobInfoMap.values()];
          storeValue('jobinfo', newJobInfos);
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
    setSelectedItemIndex(index);
  };

  useEffect(() => {
    try {
      const jobInfos = retrieveValue('jobinfo');
      if (!jobInfos) return;

      setJobInfos(jobInfos);
    } catch (e) {
      alert('Failed to load data');
      console.error(e);
    }
  }, []);

  const selectedJobInfo =
    selectedItemIndex !== undefined ? jobInfos[selectedItemIndex] : null;

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
        <JobList
          items={jobInfos}
          onItemClick={handleItemClick}
          selectedItemIndex={selectedItemIndex}
        />
      </>
    </Layout>
  );
}

export default App;
