import { Job } from './data';

export interface UserPreferences {
    roleKeywords: string;
    preferredLocations: string[];
    preferredMode: string[];
    experienceLevel: string;
    skills: string;
    minMatchScore: number;
}

export function calculateMatchScore(job: Job, prefs: UserPreferences): number {
    let score = 0;

    // 1. Title Match (+25)
    if (prefs.roleKeywords) {
        const keywords = prefs.roleKeywords.toLowerCase().split(',').map(k => k.trim()).filter(k => k !== '');
        if (keywords.some(kw => job.title.toLowerCase().includes(kw))) {
            score += 25;
        }
    }

    // 2. Description Match (+15)
    if (prefs.roleKeywords) {
        const keywords = prefs.roleKeywords.toLowerCase().split(',').map(k => k.trim()).filter(k => k !== '');
        if (keywords.some(kw => job.description.toLowerCase().includes(kw))) {
            score += 15;
        }
    }

    // 3. Location Match (+15)
    if (prefs.preferredLocations && prefs.preferredLocations.length > 0) {
        if (prefs.preferredLocations.some(loc => job.location.toLowerCase().includes(loc.toLowerCase()))) {
            score += 15;
        }
    }

    // 4. Mode Match (+10)
    if (prefs.preferredMode && prefs.preferredMode.length > 0) {
        if (prefs.preferredMode.some(mode => job.mode.toLowerCase() === mode.toLowerCase())) {
            score += 10;
        }
    }

    // 5. Experience Match (+10)
    if (prefs.experienceLevel) {
        const expMap: Record<string, string[]> = {
            'entry': ['Fresher', '0-1'],
            'mid': ['1-3'],
            'senior': ['3-5'],
            'lead': ['3-5']
        };
        if (expMap[prefs.experienceLevel]?.includes(job.experience)) {
            score += 10;
        }
    }

    // 6. Skills Overlap (+15)
    if (prefs.skills) {
        const userSkills = prefs.skills.toLowerCase().split(',').map(s => s.trim()).filter(s => s !== '');
        const jobSkills = job.skills.map(s => s.toLowerCase());
        if (userSkills.some(us => jobSkills.includes(us))) {
            score += 15;
        }
    }

    // 7. Recency (+5)
    if (job.postedDaysAgo <= 2) {
        score += 5;
    }

    // 8. Channel Boost (+5)
    if (job.source === 'LinkedIn') {
        score += 5;
    }

    return Math.min(100, Math.round(score));
}
