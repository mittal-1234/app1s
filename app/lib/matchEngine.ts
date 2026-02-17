import { Job } from './data';

export interface UserPreferences {
    keywords: string;
    location: string;
    mode: 'remote' | 'hybrid' | 'onsite' | '';
    experience: 'entry' | 'mid' | 'senior' | 'lead' | '';
}

export function calculateMatchScore(job: Job, prefs: UserPreferences): number {
    if (!prefs.keywords && !prefs.location && !prefs.mode && !prefs.experience) {
        return 0;
    }

    let score = 0;
    const weights = {
        keywords: 40,
        location: 20,
        mode: 20,
        experience: 20
    };

    // 1. Keyword Match (40%)
    if (prefs.keywords) {
        const userKeywords = prefs.keywords.toLowerCase().split(',').map(k => k.trim()).filter(k => k !== '');
        if (userKeywords.length > 0) {
            let keywordMatches = 0;
            const jobText = `${job.title} ${job.company} ${job.skills.join(' ')} ${job.description}`.toLowerCase();

            userKeywords.forEach(kw => {
                if (jobText.includes(kw)) {
                    keywordMatches++;
                }
            });

            const keywordScore = (keywordMatches / userKeywords.length) * weights.keywords;
            score += Math.min(keywordScore, weights.keywords); // Cap at weight
        }
    }

    // 2. Location Match (20%)
    if (prefs.location) {
        if (job.location.toLowerCase().includes(prefs.location.toLowerCase()) || job.mode === 'Remote') {
            score += weights.location;
        }
    } else {
        // If no location preference, we don't penalize, but we also don't boost
        // However, for discovery, we might want to assume general match
    }

    // 3. Mode Match (20%)
    if (prefs.mode) {
        if (job.mode.toLowerCase() === prefs.mode.toLowerCase()) {
            score += weights.mode;
        }
    }

    // 4. Experience Match (20%)
    if (prefs.experience) {
        const expMap: Record<string, string[]> = {
            'entry': ['Fresher', '0-1'],
            'mid': ['1-3'],
            'senior': ['3-5'],
            'lead': ['3-5'] // Assuming 3-5 covers lead in this dataset
        };

        if (expMap[prefs.experience]?.includes(job.experience)) {
            score += weights.experience;
        }
    }

    return Math.round(score);
}
