import { Link } from "react-router-dom";
import { ProjectSnippet } from "./components/ProjectSnippet";
import { useData } from "./DataContext";
import { useState } from "react";
import service from "./api";

export const AccountPage = () => {
  const { loggedInUser, projects, projectRatings, setCurrentProject, setProjects } =
    useData();
      const current = new Date();

  const projectsWithGrade = projects?.filter((p) =>
    projectRatings?.find((pR) => pR.project_id == p.id),
  );

  const projectsToGrade = projects?.filter((p) =>
    projectsWithGrade?.every((pR) => pR.id != p.id),
  );

  const [newProject, setNewProject] = useState({
    name: "",
    repo_url: "",
    tags: "",
    description: "",
    date_added:  current.getFullYear() + "-" + current.getMonth() + "-" + current.getDate(),
  });

  const handleSubmit = (e:any) => {
  e.preventDefault();

  console.log("NEW PROJECT:", newProject);
  service.createProject(newProject)
  setNewProject({
    name: "",
    repo_url: "",
    tags: "",
    description: "",
    date_added: current.getFullYear() + "-" + current.getMonth() + "-" + current.getDate(),
   });
   setTimeout(() => {
                        service
                          .getProjects()
                          .then((res) => res.data)
                          .then((proj) => setProjects(proj))
                          
                          
                      }, 500);
  };

  return (
    <div className="w-full flex-1 bg-radial from-darkblue to-darkblack ">
      <div className="w-full text-[90px] justify-self-center text-center py-10 text-white my-18 font-seasons">
        Your account
      </div>
      {loggedInUser && loggedInUser.role === "checker" && (
        <div className="flex w-full gap-8 items-start px-60">
          <div className="w-2/3  -mt-24  rounded-3xl p-8 ">
            <h1 className="text-5xl text-white mb-5 font-seasons">
              Projects to evaluate
            </h1>

            <div className="space-y-4 overflow-y-auto h-107 scrollbar-hide">
              {projectsToGrade &&
                projectsToGrade.map((project) => (
                  <div
                    key={project.id}
                    className=" rounded-xl bg-white overflow-hidden flex items-center shadow-lg"
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
                          <Link
                            to="/project"
                            onClick={() => {
                              setCurrentProject(project);
                            }}
                          >
                            {" "}
                            <h2 className="text-2xl font-bold text-black">
                              {project.name}
                            </h2>
                          </Link>
                          <p className="text-lg text-gray-600">
                            Category: {project.tags}
                          </p>
                        </div>

                        <button
                          onClick={() => setCurrentProject(project)}
                          className="border-4 border-datkblack text-black px-8 py-1 rounded-full text-xl font-bold hover:bg-green-50 transition-colors uppercase tracking-wider"
                        >
                          Rate
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

      {loggedInUser && loggedInUser.role === "user" && (
         <div className="flex w-full gap-8 items-start px-60">
          <div className="w-2/3  -mt-24  rounded-3xl p-8 ">

            <div className="w-full mb-10">
              <div className="bg-white rounded-3xl p-8 shadow-xl">
                <h2 className="text-3xl font-seasons mb-6 text-black">
                  Add new project
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Project name"
                    value={newProject.name}
                    onChange={(e) =>
                      setNewProject({ ...newProject, name: e.target.value })
                    }
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-lg focus:outline-none focus:border-black"
                  />

                  <input
                    type="text"
                    placeholder="Project URL"
                    value={newProject.repo_url}
                    onChange={(e) =>
                      setNewProject({ ...newProject, repo_url: e.target.value })
                    }
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-lg focus:outline-none focus:border-black"
                  />

                  <input
                    type="text"
                    placeholder="Tags (e.g. AI, Web, Mobile)"
                    value={newProject.tags}
                    onChange={(e) =>
                      setNewProject({ ...newProject, tags: e.target.value })
                    }
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-lg focus:outline-none focus:border-black"
                  />

                  <textarea
                    placeholder="Short description"
                    value={newProject.description}
                    onChange={(e) =>
                      setNewProject({
                        ...newProject,
                        description: e.target.value,
                      })
                    }
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-lg focus:outline-none focus:border-black resize-none h-28"
                  />

                  <button
                    type="submit"
                    className="w-full bg-black text-white py-3 rounded-xl text-xl font-bold hover:bg-gray-800 transition"
                  >
                    Add project
                  </button>
                </form>
              </div>
            </div>

            {loggedInUser.role == "checker" && (
              <div>
                 <h1 className="text-5xl text-white mb-5 font-seasons">
                  Projects to evaluate
                </h1>
                 <div className="space-y-4 overflow-y-auto h-107 scrollbar-hide">
              {projectsToGrade &&
                projectsToGrade.map((project) => (
                  <div
                    key={project.id}
                    className=" rounded-xl bg-white overflow-hidden flex items-center shadow-lg"
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
                          <Link
                            to="/project"
                            onClick={() => {
                              setCurrentProject(project);
                            }}
                          >
                            {" "}
                            <h2 className="text-2xl font-bold text-black">
                              {project.name}
                            </h2>
                          </Link>
                          <p className="text-lg text-gray-600">
                            Category: {project.tags}
                          </p>
                        </div>

                        <button
                          onClick={() => setCurrentProject(project)}
                          className="border-4 border-datkblack text-black px-8 py-1 rounded-full text-xl font-bold hover:bg-green-50 transition-colors uppercase tracking-wider"
                        >
                          Rate
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

              
            )}

           

           
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
