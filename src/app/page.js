"use client";

import React, { useEffect, useState } from "react";
import { Contract } from "ethers";
import {
  useEthers,
  useContractFunction,
  useCall,
  Sepolia,
} from "@usedapp/core";

import { CrowdFundingAddress, CrowdFundingABI } from "@/Context/Constants";

// INTERNAL IMPORT
import { Hero, Card, PopUp } from "../components";

const index = () => {
  // Fetching Contract
  const crowdFundingContract = new Contract(
    CrowdFundingAddress,
    CrowdFundingABI
  );

  // fetching account, chainId and switchNetwork from useEthers
  const { account, chainId, switchNetwork } = useEthers(); 

  const { send: donateSend } = useContractFunction(
    crowdFundingContract,
    "donateToCampaign"
  );

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

  // donate function
  const donate = async (event, pId, amount) => {
    event.preventDefault();

    try {
      if (chainId !== Sepolia.chainId) {
        switchNetwork(Sepolia.chainId);
      }

      const ethersAmount = ethers.utils.parseEther(amount);

      await donateSend(pId, { value: ethersAmount });
    } catch (error) {
      console.log(error);
    }
  };

  // getDonations function
  const getDonations = async (pId) => {
    const donations = await useCall({
      crowdFundingContract,
      method: "getDonators",
      args: [pId],
    });

    const numberOfDonations = donations[0].length;

    const parsedDonations = [];

    for (let i = 0; i < numberOfDonations; i++) {
      parsedDonations.push({
        donator: donations[0][i],
        amount: ethers.utils.formatEther(donations[1][i].toString()),
      });
    }

    return parsedDonations;
  };

  const [allCampaign, setAllCampaign] = useState();
  const [userCampaign, setUserCampaign] = useState();

  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       const getCampaignsData = await getCampaigns();
  //       const userCampaignsData = await getUserCampaigns();

  //       setAllCampaign(getCampaignsData);
  //       setUserCampaign(userCampaignsData);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   getData();
  // }, []);

  // DONATE POPUP MODEL
  const [openModel, setOpenModel] = useState(false);
  const [donateCampaign, setDonateCampaign] = useState();

  // console.log(donateCampaign);
  return (
    <>
      <Hero 
        createCampaign={createCampaign} 
        contract={crowdFundingContract} 
        account={account}
        chainId={chainId}
        switchNetwork={switchNetwork}
      />

      <Card
        title="All Listed Campaigns"
        allcampaign={allCampaign}
        setOpenModel={setOpenModel}
        setDonate={setDonateCampaign}
      />

      <Card
        title="Your Created Campaigns"
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
