import { Rating } from "@mui/material";
import { useData } from "./DataContext";

export const ProjectPage = () => {
  const { currentProject, projectRatings } = useData();

  const rating = projectRatings?.find(
    (pR) => pR.project_id == currentProject?.id && pR.category == "main",
  );
  return (
    <div className="w-full">
      {currentProject && (
        <div className="bg-gray-800 w-full h-full  px-10 py-15 overflow-y-auto">
          <p className="text-white font-bold text-[100px] justify-self-center">
            {currentProject.name}
          </p>
          <div className=" w-full bg-gray-300 p-10  rounded-2xl  mt-30">
            <div className="w-full   flex text-black text-2xl">
              <img className="h-100 pb-5" src={currentProject.photo_url} />

              <div className="w-full">
                <div className="w-full h-10  p-5">
                  {rating && (
                    <Rating
                      precision={0.5}
                      defaultValue={rating.rating / 2}
                      readOnly
                      size="large"
                    />
                  )}
                </div>
                <div className="p-5">
                  <span className="font-bold">Tagi:</span> {currentProject.tags}
                </div>
                <div className="py-2 p-5">
                  <span className="font-bold">Repozytorium:</span>{" "}
                  {currentProject.repo_url}
                </div>
                <div className="p-5 py-2 w-full">
                  <span className="font-bold">Podsumowanie:</span>{" "}
                  <span className="text-lg">{rating?.description}</span>
                </div>
              </div>
            </div>
            <div className="w-full mb-10 text-xl">
              {" "}
              <span className="font-bold">Pełny opis projektu: </span>
              {currentProject.description}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
