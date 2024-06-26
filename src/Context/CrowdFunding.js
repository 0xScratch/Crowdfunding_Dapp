// 'use client'

// import React, {useState, useEffect} from 'react'
// import { ethers } from "ethers"

// // INTERNAL IMPORT
// import { CrowdFundingABI, CrowdFundingAddress } from './Constants'

// // ---FETCHING SMART CONTRACT---  
// const fetchContract = (signerOrProvider) => new ethers.Contract(CrowdFundingAddress, CrowdFundingABI, signerOrProvider)

// export const CrowdFundingContext = React.createContext()

// export const CrowdFundingProvider = ({children}) => {
//     const titleData = "Crowd Funding Contract"
//     const [currentAccount, setCurrentAccount] = useState("")
//     const [provider, setProvider] = useState(null)
//     const [error, setError] = useState(null)

//     useEffect(() => {
//         if (typeof window !== 'undefined') {
//             setProvider(new ethers.providers.Web3Provider(window.ethereum))
//             checkIfWalletConnected()
//         }
//     }, [])

//     const createCampaign = async (campaign) => {
//         const {title, description, amount, deadline} = campaign
//         // if (typeof window !== "undefined") {
//         // const provider = new ethers.providers.Web3Provider(window.ethereum)
//         const signer = provider.getSigner()
//         const contract = fetchContract(signer)

//         console.log(currentAccount)
//         try {
//             const transaction = await contract.createCampaign(
//                 currentAccount, // owner
//                 title, // title
//                 description, // description
//                 ethers.utils.parseUnits(amount, 18), // amount
//                 new Date(deadline).getTime() // deadline
//             )

//             await transaction.wait()

//             console.log("contract call success", transaction)
//         } catch (error) {
//             console.log("contract call failed", error)
//         }
    
//     }

//     const getCampaigns = async () => {
//         const provider = new ethers.providers.JsonRpcProvider()
//         const contract = fetchContract(provider)

//         const campaigns = await contract.getCampaigns()

//         const parsedCampaigns = campaigns.map((campaign, i) => ({
//             owner: campaign.owner,
//             title: campaign.title,
//             description: campaign.description,
//             target: ethers.utils.formatEther(campaign.target.toString()),
//             deadline: campaign.deadline.toNumber(),
//             amountCollected: ethers.utils.formatEther(
//                 campaign.amountCollected.toString()
//             ),
//             pId: i,
//         }))

//         return parsedCampaigns
//     }

//     const getUserCampaigns = async () => {
//         const provider = new ethers.providers.JsonRpcProvider()
//         const contract = fetchContract(provider)

//         const allCampaigns = await contract.getCampaigns()

//         const accounts = await window.ethereum.request({
//             method: "eth_accounts",
//         })

//         const currentUser = accounts[0]

//         const filteredCampaigns = allCampaigns.filter(
//             (campaign) =>
//                 campaign.owner === currentUser
//         )

//         const userData = filteredCampaigns.map((campaign, i) => ({
//             owner: campaign.owner,
//             title: campaign.title,
//             description: campaign.description,
//             target: ethers.utils.formatEther(campaign.target.toString()),
//             deadline: campaign.deadline.toNumber(),
//             amountCollected: ethers.utils.formatEther(
//                 campaign.amountCollected.toString()
//             ),
//             pId: i,
//         }))

//         return userData
//     } 

//     const donate = async (pId, amount) => {
//         // if (typeof window !== "undefined") {
//         // const provider = new ethers.providers.Web3Provider(window.ethereum)
//         const signer = provider.getSigner()
//         const contract = fetchContract(signer)

//         const campaignData = await contract.donateToCampaign(pId, {
//             value: ethers.utils.parseEther(amount),
//         })
        
//         await campaignData.wait()
//         location.reload()

//         return campaignData
    
//     }

//     const getDonations = async (pId) => {
//         const provider = new ethers.providers.JsonRpcProvider()
//         const contract = fetchContract(provider)

//         const donations = await contract.getDonators(pId)
//         const numberOfDonations = donations[0].length

//         const parsedDonations = []

//         for(let i = 0; i < numberOfDonations; i++) {
//             parsedDonations.push({
//                 donator: donations[0][i],
//                 amount: ethers.utils.formatEther(donations[1][i].toString()),
//             })
//         }

//         return parsedDonations
//     }

//     // ---CHECK IF WALLET IS CONNECTED---
//     const checkIfWalletConnected = async () => {
//         try {
//             if (!window.ethereum) {
//                 setError("Install Metamask")
//                 return
//             }

//             const accounts = await window.ethereum.request({
//                 method: "eth_accounts",
//             })

//             if (accounts.length) {
//                 setCurrentAccount(accounts[0])
//             } else {
//                 console.log("No Account Found")
//             }
//         } catch (error) {
//             console.log("Something went wrong!")
//         }
//     }

//     useEffect(() => {
//         checkIfWalletConnected()
//     }, [])

//     // ---CONNECT WALLET FUNCTION---
//     const connectWallet = () => {
//         try {
//             if (window.ethereum){
//                 window.ethereum.request({method: 'eth_requestAccounts'}).then(result =>{
//                     accountChanged([result[0]]) 
                    
//                 })
//             } else{
//                 setErrorMsg('Please install metamask..')
//             }
//         } catch (error) {
//             console.log(error)
//         }
//     }

//     return (
//         <CrowdFundingContext.Provider
//             value={{
//                 titleData,
//                 currentAccount,
//                 createCampaign,
//                 getCampaigns,
//                 getUserCampaigns,
//                 donate,
//                 getDonations,
//                 connectWallet,
//             }}
//         >
//             {children}
//         </CrowdFundingContext.Provider>
//     )
// }