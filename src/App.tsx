import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import JobInfoContextProvider, { useJobInfo } from './stores/job-info';
import { useRef } from 'react';

function App() {
  return (
    <JobInfoContextProvider>
      <Test />
    </JobInfoContextProvider>
  );
}

const Test = () => {
  const { jobInfos, updateJobInfosFromFile } = useJobInfo();
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async () => {
    const file = (fileRef?.current?.files ?? [])[0];
    if (!file) return;

    try {
      const res = await updateJobInfosFromFile(file);
      alert(res.msg);
    } catch (e) {
      alert(e);
    }

    fileRef.current.value = '';
  };

  return (
    <div>
      <input type="file" ref={fileRef} onChange={handleFileUpload}></input>
      <hr />
      <div className="flex flex-col gap-2">
        {jobInfos.map((ji, jiIdx) => (
          <span key={jiIdx}>
            {ji.jobTitle} | {ji.jobAdditionalInfo}
          </span>
        ))}
      </div>
      <hr />
    </div>
  );
};

export default App;
