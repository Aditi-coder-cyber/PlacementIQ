import React, { useState, useEffect } from 'react';
import Card from '../components/Card';

function Subjects() {
  const [expandedSubject, setExpandedSubject] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5001/subjects')
      .then(res => res.json())
      .then(data => {
        // Transform object { "Subject": [questions] } to array [{ name: "Subject", questions: [questions] }]
        const subjectsArray = Object.keys(data).map(key => ({
          name: key,
          questions: data[key]
        }));
        setSubjects(subjectsArray);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching subjects data:', err);
        setLoading(false);
      });
  }, []);

  const handleSubjectToggle = (subject) => {
    setExpandedSubject(expandedSubject === subject ? null : subject);
  };

  if (loading) {
    return <div className="container" style={{ padding: '50px', textAlign: 'center' }}><h2>Loading Core Subjects...</h2></div>;
  }

  return (
    <div className="subjects">
      <div className="container">
        <header className="page-header">
          <h1>Core Subjects</h1>
          <p>Master the fundamental computer science concepts essential for technical interviews</p>
        </header>

        <div className="subjects-grid">
          {subjects.map((subject, index) => (
            <div key={index} className="subject-section">
              <Card
                title={subject.name}
                description={`${subject.questions.length} essential questions`}
                buttonText={expandedSubject === subject ? 'Hide Questions' : 'View Questions'}
                onButtonClick={() => handleSubjectToggle(subject)}
                className="subject-card"
              />

              {expandedSubject === subject && (
                <div className="questions-container">
                  <h3>Important Interview Questions:</h3>
                  <div className="questions-list">
                    {subject.questions.map((q, qIndex) => (
                      <div key={qIndex} className="question-item">
                        <div className="question-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <div>
                            <span className="question-number">Q{qIndex + 1}</span>
                            <span className="question-text">{q.question}</span>
                          </div>
                          <span className="category-badge" style={{ fontSize: '0.75em', padding: '2px 8px', borderRadius: '12px', backgroundColor: '#f0f0f0', border: '1px solid #ddd' }}>
                            {q.category}
                          </span>
                        </div>
                        <p className="answer-text" style={{ paddingLeft: '40px', marginTop: '10px', fontStyle: 'italic', color: '#666' }}>
                          <strong>A:</strong> {q.short_answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <section className="study-approach">
          <h2>How to Study Core Subjects</h2>
          <div className="approach-grid">
            <div className="approach-card">
              <h3>📚 Understand Concepts</h3>
              <p>Focus on understanding the 'why' behind each concept rather than just memorizing</p>
            </div>
            <div className="approach-card">
              <h3>🔗 Make Connections</h3>
              <p>Relate concepts across different subjects to build a comprehensive understanding</p>
            </div>
            <div className="approach-card">
              <h3>💡 Practice Explanations</h3>
              <p>Practice explaining concepts in simple terms as if teaching someone else</p>
            </div>
            <div className="approach-card">
              <h3>🎯 Focus on Fundamentals</h3>
              <p>Master the basics before moving to advanced topics and implementations</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Subjects;