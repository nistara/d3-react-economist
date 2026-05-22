import { useState } from 'react'
import { ChartStudio } from './ChartStudio'
import { EconomistChart } from './EconomistChart'
import './App.css'

const tabs = [
  { id: 'walkthrough', label: 'Chart walkthrough' },
  { id: 'studio', label: 'Chart studio' },
]

function App() {
  const [activeTab, setActiveTab] = useState('walkthrough')

  return (
    <main>
      <nav className="tabs" aria-label="Chart app views">
        {tabs.map((tab) => (
          <button
            aria-current={activeTab === tab.id ? 'page' : undefined}
            className={activeTab === tab.id ? 'active-tab' : ''}
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {activeTab === 'walkthrough' ? <EconomistChart /> : <ChartStudio />}
    </main>
  )
}

export default App
