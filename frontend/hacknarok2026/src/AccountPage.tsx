import { ProjectSnippet } from "./components/ProjectSnippet";
import { useData } from "./DataContext";

export const AccountPage = () => {
  const { loggedInUser, projects, projectRatings, setCurrentProject } =
    useData();

  const projectsWithGrade = projects?.filter((p) =>
    projectRatings?.find((pR) => pR.project_id == p.id),
  );

  const projectsToGrade = projects?.filter((p) =>
    projectsWithGrade?.every((pR) => pR.id != p.id),
  );

  return (
    <div className="w-full flex-1 bg-gray-100 ">
      <div className="w-full bg-gradient-to-r from-green-400 to-green-500 text-6xl font-bold justify-self-center text-center py-10 text-white mb-30">
        Twoje Konto
      </div>
      {loggedInUser && loggedInUser.role === "checker" && (
        <div className="flex flex-col lg:flex-row w-full gap-8 items-start px-40">
          <div className="w-full lg:w-2/3 bg-gray-200 rounded-3xl p-8 shadow-2xl">
            <h1 className="text-5xl font-bold text-black mb-5">
              Projekty do oceny
            </h1>

            <div className="space-y-4 overflow-y-auto h-80 scrollbar-hide">
              {projectsToGrade &&
                projectsToGrade.map((project) => (
                  <div
                    key={project.id}
                    className="bg-white rounded-xl overflow-hidden flex items-center shadow-lg"
                  >
                    <div className="w-48 h-40 flex-shrink-0">
                      <img
                        src={project.photo_url}
                        alt={project.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 px-6 py-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h2 className="text-2xl font-bold text-black">
                            {project.name}
                          </h2>
                          <p className="text-lg text-gray-600">
                            Kategoria: {project.tags}
                          </p>
                        </div>

                        <button
                          onClick={() => setCurrentProject(project)}
                          className="border-4 border-green-700 text-black px-8 py-1 rounded-full text-xl font-bold hover:bg-green-50 transition-colors uppercase tracking-wider"
                        >
                          Oceń
                        </button>
                      </div>

                      <p className="text-xs mt-3 text-gray-500 leading-tight line-clamp-3">
                        {project.description}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className="w-full lg:w-1/3 bg-white p-10 rounded-3xl shadow-xl flex flex-col items-center sticky top-10">
            <div className="w-48 h-48 rounded-full overflow-hidden shadow-inner mb-6 border-4 border-gray-50">
              <img
                src={loggedInUser.photo_url}
                alt="Avatar"
                className="w-full h-full object-cover scale-110"
              />
            </div>

            <div className="text-center space-y-2">
              <h2 className="text-3xl font-black text-black">
                {loggedInUser.name} {loggedInUser.surname}
              </h2>
              <p className="text-2xl text-gray-700">
                {loggedInUser.role === "checker"
                  ? "Sprawdzacz"
                  : loggedInUser.role}
              </p>
              <div className="text-2xl pt-4">
                <span className="font-light">Saldo:</span>{" "}
                <span className="font-bold">000PLN</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
