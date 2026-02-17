'use client';

import { useState } from 'react';
import TopBar from './components/TopBar';
import ProofFooter from './components/ProofFooter';

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [proofItems, setProofItems] = useState([
        { label: 'UI Built', checked: true },
        { label: 'Logic Working', checked: true },
        { label: 'Test Passed', checked: true },
        { label: 'Deployed', checked: true }
    ]);

    const handleProofChange = (index: number, checked: boolean) => {
        const newItems = [...proofItems];
        newItems[index].checked = checked;
        setProofItems(newItems);
    };

    return (
        <>
            <TopBar
                projectName="KodNest Premium"
                currentStep={1}
                totalSteps={8}
                status="in-progress"
            />

            {children}

            <ProofFooter
                items={proofItems.map((item, index) => ({
                    ...item,
                    onChange: (checked) => handleProofChange(index, checked)
                }))}
            />
        </>
    );
}
