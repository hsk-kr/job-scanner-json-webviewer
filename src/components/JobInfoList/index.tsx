import { useEffect, useState } from 'react';
import { useJobInfo } from '../../stores/job-info';

type FontSize = 'text-xs' | 'text-sm' | 'text-lg' | 'text-xl';

const JobInfoList = () => {
  const { jobInfos } = useJobInfo();
  const [fontSize, setFontSize] = useState('text-xs');
  const [visited, setVisited] = useState<Map<number, boolean>>(new Map());

  const updateFontSize = (fontSize: FontSize) => () => setFontSize(fontSize);

  const markVisited = (index: number) => () =>
    setVisited((visited) => {
      visited.set(index, true);
      return new Map(visited);
    });

  useEffect(() => {
    setVisited(new Map());
  }, [jobInfos]);

  return (
    <div>
      <div className="join p-4 uppercase">
        <button
          className="btn join-item text-xs"
          onClick={updateFontSize('text-xs')}
        >
          size
        </button>
        <button
          className="btn join-item text-sm"
          onClick={updateFontSize('text-sm')}
        >
          size
        </button>
        <button
          className="btn join-item text-lg"
          onClick={updateFontSize('text-lg')}
        >
          size
        </button>
        <button
          className="btn join-item text-xl"
          onClick={updateFontSize('text-xl')}
        >
          size
        </button>
      </div>
      <p className="text-white mb-4">{jobInfos.length} Jobs.</p>
      <table className="table table-sm bg-neutral">
        <thead>
          <tr>
            <th></th>
            <th className="max-w-44">Title</th>
            <th>Additional Info</th>
          </tr>
        </thead>
        <tbody>
          {jobInfos.map((jobInfo, jobInfoIdx) => (
            <tr key={jobInfoIdx}>
              <th className={fontSize}>{jobInfoIdx + 1}</th>
              <td className={fontSize}>
                <a
                  href={jobInfo.url}
                  target="_blank"
                  className={`text-blue-500 hover:text-blue-700 ${
                    visited.has(jobInfoIdx) ? 'text-purple-500' : ''
                  }`}
                  onClick={markVisited(jobInfoIdx)}
                >
                  {jobInfo.jobTitle}
                </a>
              </td>
              <td className={`text-white text-bold ${fontSize}`}>
                {jobInfo.jobAdditionalInfo}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JobInfoList;
