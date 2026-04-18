import { useNavigate } from "react-router-dom";
import { useData } from "../DataContext";
import type { Project } from "../types";
import { Rating } from "@mui/material";

type ProjectSnippetType = {
  project: Project;
};
export const ProjectSnippet = ({ project }: ProjectSnippetType) => {
  const { projectRatings, setCurrentProject } = useData();
  const rating = projectRatings?.find(
    (pR) => pR.project_id == project.id && pR.category == "main",
  );
  const navigate = useNavigate();

  return (
    <div
      className="w-full h-100 bg-black rounded-2xl p-10 mb-10 flex"
      onClick={() => {
        setCurrentProject(project);
        navigate("/project");
      }}
    >
      <img className="h-full p-10 -mt-5" src={project.photo_url} />

      <div className="w-full h-full ">
        <div className="w-full h-26 bg-gray-500 p-5">
          <div>{project.name}</div>
          <div> {project.owner}</div>
        </div>
        <div className="w-full h-26 bg-gray-600 p-5">
          {rating && (
            <Rating
              precision={0.5}
              defaultValue={rating.rating / 2}
              readOnly
            ></Rating>
          )}
        </div>
        <div className="w-full h-28 bg-gray-700 p-5 text-white">
          {project.description.slice(0, 100)}...
        </div>
      </div>
    </div>
  );
};
