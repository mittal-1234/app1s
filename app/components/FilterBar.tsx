'use client';

interface FilterBarProps {
    onSearch: (value: string) => void;
    onLocationChange: (value: string) => void;
    onModeChange: (value: string) => void;
    onExperienceChange: (value: string) => void;
    onSourceChange: (value: string) => void;
    onSortChange: (value: string) => void;
}

export default function FilterBar({
    onSearch,
    onLocationChange,
    onModeChange,
    onExperienceChange,
    onSourceChange,
    onSortChange
}: FilterBarProps) {
    return (
        <div className="card" style={{ marginBottom: 'var(--space-4)', padding: 'var(--space-3)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-3)' }}>
                <div className="form-group">
                    <label>Search Jobs</label>
                    <input
                        type="text"
                        placeholder="Title or company..."
                        onChange={(e) => onSearch(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>Location</label>
                    <select onChange={(e) => onLocationChange(e.target.value)}>
                        <option value="">All Locations</option>
                        <option value="Bangalore">Bangalore</option>
                        <option value="Mumbai">Mumbai</option>
                        <option value="Pune">Pune</option>
                        <option value="Chennai">Chennai</option>
                        <option value="Gurgaon">Gurgaon</option>
                        <option value="Hyderabad">Hyderabad</option>
                        <option value="Noida">Noida</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Work Mode</label>
                    <select onChange={(e) => onModeChange(e.target.value)}>
                        <option value="">All Modes</option>
                        <option value="Remote">Remote</option>
                        <option value="Hybrid">Hybrid</option>
                        <option value="Onsite">Onsite</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Experience</label>
                    <select onChange={(e) => onExperienceChange(e.target.value)}>
                        <option value="">Any Experience</option>
                        <option value="Fresher">Fresher</option>
                        <option value="0-1">0-1 Years</option>
                        <option value="1-3">1-3 Years</option>
                        <option value="3-5">3-5 Years</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Source</label>
                    <select onChange={(e) => onSourceChange(e.target.value)}>
                        <option value="">All Sources</option>
                        <option value="LinkedIn">LinkedIn</option>
                        <option value="Naukri">Naukri</option>
                        <option value="Indeed">Indeed</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Sort By</label>
                    <select onChange={(e) => onSortChange(e.target.value)}>
                        <option value="match">Highest Match</option>
                        <option value="latest">Latest First</option>
                        <option value="oldest">Oldest First</option>
                        <option value="title">Title (A-Z)</option>
                    </select>
                </div>
            </div>
        </div>
    );
}
