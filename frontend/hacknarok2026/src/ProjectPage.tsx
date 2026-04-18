import { Rating } from "@mui/material";
import { useData } from "./DataContext";
import {
  FaGithub,
  FaStar,
  FaCodeBranch,
  FaExclamationCircle,
} from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";
import service from "./api";
export const ProjectPage = () => {
  const { currentProject, projectRatings, comments, setComments } = useData();
  const [loading, setLoading] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [name, setName] = useState("");

  const rating = projectRatings?.find(
    (pR) => pR.project_id == currentProject?.id && pR.category == "main",
  );

  return (
    <div className="w-full">
      {currentProject && (
        <div className="bg-gradient-to-r from-darkblack to-darkblue w-full h-full">
          <div className=" px-10 py-15 overflow-y-auto text-white">
            <div className="text-left mb-10 pl-4">
              <h1 className="font-bold text-[70px]">{currentProject.name}</h1>
              <p className="text-2xl text-gray-300">
                Author: {currentProject.owner}
              </p>
            </div>

            <div className="bg-gray-200 text-black p-8 rounded-2xl shadow-lg">
              <div className="flex gap-10">
                <img
                  className="h-80 rounded-xl object-cover"
                  src={currentProject.photo_url}
                  alt={currentProject.name}
                />

                <div className="flex flex-col gap-4 w-full">
                  {rating && (
                    <Rating
                      precision={0.5}
                      value={rating.rating / 2}
                      readOnly
                      size="large"
                    />
                  )}

                  <div>
                    <span className="font-bold">Repository: </span>
                    <a
                      href={currentProject.repo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-blue-600 hover:underline"
                    >
                      Link <FaGithub />
                    </a>
                  </div>

                  <div>
                    <span className="font-bold">Tags: </span>
                    {currentProject.tags}
                  </div>

                  <div>
                    <span className="font-bold">Main Language: </span>
                    {currentProject.main_language}
                  </div>

                  <div>
                    <span className="font-bold">GitHub Data: </span>
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

                  <div className="text-sm text-gray-600 mt-2">
                    <p>
                      Created:{" "}
                      {new Date(currentProject.created_at).toLocaleDateString(
                        "en-US",
                      )}
                    </p>
                    <p>
                      Last Updated:{" "}
                      {new Date(currentProject.updated_at).toLocaleDateString(
                        "en-US",
                      )}
                    </p>
                    <p>
                      Last Sync:{" "}
                      {new Date(
                        currentProject.last_synced_at,
                      ).toLocaleDateString("en-US")}
                    </p>
                  </div>

                  <div>
                    <span className="font-bold">AI Slop: </span>
                    {rating?.isSlop ? "Yes 🤖" : "No ✅"}
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h2 className="font-bold text-xl mb-2">Project Description</h2>
                <p>{currentProject.description}</p>
              </div>

              {rating?.description && (
                <div className="mt-6">
                  <h2 className="font-bold text-xl mb-2">Summary</h2>
                  <p>{rating.description}</p>
                </div>
              )}
            </div>
          </div>
          <div className="text-left mb-10 pl-4 justify-self-center">
            <h1 className="font-bold text-[70px] font-seasons text-white mx-auto w-full">
              Comments section
            </h1>
          </div>
          <div className="bg-[#f3f4f6] p-10 rounded-3xl shadow-sm max-w-4xl mx-auto text-black font-sans">
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Write comment</h2>
              <div className="flex items-start gap-6">
                <FaUserCircle className="text-8xl text-gray-400 shrink-0" />

                <div className="flex-grow flex gap-4 items-center">
                  <div className="bg-white border border-blue-100 rounded-xl p-4 flex-grow shadow-inner">
                    <input
                      placeholder="Name..."
                      className="font-bold mb-1"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Write your comment here..."
                      className="w-full bg-transparent outline-none resize-none text-gray-700 min-h-[80px]"
                    />
                  </div>

                  <button
                    className="bg-[#1e293b] hover:bg-black text-white font-bold py-6 px-8 rounded-xl transition-all h-full min-w-[140px]"
                    onClick={() => {
                      if (currentProject.id)
                        service.postComment({
                          name: name,
                          description: newComment,
                          project_id: currentProject.id,
                        });
                      setLoading(true);
                      setTimeout(() => {
                        service
                          .getComments()
                          .then((res) => res.data)
                          .then((com) => setComments(com))
                          .finally(() => setLoading(false));
                      }, 50);
                    }}
                  >
                    Add your
                    <br />
                    comment
                  </button>
                </div>
              </div>
            </section>

            <section className={`${loading ? "opacity-50" : ""}`}>
              <div className="flex items-center gap-4 mb-8">
                <h2 className="text-2xl font-bold whitespace-nowrap">
                  All comments
                </h2>
                <div className="h-px bg-black flex-grow" />
              </div>

              <div className="space-y-10">
                {comments &&
                  comments.map((comment) => {
                    if (comment.project_id == currentProject.id)
                      return (
                        <div
                          key={comment.id}
                          className="flex items-start gap-6"
                        >
                          <FaUserCircle className="text-7xl text-gray-400 shrink-0" />
                          <div>
                            <p className="font-bo1d text-lg">{comment.name}</p>
                            <p className="text-gray-700 leading-relaxed max-w-2xl">
                              {comment.description}
                            </p>
                          </div>
                        </div>
                      );
                  })}
              </div>
            </section>
          </div>
        </div>
      )}
    </div>
  );
};
