import { ProjectSnippet } from "./components/ProjectSnippet";
import { useData } from "./DataContext";

export const HomePage = () => {
  const { projects } = useData();
  return (
    <div className="w-full h-auto bg-gradient-to-r from-darkblack to-darkblue">
      <div className="w-full text-6xl font-bold justify-self-center text-center py-20 text-gray">
        <p className="w-140 justify-self-center text-center font-seasons font-light">
          Repositories reviews done by professionals
        </p>
        <p className="w-140 justify-self-center text-center font-seasons font-light text-2xl mt-5 text-gray">
          Sign in, add project and let our professionals rate your repository
        </p>
      </div>
      <div className="px-40  w-full h-full  px-90 py-15 overflow-y-auto">
        <div className="w-full flex font-bold text-xl mb-10">
          <p className="flex-1">Najlepsze projekty:</p>
          <p>Sortuj według</p>
        </div>
        {projects && projects.map((p) => <ProjectSnippet project={p} />)}
      </div>
    </div>
  );
};
