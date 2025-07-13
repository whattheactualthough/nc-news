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

  const handleTopicClick = (event) => {
    // navigate(`/articles/topics/${slug}`);
    // setIsOpen(false);

    if (!event.target.value) {
      navigate("/articles");
    } else {
      navigate(`/articles/topics/${event.target.value}`);
    }
  };
  return (
    <div>
      <button onClick={handleToggle}>Select Topic</button>
      {isOpen && (
        <div
          className="topics-list"
          style={{ maxHeight: "300px", maxWidth: "300px", overflowY: "auto" }}
        >
          {/* <ul>
            {topics
              .filter((topic) => topic?.slug)
              .map((topic) => (
                <li key={topic.slug} style={{ padding: '4px'}}>
                  <button onClick={() => handleTopicClick(topic.slug)}>
                    {topic.slug}
                  </button>
                </li>
              ))}
          </ul> */}
          <select onChange={handleTopicClick}>
            <option
              value={""}
              onChange={(event) => {
                console.log(event.target.value);
              }}
            >
              all
            </option>
            {topics.map((topic) => {
              return (
                <option value={topic.slug} key={topic.slug}>
                  {topic.slug}
                </option>
              );
            })}
          </select>
        </div>
      )}
    </div>
  );
};

export default TopicNavbar;
