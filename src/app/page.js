'use client'

import React, { useEffect, useContext, useState } from 'react'

// INTERNAL IMPORT
import { CrowdFundingContext } from '@/Context/CrowdFunding'
import { Hero, Card, PopUp } from '../components'

const index = () => {
  const {
    titleData,
    getCampaigns,
    createCampaign,
    donate,
    getUserCampaigns,
    getDonations,
  } = useContext(CrowdFundingContext)
  
  const [allCampaign, setAllCampaign] = useState()
  const [userCampaign, setUserCampaign] = useState()
  
  useEffect(() => {
    const getCampaignsData = async () => {
      try {
        const data = await getCampaigns()
        setAllCampaign(data)
      } catch (error) {
        console.log(error)
      }
    }

    getCampaignsData()
  //   const userCampaignsData = getUserCampaigns()
  //   return async () => {
  //     const allData = await getCampaignsData
  //     const userData = await userCampaignsData
  //     setAllCampaign(allData)
  //     setUserCampaign(userData)
    // }
  }, [])
  
  // // DONATE POPUP MODEL
  // const [openModel, setOpenModel] = useState(false)
  // const [donateCampaign, setDonateCampaign] = useState()
  
  // console.log(donateCampaign)
  return (
    <>
    </>
  )
}
      /* <Hero titleData={titleData} createCampaign={createCampaign}/>

      <Card
        title="All Listed Campaign"
        allcampaign={allCampaign}
        setOpenModel={setOpenModel}
        setDonate={setDonateCampaign}
        />

      <Card 
        title="Your Created Campaign"
        allcampaign={userCampaign}
        setOpenModel={setOpenModel}
        setDonate={setDonateCampaign}
        />

      {openModel && (
        <PopUp
        setOpenModel={setOpenModel}
        getDonations={getDonations}
        donate={donateCampaign}
        donateFunction={donate}
        />
        )}
    </>
  )
} */

export default index