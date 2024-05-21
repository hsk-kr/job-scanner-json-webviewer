import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { JobInfo } from '../types/job';
import { retrieveValue, storeValue } from '../lib/storage';

interface JobInfoContext {
  jobInfos: JobInfo[];
  updateJobInfosFromFile: (file: File) => Promise<{
    msg: string;
  }>;
}

const JobInfoContext = createContext<JobInfoContext>(null!);

// eslint-disable-next-line react-refresh/only-export-components
export const useJobInfo = () => useContext(JobInfoContext);

const JobInfoContextProvider = ({ children }: { children?: ReactNode }) => {
  const [jobInfos, setJobInfos] = useState<JobInfo[]>([]);

  useEffect(() => {
    const jobInfosFromStorage = retrieveValue('jobinfo') ?? [];
    setJobInfos(jobInfosFromStorage);
  }, [jobInfos]);

  const updateJobInfosFromFile: JobInfoContext['updateJobInfosFromFile'] =
    useCallback((file: File) => {
      return new Promise((resolve, reject) => {
        const fr = new FileReader();
        fr.onload = () => {
          try {
            if (typeof fr.result !== 'string') {
              reject('Failed to load file as text.');
              return;
            }

            const jobInfos = JSON.parse(fr.result || '[]') as JobInfo[];

            const getRidOfDuplicationAndSetJobInfos = () => {
              const jobInfoMap = jobInfos.reduce((map, value) => {
                map.set(value.url, value);
                return map;
              }, new Map<string, JobInfo>());

              return [...jobInfoMap.values()];
            };

            const newJobInfos = getRidOfDuplicationAndSetJobInfos();
            storeValue('jobinfo', newJobInfos);
            setJobInfos(newJobInfos);
            resolve({ msg: 'Succeeded to load the json file.' });
          } catch {
            reject('Failed to load the json file. Check the format.');
          }
        };
        fr.readAsText(file);
      });
    }, []);

  const value = {
    jobInfos,
    updateJobInfosFromFile,
  };

  return (
    <JobInfoContext.Provider value={value}>{children}</JobInfoContext.Provider>
  );
};

export default JobInfoContextProvider;
