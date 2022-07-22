import { useState, useEffect } from "react"
import "./main.scss"
import requests from "./utils/requests"
import DivisionDisplay from "./components/DivisionDisplay"
import mainLogeWhiteEdit from "./assets/MRCLOGO_VA.png"
import cnsLogoBlue from "./assets/CNS_FullColor_RGBBlue.png"
import NewsBustersLogo from "./assets/NB_FullColor_RGB.png"
import MRCTVLogo from "./assets/MRCTVStandard_Logo.png"

const App = () => {
  const [CNSrecords, setCNSrecords] = useState([])
  const [TVrecords, setTVrecords] = useState([])
  const [NBrecords, setNBrecords] = useState([])
  const [update, setUpdate] = useState(0)

  const NBalt = "News Busters Media Research Center Logo Reston, VA"
  const CNSalt = "CNS News Media Research Center Logo Reston, VA"
  const TValt = "MRC TV Media Research Center Logo Reston, VA"

  useEffect(() => {
    const getData = async () => {
      try {
        let response = await requests.getAll()
        console.log({ response })
        // requests.getAll()
        setNBrecords(response.data.NB)
        setCNSrecords(response.data.CNS)
        setTVrecords(response.data.TV)
      }
      catch (err) {
        console.error(err)
      }
    }
    getData()
  }, [update])

  setTimeout(() => {
    setUpdate(!update)

  }, 5000)

  return (
    <>
      <div className="main-imgWrapper">
        <img src={mainLogeWhiteEdit} alt="Main Media Research Center Logo Reston, VA" />
      </div>

      <div id="container">
        <div className="record-collection">
          <DivisionDisplay DivRecords={NBrecords} DivLogo={NewsBustersLogo} alt={NBalt} />
          <DivisionDisplay DivRecords={CNSrecords} DivLogo={cnsLogoBlue} alt={CNSalt} />
          <DivisionDisplay DivRecords={TVrecords} DivLogo={MRCTVLogo} alt={TValt} />
        </div>
      </div >
    </>
  )
}

export default App