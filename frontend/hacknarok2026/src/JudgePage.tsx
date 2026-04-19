import {
  FaCodeBranch,
  FaExclamationCircle,
  FaGithub,
  FaStar,
} from "react-icons/fa";
import { useData } from "./DataContext";
import { Rating } from "@mui/material";
import { useState } from "react";
import type { ProjectRating } from "./types";
import service from "./api";
import { useNavigate } from "react-router-dom";

export const JudgePage = () => {
  const { currentProject, loggedInUser, setCurrentProject, setLoggedInUser } =
    useData();
  const [currentCategory, setCurrentCategory] = useState(0);
  const [currentRate, setCurrentRate] = useState(5);
  const [categoryDesc, setCategoryDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [rateSum, setRateSum] = useState(0);
  const [isSlop, setIsSlop] = useState(false);
  const navigate = useNavigate();
  const categories = [
    "Innovation",
    "Social impact",
    "UX/UI",
    "Documentation",
    "How it works",
  ];

  return (
    <div className="w-full bg-gradient-to-r from-darkblack to-darkblue p-20">
      {currentProject && (
        <div>
          <div className="w-full h-full px-auto py-10 items-center">
            <h1 className="font-medium  font-seasons text-[70px] text-white centered text-center">
              Judge section
            </h1>
          </div>
          <div className="flex gap-50">
            <div className="bg-gray-200 text-black p-8 w-1/2 rounded-2xl shadow-lg">
              <div className="flex gap-10">
                <img
                  className="h-80 rounded-xl object-cover"
                  src={currentProject.photo_url}
                  alt={currentProject.name}
                />

                <div className="flex flex-col gap-4 w-full">
                  <div>
                    <span className="font-bold">Author: </span>
                    <span>{currentProject.owner}</span>
                  </div>
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
                </div>
              </div>

              <div className="mt-16">
                <h2 className="font-bold text-xl mb-2">Project Description</h2>
                <p>{currentProject.description}</p>
              </div>
            </div>
            <div
              className={`bg-gray-200 text-black p-8 w-1/3  rounded-2xl shadow-lg ${loading ? "opacity-50" : ""}`}
            >
              <div className="flex gap-10">
                <div className="flex flex-col gap-4 w-full">
                  <div className="font-bold text-4xl text-center w-full">
                    Rating Panel
                  </div>
                  <div className="font-bold text-2xl w-full">
                    Category: {categories[currentCategory]}
                  </div>
                  <div className="font-semibold text-xl w-full">
                    {currentCategory != 5
                      ? "Category Rating"
                      : "Overall Rating"}
                  </div>
                  <Rating
                    precision={0.5}
                    value={
                      currentCategory != 5 ? currentRate / 2 : rateSum / 10
                    }
                    readOnly={currentCategory == 5}
                    size="large"
                    onChange={(e) => setCurrentRate(e.target.value * 2)}
                  />
                  {currentCategory == 5 && (
                    <div className="mb-8">
                      <p className="text-2xl font-black mb-2 text-black uppercase">
                        AI Slop
                      </p>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="slop"
                          className="w-8 h-8 rounded border-2 border-black accent-black cursor-pointer"
                          checked={isSlop}
                          onChange={(e) => setIsSlop(e.target.checked)}
                        />
                        <label
                          htmlFor="slop"
                          className="text-xl font-black text-red-800 cursor-pointer"
                        >
                          YES
                        </label>
                      </div>
                    </div>
                  )}
                  <div className="font-semibold text-xl w-full">
                    {currentCategory != 5
                      ? "Category Description"
                      : "Overall Description"}{" "}
                  </div>
                  <textarea
                    className="bg-white rounded-xl border-1 border-darkblack h-25"
                    onChange={(e) => setCategoryDesc(e.target.value)}
                  />
                  <button
                    className="bg-[#12294F] text-white py-3 font-bold text-2xl w-80 mx-auto mt-15 rounded-xl"
                    onClick={() => {
                      if (!currentProject.id || !loggedInUser?.id) return;
                      if (currentCategory != 5) {
                        const rating: ProjectRating = {
                          category: categories[currentCategory],
                          description: categoryDesc,
                          rating: currentRate,
                          project_id: currentProject.id,
                          checker_id: loggedInUser.id,
                        };
                        service.createProjectRating(rating);
                        setLoading(true);
                        setTimeout(() => {
                          setCategoryDesc("");
                          setRateSum(rateSum + currentRate);
                          setCurrentRate(5);
                          setCurrentCategory(currentCategory + 1);
                          setLoading(false);
                        }, 500);
                      } else {
                        const rating: ProjectRating = {
                          category: "main",
                          description: categoryDesc,
                          rating: rateSum / 5,
                          project_id: currentProject.id,
                          checker_id: loggedInUser.id,
                          isSlop: isSlop,
                        };
                        service.createProjectRating(rating);
                        setLoading(true);
                        setTimeout(() => {
                          setCategoryDesc("");
                          setRateSum(rateSum + currentRate);
                          setCurrentRate(5);
                          setCurrentCategory(currentCategory + 1);
                          setCurrentProject(undefined);
                          setLoading(false);
                          const user = loggedInUser;
                          if (user.money) user.money += 10;
                          else user.money = 10;
                          setLoggedInUser(user);
                          navigate("/account");
                        }, 500);
                      }
                    }}
                  >
                    {currentCategory == 5 ? "SUBMIT" : "NEXT CATEGORY"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
