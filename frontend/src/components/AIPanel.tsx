import React from 'react';
import '../styles/AIPanel.css';

interface AIPanelProps {
  explanation: string | null;
  resources: string[] | null;
  concept: string | null;
  loading: boolean;
  error: string | null;
  onClear: () => void;
}

export const AIPanel: React.FC<AIPanelProps> = ({
  explanation,
  resources,
  concept,
  loading,
  error,
  onClear,
}) => {
  if (!explanation && !resources && !error && !loading) {
    return null;
  }

  return (
    <div className="ai-panel">
      {loading && (
        <div className="ai-loading">
          <div className="spinner"></div>
          <p>🤖 Thinking...</p>
        </div>
      )}

      {error && (
        <div className="ai-error">
          <p>⚠️ {error}</p>
        </div>
      )}

      {explanation && !loading && (
        <div className="ai-content">
          <h3>💡 Explanation</h3>
          <p className="explanation-text">{explanation}</p>
          {resources && resources.length > 0 && (
            <div className="resources-section">
              <h4>📚 Learning Resources</h4>
              <ul>
                {resources.map((resource, index) => (
                  <li key={index}>{resource}</li>
                ))}
              </ul>
            </div>
          )}
          <button className="clear-ai-btn" onClick={onClear}>
            Dismiss
          </button>
        </div>
      )}

      {resources && !explanation && !loading && (
        <div className="ai-content">
          <div className="concept-badge">{concept || 'Math Concept'}</div>
          <h3>📚 Learning Topics</h3>
          <ul className="resources-list">
            {resources.map((resource, index) => (
              <li key={index}>{resource}</li>
            ))}
          </ul>
          <button className="clear-ai-btn" onClick={onClear}>
            Dismiss
          </button>
        </div>
      )}
    </div>
  );
};
