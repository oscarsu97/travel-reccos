import { useState } from 'react';
import StartScreen from './components/StartScreen';
import CardView from './components/CardView';
import SummaryScreen from './components/SummaryScreen';
import { activities } from './data/activities';

function App() {
  const [screen, setScreen] = useState('start'); // 'start', 'cards', 'summary'
  const [testerName, setTesterName] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [results, setResults] = useState([]);

  const startSession = (name) => {
    setTesterName(name);
    setCurrentIndex(0);
    setResults([]);
    setScreen('cards');
  };

  const handleAction = (status, feedback) => {
    const currentActivity = activities[currentIndex];
    
    // Store both likes and passes with feedback
    const result = {
      activity: currentActivity,
      status: status,
      feedback: feedback
    };

    setResults([...results, result]);

    if (currentIndex < activities.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setScreen('summary');
    }
  };

  const resetSession = () => {
    setTesterName('');
    setCurrentIndex(0);
    setResults([]);
    setScreen('start');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {screen === 'start' && <StartScreen onStart={startSession} />}
      {screen === 'cards' && (
        <CardView
          activity={activities[currentIndex]}
          currentIndex={currentIndex}
          totalCount={activities.length}
          onAction={handleAction}
        />
      )}
      {screen === 'summary' && (
        <SummaryScreen
          testerName={testerName}
          likedActivities={results}
          onReset={resetSession}
        />
      )}
    </div>
  );
}

export default App;
