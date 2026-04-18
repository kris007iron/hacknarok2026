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
      className="w-full h-60 mb-10 flex shadow-xl rounded-2xl bg-[#F2F2F2]"
      onClick={() => {
        setCurrentProject(project);
        navigate("/project");
      }}
    >
      <img className="h-full rounded-l-xl " src={project.photo_url} />

      <div className="w-full h-full ml-10">
        <div className="w-full flex p-5">
          <div className="flex-1 font-bold text-3xl">{project.name}</div>
          {rating && (
            <Rating
              precision={0.5}
              defaultValue={rating.rating / 2}
              readOnly
              size="large"
            ></Rating>
          )}
        </div>
        <div className="w-full text-black mt-10">
          {project.description.slice(0, 200)}...
        </div>
      </div>
    </div>
  );
};
