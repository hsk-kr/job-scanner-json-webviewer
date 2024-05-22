import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import JobInfoContextProvider from './stores/job-info';
import JobInfoList from './components/JobInfoList';
import Tools from './components/Tools';

function App() {
  return (
    <JobInfoContextProvider>
      <div className="mx-auto p-4 max-w-[1024px]">
        <Tools />
        <JobInfoList />
      </div>
    </JobInfoContextProvider>
  );
}

export default App;
