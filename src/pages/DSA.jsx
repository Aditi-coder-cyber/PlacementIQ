import React, { useState, useEffect } from 'react';
import Card from '../components/Card';

function DSA() {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [dsaTopics, setDsaTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5001/dsa')
      .then(res => res.json())
      .then(data => {
        // Transform object { "Topic": [problems] } to array [{ name: "Topic", problems: [problems] }]
        const topicsArray = Object.keys(data).map(key => ({
          name: key,
          problems: data[key]
        }));
        setDsaTopics(topicsArray);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching DSA data:', err);
        setLoading(false);
      });
  }, []);

  const handleTopicClick = (topic) => {
    setSelectedTopic(selectedTopic === topic ? null : topic);
  };

  if (loading) {
    return <div className="container" style={{ padding: '50px', textAlign: 'center' }}><h2>Loading DSA Content...</h2></div>;
  }

  return (
    <div className="dsa">
      <div className="container">
        <header className="page-header">
          <h1>DSA Practice Sheet</h1>
          <p>Master Data Structures and Algorithms with our curated problem sets</p>
        </header>

        <div className="dsa-content">
          <div className="topics-grid">
            {dsaTopics.map((topic, index) => (
              <div key={index} className="topic-card">
                <Card
                  title={topic.name}
                  description={`${topic.problems.length} essential problems`}
                  buttonText={selectedTopic === topic ? 'Hide Problems' : 'View Problems'}
                  onButtonClick={() => handleTopicClick(topic)}
                  className="dsa-topic-card"
                />
                {selectedTopic === topic && (
                  <div className="problems-list">
                    <h4>Practice Problems:</h4>
                    <ul>
                      {topic.problems.map((problem, problemIndex) => (
                        <li key={problemIndex} className="problem-item">
                          <span className="problem-number">{problemIndex + 1}.</span>
                          <a
                            href={problem.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="problem-name"
                            style={{ color: 'inherit', textDecoration: 'none' }}
                          >
                            {problem.title}
                          </a>
                          <span className="platform-tag" style={{ marginLeft: '10px', fontSize: '0.8em', backgroundColor: '#e0e0e0', padding: '2px 6px', borderRadius: '4px', color: '#555' }}>
                            {problem.platform}
                          </span>
                          <span className={`difficulty ${problem.difficulty.toLowerCase()}`}>
                            {problem.difficulty}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <section className="dsa-tips">
          <h2>Study Tips</h2>
          <div className="tips-grid">
            <div className="tip-card">
              <h3>🎯 Start with Basics</h3>
              <p>Begin with Arrays and Strings before moving to complex data structures</p>
            </div>
            <div className="tip-card">
              <h3>📝 Practice Daily</h3>
              <p>Solve at least 2-3 problems daily to build consistency</p>
            </div>
            <div className="tip-card">
              <h3>🔄 Review Solutions</h3>
              <p>Always review multiple approaches and optimize your solutions</p>
            </div>
            <div className="tip-card">
              <h3>⏰ Time Yourself</h3>
              <p>Practice solving problems within interview time constraints</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default DSA;