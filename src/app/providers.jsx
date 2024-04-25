'use client'

import { DAppProvider, Sepolia } from "@usedapp/core"

const config = {
    readOnlyChainId: Sepolia.chainId,
    readOnlyUrls: {
        [Sepolia.chainId]: process.env.NEXT_PUBLIC_HTTPS
    },
    networks: [Sepolia],
}

export function Providers({children}) {
    return (
        <DAppProvider config={config}>
            {children}
        </DAppProvider>
    )
}