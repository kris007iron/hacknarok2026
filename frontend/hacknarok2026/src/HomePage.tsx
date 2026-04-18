import { useData } from "./dataContext";
import Rating from "@mui/material/Rating";

export const HomePage = () => {
  const { projects, projectRatings, setCurrentProject } = useData();
  return (
    <div className="w-full px-40 h-screen">
      <div className="bg-gray-800 w-full h-full  px-10 py-15 overflow-y-auto">
        {projects &&
          projects.map((p) => {
            const rating = projectRatings?.find(
              (pR) => pR.project_id == p.id && pR.category == "main",
            );
            console.log(rating);
            return (
              <div
                className="w-full h-100 bg-black rounded-2xl p-10 mb-10 flex"
                onClick={() => setCurrentProject(p)}
              >
                <img className="h-full p-10 -mt-5" src={p.photo_url} />

                <div className="w-full h-full ">
                  <div className="w-full h-26 bg-gray-500 p-5">
                    <div>{p.name}</div>
                    <div> {p.owner}</div>
                  </div>
                  <div className="w-full h-26 bg-gray-600 p-5">
                    {rating && (
                      <Rating
                        precision={0.5}
                        defaultValue={rating.rating / 2}
                      ></Rating>
                    )}
                  </div>
                  <div className="w-full h-28 bg-gray-700 p-5 text-white">
                    {p.description}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
