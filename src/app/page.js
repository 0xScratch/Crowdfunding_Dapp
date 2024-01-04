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
    const getData = async () => {
      try {
        const getCampaignsData = await getCampaigns()
        const userCampaignsData = await getUserCampaigns()

        setAllCampaign(getCampaignsData)
        setUserCampaign(userCampaignsData)
      } catch (error) {
        console.log(error)
      }
    }

    getData()
  }, [])
  
  // DONATE POPUP MODEL
  const [openModel, setOpenModel] = useState(false)
  const [donateCampaign, setDonateCampaign] = useState()
  
  console.log(donateCampaign)
  return (
    <>
      <Hero titleData={titleData} createCampaign={createCampaign}/>

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
}

export default index