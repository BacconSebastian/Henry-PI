import { Routes, Route } from "react-router-dom"
import Home from "./components/Home/Home"
import Countries from "./components/Countries/Countries"
import Activity from "./components/Activity/Activity"
import CountryDetail from "./components/CountryDetail/CountryDetail"

import './App.css'

const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/countries" element={<Countries/>} />
        <Route path="/countries/:countryId" element={<CountryDetail/>} />
        <Route path="/activities" element={<Activity/>}/>
      </Routes>
    </div>
  )
}

export default App