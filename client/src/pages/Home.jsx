import React, { useContext, useEffect } from 'react'
import Header from '../components/Header'
import Steps from '../components/Steps'
import BgSlider from '../components/BgSlider'
import Testimonials from '../components/Testimonials'
import Upload from '../components/Upload'
import { AppContext } from '../context/AppContext'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useAuth } from '@clerk/react'
import { toast } from 'react-toastify'
import axios from 'axios'

const Home = () => {
  const { backendUrl, loadCreditsData } = useContext(AppContext)
  const { getToken } = useAuth()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    const verifyAndUpdateCredits = async () => {
      const sessionId = searchParams.get('session_id')
      if (sessionId) {
        try {
          const token = await getToken()
          const { data } = await axios.post(backendUrl + '/api/user/verify-payment', { sessionId }, { headers: { token } })
          if (data.success) {
            toast.success('Credits added successfully!')
            loadCreditsData()
          } else {
            toast.error(data.message)
          }
        } catch (error) {
          console.log(error)
          toast.error(error.message)
        } finally {
          navigate('/', { replace: true })
        }
      }
    }
    verifyAndUpdateCredits()
  }, [searchParams, backendUrl, getToken, navigate, loadCreditsData])

  return (
    <div>
      <Header />
      <Steps />
      <BgSlider />
      <Testimonials />
      <Upload />
    </div>
  )
}

export default Home
