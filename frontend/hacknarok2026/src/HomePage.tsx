import { ProjectSnippet } from "./components/ProjectSnippet";
import { useData } from "./DataContext";
import Sort from "./assets/Sort.png";
export const HomePage = () => {
  const { projects, projectRatings } = useData();
  const projectsWithGrade = projects?.filter((p) =>
    projectRatings?.find((pR) => pR.project_id == p.id),
  );
  return (
    <div className="w-full h-auto bg-gradient-to-r from-darkblack to-darkblue">
      <div className="w-full text-6xl font-bold justify-self-center text-center py-20 text-gray">
        <p className="justify-self-center px-auto text-center font-seasons font-light">
          Repositories reviews done by professionals
        </p>
        <p className="justify-self-center text-center font-seasons font-light text-2xl mt-5 text-gray">
          Sign in, add project and let our professionals rate your repository
        </p>
        <div className="flex items-center mx-auto justify-self-center mt-5 w-150">
          <div className="bg-white rounded-full flex items-center p-2 w-full  shadow-lg border border-gray-100">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-2 py-1 text-lg font-seasons text-darkblue focus:outline-none bg-transparent"
            />

            <button className="bg-black px-6 py-2 rounded-full text-lg font-seasons hover:bg-gray-800 text-gray transition-colors">
              Sign up
            </button>
          </div>
        </div>
      </div>
      <div className="px-40  w-full h-full  px-90 py-15 overflow-y-auto">
        <div className="w-full flex font-bold text-white text-xl mb-5">
          <p className="flex-1"></p>
          <p className="mr-2 text-[22px]">Sort</p>
          <img height={25} className="h-7 mr-5" src={Sort} />
        </div>
        {projectsWithGrade &&
          projectsWithGrade.map((p) => <ProjectSnippet project={p} />)}
      </div>
    </div>
  );
};
