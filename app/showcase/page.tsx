'use client';

import { useState } from 'react';
import TopBar from '../components/TopBar';
import ContextHeader from '../components/ContextHeader';
import SecondaryPanel from '../components/SecondaryPanel';
import ProofFooter from '../components/ProofFooter';

export default function ShowcasePage() {
    const [proofItems, setProofItems] = useState([
        { label: 'UI Built', checked: false },
        { label: 'Logic Working', checked: false },
        { label: 'Test Passed', checked: false },
        { label: 'Deployed', checked: false }
    ]);

    const handleProofChange = (index: number, checked: boolean) => {
        const newItems = [...proofItems];
        newItems[index].checked = checked;
        setProofItems(newItems);
    };

    return (
        <>
            <TopBar
                projectName="KodNest Design System"
                currentStep={1}
                totalSteps={8}
                status="in-progress"
            />

            <div className="main-content">
                <ContextHeader
                    title="Design System Showcase"
                    subtitle="KodNest Premium Build System — Calm, Intentional, Coherent, Confident"
                />

                <div className="workspace-container">
                    <div className="primary-workspace">
                        {/* Color System */}
                        <section className="card card-lg mb-4">
                            <h2>Color System</h2>
                            <p style={{ fontSize: 'var(--text-sm)', color: '#666', marginBottom: 'var(--space-3)' }}>
                                Maximum 4 colors. No gradients, no flashy effects.
                            </p>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-3)' }}>
                                <div>
                                    <div style={{
                                        background: '#F7F6F3',
                                        border: '1px solid #E5E3DD',
                                        height: '80px',
                                        borderRadius: 'var(--radius)',
                                        marginBottom: 'var(--space-2)'
                                    }} />
                                    <div style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}>Background</div>
                                    <div style={{ fontSize: 'var(--text-xs)', color: '#666' }}>#F7F6F3</div>
                                </div>
                                <div>
                                    <div style={{
                                        background: '#8B0000',
                                        height: '80px',
                                        borderRadius: 'var(--radius)',
                                        marginBottom: 'var(--space-2)'
                                    }} />
                                    <div style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}>Accent</div>
                                    <div style={{ fontSize: 'var(--text-xs)', color: '#666' }}>#8B0000</div>
                                </div>
                                <div>
                                    <div style={{
                                        background: '#2D5016',
                                        height: '80px',
                                        borderRadius: 'var(--radius)',
                                        marginBottom: 'var(--space-2)'
                                    }} />
                                    <div style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}>Success</div>
                                    <div style={{ fontSize: 'var(--text-xs)', color: '#666' }}>#2D5016</div>
                                </div>
                                <div>
                                    <div style={{
                                        background: '#92400E',
                                        height: '80px',
                                        borderRadius: 'var(--radius)',
                                        marginBottom: 'var(--space-2)'
                                    }} />
                                    <div style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}>Warning</div>
                                    <div style={{ fontSize: 'var(--text-xs)', color: '#666' }}>#92400E</div>
                                </div>
                            </div>
                        </section>

                        {/* Typography */}
                        <section className="card card-lg mb-4">
                            <h2>Typography</h2>
                            <p style={{ fontSize: 'var(--text-sm)', color: '#666', marginBottom: 'var(--space-4)' }}>
                                Serif for headings (Crimson Text), sans-serif for body (Inter)
                            </p>

                            <h1 style={{ marginBottom: 'var(--space-2)' }}>Heading 1 — Large Serif</h1>
                            <h2 style={{ marginBottom: 'var(--space-2)' }}>Heading 2 — Medium Serif</h2>
                            <h3 style={{ marginBottom: 'var(--space-3)' }}>Heading 3 — Small Serif</h3>

                            <p style={{ fontSize: 'var(--text-lg)' }}>
                                Large body text (18px). Clear hierarchy, generous line-height, maximum 720px width for optimal readability.
                            </p>
                            <p>
                                Base body text (16px). This is the default for most content. Line-height is 1.6-1.8 for comfortable reading.
                            </p>
                            <p style={{ fontSize: 'var(--text-sm)', color: '#666' }}>
                                Small text (14px). Used for secondary information, labels, and metadata.
                            </p>
                        </section>

                        {/* Spacing System */}
                        <section className="card card-lg mb-4">
                            <h2>Spacing System</h2>
                            <p style={{ fontSize: 'var(--text-sm)', color: '#666', marginBottom: 'var(--space-3)' }}>
                                Strict scale: 8px, 16px, 24px, 40px, 64px. Never use random values.
                            </p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                                    <div style={{ width: '8px', height: '8px', background: 'var(--color-accent)' }} />
                                    <span style={{ fontSize: 'var(--text-sm)' }}>8px (--space-1)</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                                    <div style={{ width: '16px', height: '16px', background: 'var(--color-accent)' }} />
                                    <span style={{ fontSize: 'var(--text-sm)' }}>16px (--space-2)</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                                    <div style={{ width: '24px', height: '24px', background: 'var(--color-accent)' }} />
                                    <span style={{ fontSize: 'var(--text-sm)' }}>24px (--space-3)</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                                    <div style={{ width: '40px', height: '40px', background: 'var(--color-accent)' }} />
                                    <span style={{ fontSize: 'var(--text-sm)' }}>40px (--space-4)</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                                    <div style={{ width: '64px', height: '64px', background: 'var(--color-accent)' }} />
                                    <span style={{ fontSize: 'var(--text-sm)' }}>64px (--space-5)</span>
                                </div>
                            </div>
                        </section>

                        {/* Buttons */}
                        <section className="card card-lg mb-4">
                            <h2>Buttons</h2>
                            <p style={{ fontSize: 'var(--text-sm)', color: '#666', marginBottom: 'var(--space-3)' }}>
                                Consistent styling, predictable hover states, same border radius everywhere.
                            </p>
                            <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
                                <button className="btn btn-primary">Primary Button</button>
                                <button className="btn btn-secondary">Secondary Button</button>
                            </div>
                        </section>

                        {/* Inputs */}
                        <section className="card card-lg mb-4">
                            <h2>Input Fields</h2>
                            <p style={{ fontSize: 'var(--text-sm)', color: '#666', marginBottom: 'var(--space-3)' }}>
                                Clean borders, clear focus states, no heavy shadows.
                            </p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', maxWidth: '400px' }}>
                                <input type="text" placeholder="Text input" />
                                <input type="email" placeholder="Email input" />
                                <textarea placeholder="Textarea input" rows={4} />
                            </div>
                        </section>

                        {/* Badges */}
                        <section className="card card-lg mb-4">
                            <h2>Status Badges</h2>
                            <p style={{ fontSize: 'var(--text-sm)', color: '#666', marginBottom: 'var(--space-3)' }}>
                                Small, uppercase, subtle styling for status indicators.
                            </p>
                            <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
                                <span className="badge badge-not-started">Not Started</span>
                                <span className="badge badge-in-progress">In Progress</span>
                                <span className="badge badge-shipped">Shipped</span>
                            </div>
                        </section>

                        {/* Cards */}
                        <section className="card card-lg mb-5">
                            <h2>Card Components</h2>
                            <p style={{ fontSize: 'var(--text-sm)', color: '#666', marginBottom: 'var(--space-3)' }}>
                                Subtle borders, no drop shadows, balanced padding.
                            </p>
                            <div style={{ display: 'grid', gap: 'var(--space-3)' }}>
                                <div className="card">
                                    <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-lg)', marginBottom: 'var(--space-2)' }}>
                                        Default Card
                                    </h3>
                                    <p style={{ fontSize: 'var(--text-sm)', margin: 0 }}>
                                        Standard card with 24px padding, subtle border, clean background.
                                    </p>
                                </div>
                                <div className="card card-lg">
                                    <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-lg)', marginBottom: 'var(--space-2)' }}>
                                        Large Card
                                    </h3>
                                    <p style={{ fontSize: 'var(--text-sm)', margin: 0 }}>
                                        Larger card with 40px padding for more spacious content areas.
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>

                    <SecondaryPanel
                        title="About This System"
                        description="The KodNest Premium Build System is designed with calm intention. Every element follows strict rules: limited colors, consistent spacing, unified components."
                        prompt="Design Philosophy: Calm, Intentional, Coherent, Confident"
                        onCopy={() => alert('Prompt copied!')}
                        onBuild={() => alert('Opening in Lovable...')}
                        onSuccess={() => alert('Marked as successful!')}
                        onError={() => alert('Reported error')}
                    />
                </div>
            </div>

            <ProofFooter
                items={proofItems.map((item, index) => ({
                    ...item,
                    onChange: (checked) => handleProofChange(index, checked)
                }))}
            />
        </>
    );
}
