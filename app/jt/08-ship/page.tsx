'use client';

import { useState, useEffect } from 'react';
import ContextHeader from '../../components/ContextHeader';
import SecondaryPanel from '../../components/SecondaryPanel';
import Link from 'next/link';

export default function ShipPage() {
    const [isLocked, setIsLocked] = useState(true);

    useEffect(() => {
        const saved = localStorage.getItem('jobTrackerTestStatus');
        if (saved) {
            const parsed = JSON.parse(saved);
            const passedCount = Object.values(parsed).filter(Boolean).length;
            if (passedCount === 10) {
                setIsLocked(false);
            }
        }
    }, []);

    if (isLocked) {
        return (
            <div className="main-content">
                <ContextHeader
                    title="Ship Project"
                    subtitle="Final deployment gateway."
                />
                <div className="workspace-container">
                    <div className="primary-workspace">
                        <div className="card card-lg" style={{ textAlign: 'center', padding: '60px 40px' }}>
                            <div style={{ fontSize: '48px', marginBottom: '20px' }}>🔒</div>
                            <h2 style={{ marginBottom: '16px' }}>Deployment Locked</h2>
                            <p className="text-muted" style={{ maxWidth: '500px', margin: '0 auto 30px' }}>
                                You cannot access the shipping station until all 10 verification tests have been passed. This ensures system integrity before release.
                            </p>
                            <Link href="/jt/07-test" className="btn btn-primary">
                                Go to Verification Checklist
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="main-content">
            <ContextHeader
                title="Ship Project"
                subtitle="Ready for liftoff."
            />
            <div className="workspace-container">
                <div className="primary-workspace">
                    <div className="card card-lg" style={{ textAlign: 'center', padding: '60px 40px', backgroundColor: '#F0FDF4', borderColor: '#BBF7D0' }}>
                        <div style={{ fontSize: '48px', marginBottom: '20px' }}>🚀</div>
                        <h2 style={{ marginBottom: '16px', color: '#166534' }}>System Verified & Ready</h2>
                        <p style={{ maxWidth: '500px', margin: '0 auto 30px', color: '#15803d' }}>
                            All systems are go. The application has passed all verification checks and is ready for production use.
                        </p>
                        <div className="badge badge-shipped" style={{ fontSize: '16px', padding: '8px 16px' }}>
                            STATUS: REVIEWED
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
