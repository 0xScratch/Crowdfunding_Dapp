"use client";

import React, { useEffect, useContext, useState } from "react";
import { Contract } from "ethers";
import { useEthers, useContractFunction, useCall } from "@usedapp/core";
import { CrowdFundingAddress, CrowdFundingABI } from "@/Context/Constants";

// INTERNAL IMPORT
import { CrowdFundingContext } from "../Context/CrowdFunding";
import { Hero, Card, PopUp } from "../components";

const index = () => {
  // Fetching Contract
  const crowdFundingContract = new Contract(
    CrowdFundingAddress,
    CrowdFundingABI
  );

  // fetching account, chainId and switchNetwork from useEthers
  const { account, chainId, switchNetwork } = useEthers();

  // getCampaigns function
  const getCampaigns = async () => {
    const campaigns = await useCall({
      crowdFundingContract,
      method: "getCampaigns",
      args: [],
    });

    const parsedCampaigns = campaigns.map((campaign, i) => ({
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      target: ethers.utils.formatEther(campaign.target.toString()),
      deadline: campaign.deadline.toNumber(),
      amountCollected: ethers.utils.formatEther(
        campaign.amountCollected.toString()
      ),
      pId: i,
    }));

    return parsedCampaigns;
  };

  // getUserCampaigns function
  const getUserCampaigns = async () => {
    const allCampaigns = await useCall({
      crowdFundingContract,
      method: "getUserCampaigns",
      args: [],
    });

    const currentUser = account;

    const filteredCampaigns = allCampaigns.filter(
      (campaign) => campaign.owner === currentUser
    );

    const userData = filteredCampaigns.map((campaign, i) => ({
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      target: ethers.utils.formatEther(campaign.target.toString()),
      deadline: campaign.deadline.toNumber(),
      amountCollected: ethers.utils.formatEther(
        campaign.amountCollected.toString()
      ),
      pId: i,
    }));

    return userData;
  };

  const [allCampaign, setAllCampaign] = useState();
  const [userCampaign, setUserCampaign] = useState();

  useEffect(() => {
    const getData = async () => {
      try {
        const getCampaignsData = await getCampaigns();
        const userCampaignsData = await getUserCampaigns();

        setAllCampaign(getCampaignsData);
        setUserCampaign(userCampaignsData);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  // DONATE POPUP MODEL
  const [openModel, setOpenModel] = useState(false);
  const [donateCampaign, setDonateCampaign] = useState();

  console.log(donateCampaign);
  return (
    <>
      <Hero createCampaign={createCampaign} />

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
  );
};

export default index;
