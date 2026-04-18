import { Rating } from "@mui/material";
import { useData } from "./DataContext";
import { FaGithub, FaStar, FaCodeBranch, FaExclamationCircle } from "react-icons/fa";

export const ProjectPage = () => {
  const { currentProject, projectRatings } = useData();

  const rating = projectRatings?.find(
    (pR) => pR.project_id == currentProject?.id && pR.category == "main",
  );

  return (
    <div className="w-full">
      {currentProject && (
        <div className="bg-gray-800 w-full h-full px-10 py-15 overflow-y-auto text-white">
          
          {/* HEADER */}
          <div className="text-left mb-10 pl-4">
            <h1 className="font-bold text-[70px]">{currentProject.name}</h1>
            <p className="text-2xl text-gray-300">
              Właściciel: {currentProject.owner}
            </p>
          </div>

          {/* MAIN CARD */}
          <div className="bg-gray-200 text-black p-8 rounded-2xl shadow-lg">

            <div className="flex gap-10">
              
              {/* IMAGE */}
              <img
                className="h-80 rounded-xl object-cover"
                src={currentProject.photo_url}
              />

              {/* RIGHT SIDE */}
              <div className="flex flex-col gap-4 w-full">

                {/* RATING */}
                {rating && (
                  <Rating
                    precision={0.5}
                    value={rating.rating / 2}
                    readOnly
                    size="large"
                  />
                )}

                {/* REPO */}
                <div>
                  <span className="font-bold">Repozytorium: </span>
                  <a
                    href={currentProject.repo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-600 hover:underline"
                  >
                    Link <FaGithub />
                  </a>
                </div>

                {/* TAGS */}
                <div>
                  <span className="font-bold">Tagi: </span>
                  {currentProject.tags}
                </div>

                {/* LANGUAGE */}
                <div>
                  <span className="font-bold">Główny język: </span>
                  {currentProject.main_language}
                </div>

                <div>
                  <span className="font-bold">Dane z githuba: </span>
                </div>

                <div className="flex gap-6 text-lg">
                  <span className="flex items-center gap-1">
                    <FaStar /> {currentProject.stars}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaCodeBranch /> {currentProject.forks}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaExclamationCircle /> {currentProject.open_issues}
                  </span>
                </div>

                {/* DATES */}
                <div className="text-sm text-gray-600 mt-2">
                  <p>Utworzono: {new Date(currentProject.created_at).toLocaleDateString()}</p>
                  <p>Aktualizacja: {new Date(currentProject.updated_at).toLocaleDateString()}</p>
                  <p>Ostatnia synchronizacja: {new Date(currentProject.last_synced_at).toLocaleDateString()}</p>
                </div>

                {/* AI SLOP */}
                <div>
                  <span className="font-bold">AI Slop: </span>
                  {rating?.isSlop ? "Tak 🤖" : "Nie ✅"}
                </div>

              </div>
            </div>

            {/* DESCRIPTION */}
            <div className="mt-8">
              <h2 className="font-bold text-xl mb-2">Opis projektu</h2>
              <p>{currentProject.description}</p>
            </div>

            {/* RATING DESCRIPTION */}
            {rating?.description && (
              <div className="mt-6">
                <h2 className="font-bold text-xl mb-2">Podsumowanie</h2>
                <p>{rating.description}</p>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
};