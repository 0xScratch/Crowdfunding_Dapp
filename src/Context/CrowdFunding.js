import React, {useState, useEffect} from 'react'
import Web3Modal from 'web3modal'
import {ethers} from "ethers"

// INTERNAL IMPORT
import { CrowdFundingABI, CrowdFundingAddress } from './Constants'

// ---FETCHING SMART CONTRACT---  
const fetchContract = (signerOrProvider) => new ethers.Contract(CrowdFundingAddress, CrowdFundingABI, signerOrProvider)

export const CrowdFundingContext = React.createContext()

export const CrowdFundingProvider = ({children}) => {
    const titleData = "Crowd Funding Contract"
    const [currentAccount, setCurrentAccount] = useState("")

    const createCampaign = async (campaign) => {
        const {title, description, amount, deadline} = campaign
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.provider.Web3Provider(connection)
        const signer = provider.getSigner()
        const contract = fetchContract(signer)

        console.log(currentAccount)
        try {
            const transaction = await contract.createCampaign(
                currentAccount, // owner
                title, // title
                description, // description
                ethers.utils.parseUnits(amount, 18), // amount
                new Date(deadline).getTime() // deadline
            )

            await transaction.wait()

            console.log("contract call success", transaction)
        } catch (error) {
            console.log("contract call failed", error)
        }
    }
}