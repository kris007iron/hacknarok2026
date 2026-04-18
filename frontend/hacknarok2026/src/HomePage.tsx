import { ProjectSnippet } from "./components/ProjectSnippet";
import { useData } from "./DataContext";

export const HomePage = () => {
  const { projects } = useData();
  return (
    <div className="w-full h-auto">
      <div className="w-full bg-gradient-to-r from-green-400 to-green-500 text-6xl font-bold justify-self-center text-center py-20 text-white">
        <p className="w-160 justify-self-center text-center">
          Zaloguj się aby wysłać projekt do oceny
        </p>
      </div>
      <div className="px-40 bg-[#EBEBEB] w-full h-full  px-90 py-15 overflow-y-auto">
        <div className="w-full flex font-bold text-xl mb-10">
          <p className="flex-1">Najlepsze projekty:</p>
          <p>Sortuj według</p>
        </div>
        {projects && projects.map((p) => <ProjectSnippet project={p} />)}
      </div>
    </div>
  );
};
