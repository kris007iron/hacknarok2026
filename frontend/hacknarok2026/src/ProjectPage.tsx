import { Rating } from "@mui/material";
import { useData } from "./DataContext";
import {
  FaGithub,
  FaStar,
  FaCodeBranch,
  FaExclamationCircle,
  FaUserCircle,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { useState, useEffect, useMemo } from "react";
import service from "./api";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip as RechartsTooltip,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import type { Language, Commit, Contributor } from "./types";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"];

export const ProjectPage = () => {
  const { currentProject, projectRatings, comments, setComments } = useData();
  
  // Stany dla nowych sekcji
  const [languages, setLanguages] = useState<Language[]>([]);
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [commits, setCommits] = useState<Commit[]>([]);
  const [showAllCommits, setShowAllCommits] = useState(false);

  // Stany formularza komentarzy
  const [loading, setLoading] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [name, setName] = useState("");

  // 1. Pobieranie dodatkowych danych po załadowaniu projektu
  useEffect(() => {
    if (currentProject?.id) {
      service.getLanguages(currentProject.id).then((res) => setLanguages(res.data));
      service.getContributors(currentProject.id).then((res) => setContributors(res.data));
      service.getCommits(currentProject.id).then((res) => setCommits(res.data));
    }
  }, [currentProject?.id]);

  // 2. Przetwarzanie danych do wykresu commitów (grupowanie po dacie)
  const commitChartData = useMemo(() => {
    const stats: Record<string, number> = {};
    commits.forEach((c) => {
      const date = new Date(c.date).toLocaleDateString("pl-PL", { month: 'short', day: 'numeric' });
      stats[date] = (stats[date] || 0) + 1;
    });
    return Object.keys(stats).map(date => ({ date, count: stats[date] })).reverse().slice(-10);
  }, [commits]);

  // Logika ocen
  const allCurrentProjectRatings = projectRatings?.filter(
    (pR) => pR.project_id == currentProject?.id
  );
  const mainRating = allCurrentProjectRatings?.find((pR) => pR.category === "main");
  const categoryRatings = allCurrentProjectRatings?.filter((pR) => pR.category !== "main");

  return (
    <div className="w-full pb-20">
      {currentProject && (
        <div className="bg-gradient-to-r from-darkblack to-darkblue w-full h-full">
          <div className="px-10 py-15 overflow-y-auto text-white">
            <div className="text-left mb-10 pl-4">
              <h1 className="font-bold text-[70px] leading-tight">{currentProject.name}</h1>
              <p className="text-2xl text-gray-300">Author: {currentProject.owner}</p>
            </div>

            {/* GŁÓWNA KARTA PROJEKTU */}
            <div className="bg-gray-200 text-black p-8 rounded-2xl shadow-lg">
              <div className="flex flex-col lg:flex-row gap-10">
                <img
                  className="h-80 w-full lg:w-1/3 rounded-xl object-cover shadow-md"
                  src={currentProject.photo_url}
                  alt={currentProject.name}
                />

                <div className="flex flex-col gap-4 w-full">
                  {mainRating && (
                    <div className="flex items-center gap-3">
                      <Rating precision={0.5} value={mainRating.rating / 2} readOnly size="large" />
                      <span className="font-bold text-xl">({mainRating.rating}/10)</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2">
                    <p><span className="font-bold">Repository: </span>
                      <a href={currentProject.repo_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-blue-600 hover:underline">
                        Link <FaGithub />
                      </a>
                    </p>
                    <p><span className="font-bold">Main Language: </span> {currentProject.main_language}</p>
                    <p><span className="font-bold">Tags: </span> {currentProject.tags}</p>
                    <p><span className="font-bold">AI Slop: </span> {mainRating?.is_slop ? "Yes 🤖" : "No ✅"}</p>
                  </div>

                  <div className="flex gap-6 text-lg py-4 border-y border-gray-300">
                    <span className="flex items-center gap-1"><FaStar className="text-yellow-600" /> {currentProject.stars}</span>
                    <span className="flex items-center gap-1"><FaCodeBranch className="text-blue-600" /> {currentProject.forks}</span>
                    <span className="flex items-center gap-1"><FaExclamationCircle className="text-red-600" /> {currentProject.open_issues}</span>
                  </div>

                  <div className="text-sm text-gray-500 italic">
                    <p>Created: {new Date(currentProject.created_at!).toLocaleDateString()}</p>
                    <p>Last Sync: {new Date(currentProject.last_synced_at!).toLocaleDateString()}</p>
                  </div>
                </div>

                {/* Kategorie ocen */}
                <div className="bg-white/60 backdrop-blur-md p-6 rounded-2xl border border-gray-300 shadow-sm min-w-[250px]">
                  <h3 className="text-xs font-black uppercase tracking-wider text-gray-600 mb-3 border-b border-gray-400 pb-1">
                    Category Scores
                  </h3>
                  <div className="flex flex-col gap-3">
                    {categoryRatings?.length ? categoryRatings.map((cat) => (
                      <div key={cat.id} className="flex flex-col">
                        <span className="text-xs font-bold text-gray-800">{cat.category}</span>
                        <Rating value={cat.rating / 2} precision={0.5} readOnly size="small" />
                      </div>
                    )) : <span className="text-xs italic text-gray-500">No category ratings yet</span>}
                  </div>
                </div>
              </div>

              {/* Opis i Summary */}
              <div className="mt-8 grid grid-cols-1  md:grid-cols-2 gap-8">
                <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                  <h2 className="font-bold text-xl mb-2">Project Description</h2>
                  <p className="text-gray-700 leading-relaxed">{currentProject.description}</p>
                </div>
                {mainRating?.description && (
                  <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                    <h2 className="font-bold text-xl mb-2">Reviewer Summary</h2>
                    <p className="text-gray-700 italic">"{mainRating.description}"</p>
                  </div>
                )}
              </div>

              <hr className="my-5 border-gray-300" />

              {/* --- NOWE SEKCJE: DIAGRAMY I STATYSTYKI --- */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                
                {/* 1. Diagram Języków */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <h3 className="font-bold text-xl mb-4">Language Distribution</h3>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={languages}
                          dataKey="bytes"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          label={({ name, percent }) => 
                              `${percent ? `${name} ${(percent * 100).toFixed(1)}%` : ""}`
                            }
                        >
                          {languages.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <RechartsTooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* 2. Top Contributors */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <h3 className="font-bold text-xl mb-4">Contributors</h3>
                  <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                    {contributors.map((c) => (
                      <div key={c.login} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                        <div className="flex items-center gap-3">
                          <img src={c.avatar_url} className="w-10 h-10 rounded-full" alt={c.login} />
                          <a href={c.html_url} target="_blank" className="font-bold hover:underline">{c.login}</a>
                        </div>
                        <div className="text-right">
                          <span className="text-blue-600 font-bold">{c.contributions}</span>
                          <span className="text-xs text-gray-500 ml-1">commits</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 3. Wykres Commitów w czasie */}
              <div className="mt-10 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-xl mb-4">Commit Activity (Recent)</h3>
                <div className="h-[250px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={commitChartData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="date" />
                      <YAxis allowDecimals={false} />
                      <RechartsTooltip />
                      <Area type="monotone" dataKey="count" stroke="#1e293b" fill="#3b82f6" fillOpacity={0.2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                {/* Rozwijana lista commitów */}
                <div className="mt-6 border-t pt-4">
                  <button 
                    onClick={() => setShowAllCommits(!showAllCommits)}
                    className="flex items-center gap-2 text-blue-600 font-bold hover:text-blue-800 transition-colors"
                  >
                    {showAllCommits ? <FaChevronUp /> : <FaChevronDown />}
                    {showAllCommits ? "Hide commit history" : "View commit history"}
                  </button>

                  {showAllCommits && (
                    <div className="mt-4 space-y-2 max-h-60 overflow-y-auto">
                      {commits.map((commit) => (
                        <div key={commit.sha} className="text-sm p-3 bg-gray-50 rounded-lg border-l-4 border-blue-500 flex justify-between">
                          <div>
                            <p className="font-bold truncate max-w-md">{commit.message}</p>
                            <p className="text-gray-500 text-xs">{commit.author} committed on {new Date(commit.date).toLocaleDateString()}</p>
                          </div>
                          <a href={commit.url} target="_blank" className="text-xs text-blue-400 hover:underline">SHA: {commit.sha.substring(0,7)}</a>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* SEKTCJA KOMENTARZY */}
          <div className="text-center my-10 px-4">
            <h1 className="font-bold text-4xl lg:text-6xl text-white">Comments section</h1>
          </div>

          <div className={`bg-[#f3f4f6] p-10 rounded-3xl shadow-sm max-w-4xl mx-auto text-black ${loading ? "opacity-50" : ""}`}>
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Write comment</h2>
              <div className="flex flex-col md:flex-row items-start gap-6">
                <FaUserCircle className="text-8xl text-gray-400 shrink-0 hidden md:block" />
                <div className="flex-grow w-full flex flex-col md:flex-row gap-4 items-center">
                  <div className="bg-white border border-blue-100 rounded-xl p-4 flex-grow shadow-inner w-full">
                    <input
                      placeholder="Your Name..."
                      className="font-bold mb-2 w-full outline-none"
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
                    className="bg-[#1e293b] hover:bg-black text-white font-bold py-6 px-8 rounded-xl transition-all w-full md:w-auto"
                    disabled={loading}
                    onClick={() => {
                      if (currentProject.id && name && newComment) {
                        setLoading(true);
                        service.postComment({
                          name,
                          description: newComment,
                          project_id: currentProject.id,
                        }).then(() => {
                          setTimeout(() => {
                            service.getComments().then((res) => {
                              setComments(res.data);
                              setLoading(false);
                              setName("");
                              setNewComment("");
                            });
                          }, 500);
                        });
                      }
                    }}
                  >
                    Add<br />comment
                  </button>
                </div>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-4 mb-8">
                <h2 className="text-2xl font-bold whitespace-nowrap">All comments</h2>
                <div className="h-px bg-black flex-grow" />
              </div>

              <div className="space-y-8">
                {comments?.filter(c => c.project_id === currentProject.id).map((comment) => (
                  <div key={comment.id} className="flex items-start gap-4">
                    <FaUserCircle className="text-5xl text-gray-300 shrink-0" />
                    <div className="bg-white p-4 rounded-2xl shadow-sm flex-grow">
                      <p className="font-bold text-blue-900">{comment.name}</p>
                      <p className="text-gray-700 mt-1">{comment.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      )}
    </div>
  );
};