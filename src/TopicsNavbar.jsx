import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getTopics } from "../api";

const TopicNavbar = () => {
  const [topics, setTopics] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getTopics().then((topicsFromApi) => {
      setTopics(topicsFromApi);
    });
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

 const handleTopicClick = (slug) => {
  navigate(slug ? `/articles/topics/${slug}` : "/articles");
  setIsOpen(false);
};

  return (
    <div className="relative w-64 ml-4">
  <div
    className="sticky top-0 bg-white z-20 border-b border-gray-200 px-3 py-2 flex justify-between items-center cursor-pointer rounded-t-lg shadow"
    onClick={handleToggle}
  >
    <span className="font-medium text-gray-600">Topics</span>
    <span className="text-gray-600 ml-1">{isOpen ? "▲" : "▼"}</span>
  </div>
  <div
    className={
      "absolute top-full left-0 w-full bg-white shadow-md " +
      "overflow-hidden transition-all duration-300 ease-in-out rounded-b-lg " +
      (isOpen
        ? "max-h-64 opacity-100"
        : "max-h-0 opacity-0 invisible")
    }
  >
    <ul>
      {topics.map((topic) => (
        <li
          key={topic.slug}
          onClick={() => handleTopicClick(topic.slug)}
          className="flex items-center gap-2 px-3 py-1 border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
        >
          {/* <TopicAvatar slug={topic.slug} /> */}
          <span className="text-gray-600">{topic.slug}</span>
        </li>
      ))}
    </ul>
  </div>
</div>
  )
};

export default TopicNavbar;
