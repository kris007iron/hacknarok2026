import { ProjectSnippet } from "./components/ProjectSnippet";
import { useData } from "./DataContext";

export const HomePage = () => {
  const { projects } = useData();
  return (
    <div className="w-full px-40 h-screen">
      <div className="bg-gray-800 w-full h-full  px-10 py-15 overflow-y-auto">
        {projects && projects.map((p) => <ProjectSnippet project={p} />)}
      </div>
    </div>
  );
};
