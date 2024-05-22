import { useRef } from 'react';
import { useJobInfo } from '../../stores/job-info';

const Tools = () => {
  const { updateJobInfosFromFile } = useJobInfo();
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
    <div className="flex justify-end">
      <input
        type="file"
        className="hidden"
        ref={fileRef}
        onChange={handleFileUpload}
      ></input>
      <button
        className="btn btn-sm btn-neutral"
        onClick={() => fileRef.current.click()}
      >
        Upload JSON
      </button>
    </div>
  );
};

export default Tools;
