import React, { useState } from "react";
import {
  useContractFunction,
  useCall,
  Sepolia
} from "@usedapp/core";

const Hero = ({ contract, account, chainId, switchNetwork }) => {
  const [campaign, setCampaign] = useState({
    title: "",
    description: "",
    amount: "",
    deadline: "",
  })

  // send and state hooks for createCampaign function
  const { send: createCampaignSend } = useContractFunction(
    contract,
    "createCampaign"
  );
  
  // createCampaign function
 const  createCampaign = async (event, campaign) => {
    event.preventDefault();

    try {
      if (chainId !== Sepolia.chainId) {
        switchNetwork(Sepolia.chainId);
      }

      const { title, description, amount, deadline } = campaign;

      const ethersAmount = ethers.utils.parseUnits(amount, 18);

      await createCampaignSend(
        account,
        title,
        description,
        ethersAmount,
        deadline
      );
    } catch (error) {
      console.log(error);
    }
  } 

  const createNewCampaign = async (e) => {
    e.preventDefault()
    try {
      await createCampaign(campaign)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="relative">
      <span className="coverLine"></span>
      <img 
        src="https://images.pexels.com/photos/3228766/pexels-photo-3228766.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260" 
        className="absolute inset-0 object-cover w-full h-full" 
        alt=""
      />
      <div className="relative bg-opacity-75 backgroundMain">
        <svg
          className="absolute inset-x-0 bottom-0 text-white"
          viewBox="0 0 1160 163"
        >
          <path
            fill="currentColor"
            d="M-164 13L-104 39.7C-44 66 76 120 196 141C316 162 436 152 556 119.7C676 88 796 34 916 13C1036 -8 1156 2 1216 7.7L1276 13V162.5H1216C1156 162.5 1036 162.5 916 162.5C796 162.5 676 162.5 556 162.5C436 162.5 316 162.5 196 162.5C76 162.5 -44 162.5 -104 162"
          />
        </svg>
        <div className="relative px-4 py-16 mx-auto overflow-hidden sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
          <div className="flex flex-col items-center justify-between xl:flex-row">
            <div className="w-full max-w-xl mb-12 xl:mb-0 xl:pr-16 xl:w-7/12">
              <h2 className="main-heading max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-white sm:text-5xl sm:leading-none">
                Blockchain FundHub <br className="hidden md:block"/>
                Crowdfunding Platform
              </h2>
              <p className="max-w-xl mb-4 text-base text-gray-200 md:text-lg">
                Welcome to Blockchain FundHub, the future of crowdfunding. We're revolutionizing the way you support causes you care about. By harnessing the power of blockchain technology, we provide an unparalleled level of transparency, security, and efficiency. Join us, and be a part of the crowdfunding revolution!!
              </p>
              <a 
                href="/"
                aria-label=""
                className="link-hover-effect inline-flex items-center font-semibold tracking-wider transition-colors duration-200 text-gray-200 hover:text-teal-accent-700 text-teal-accent-400"
              >
                Learn more
                <svg
                  className="inline-block w-3 ml-2"
                  fill="currentColor"
                  viewBox="0 0 12 12"
                >
                  <path 
                    d="M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z"
                  />
                </svg>
              </a>
            </div>
            <div className="w-full max-w-xl xl:px-8 xl:w-5/12">
              <div className="bg-white rounded shadow-2xl p-7 sm:p-10">
                <h3 className="mb-4 text-xl font-semibold sm:text-center sm:mb-6 sm:text-2xl">
                  Campaign
                </h3>
                <form action="">
                  <div className="mb-1 sm:mb-2">
                    <label 
                      htmlFor="firstName"
                      className="inline-block mb-1 font-medium"
                    >
                      Title
                    </label>
                    <input 
                      type="text" 
                      onChange={(e) => setCampaign({
                        ...campaign,
                        title: e.target.value
                      })}
                      placeholder="title"
                      required
                      className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                      id="firstName"
                      name="firstName"
                    />
                  </div>
                  <div className="mb-1 sm:mb-2">
                      <label 
                        htmlFor="lastName"
                        className="inline-block mb-1 font-medium"
                      >
                        Description
                      </label>
                      <input 
                        type="text" 
                        onChange={(e) => setCampaign({
                          ...campaign,
                          description: e.target.value
                        })}
                        placeholder="description"
                        required
                        className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                        id="lastName"
                        name="lastName"
                      />
                  </div>
                  <div className="mb-1 sm:mb-2">
                      <label 
                        htmlFor="email"
                        className="inline-block mb-1 font-medium"
                      >
                        Target Amount
                      </label>
                      <input 
                        type="text" 
                        onChange={(e) => setCampaign({
                          ...campaign,
                          amount: e.target.value
                        })}
                        placeholder="amount"
                        required
                        className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                        id="email"
                        name="email"
                      />
                  </div>
                  <div className="mb-1 sm:mb-2">
                      <label 
                        htmlFor=""
                        className="inline-block mb-1 font-medium"
                      >
                        Deadline
                      </label>
                      <input 
                        onChange={(e) => setCampaign({
                          ...campaign,
                          deadline: e.target.value
                        })}
                        placeholder="Date"
                        required
                        type="date"
                        className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                        id="date"
                        name="date"
                      />
                  </div>
                  <div className="mt-4 mb-2 sm:mb-4">
                      <button
                        onClick={(e) => createNewCampaign(e)}
                        type="submit"
                        className="campaign-button-hover-effect inline-flex items-center justify-center w-full h-12 px-6 font-bold tracking-wide transition duration-200 rounded shadow-md bg-pink-400 focus:shadow-outline focus:outline-none text-white"
                      >
                        Create Campaign
                      </button>
                  </div>
                  <p className="text-xs text-gray-600 sm:text-sm">
                      Create your Campaign to raise funds!
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Hero;