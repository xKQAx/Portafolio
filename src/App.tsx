import { useSyncHtmlLang } from './hooks/useSyncHtmlLang'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { Hero } from './components/sections/Hero'
import { About } from './components/sections/About'
import { Process } from './components/sections/Process'
import { Experience } from './components/sections/Experience'
import { Projects } from './components/sections/Projects'
import { Skills } from './components/sections/Skills'
import { Contact } from './components/sections/Contact'
import { Demo } from './components/sections/Demo'
import './index.css'

function App() {
  useSyncHtmlLang()

  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Process />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
        <Demo />
      </main>
      <Footer />
    </>
  )
}

export default App
