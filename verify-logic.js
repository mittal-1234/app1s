
const { calculateMatchScore } = require('./app/lib/matchEngine');

const testJob = {
    title: 'Senior React Developer',
    description: 'We are looking for a Senior React Developer to join our team. Familiarity with Node.js is a plus.',
    location: 'Bangalore',
    mode: 'Remote',
    experience: '3-5',
    skills: ['React', 'TypeScript', 'Node'],
    source: 'LinkedIn',
    postedDaysAgo: 1
};

const testPrefs = {
    roleKeywords: 'React, Developer',
    preferredLocations: ['Bangalore', 'Remote'],
    preferredMode: ['Remote'],
    experienceLevel: 'senior',
    skills: 'TypeScript, React',
    minMatchScore: 40
};

// Expected:
// +25 Title ('React' in 'Senior React Developer')
// +15 Desc ('React' in description)
// +15 Location ('Bangalore' in 'Bangalore')
// +10 Mode ('Remote' === 'Remote')
// +10 Experience ('senior' maps to '3-5')
// +15 Skills ('TypeScript' in ['React', 'TypeScript', 'Node'])
// +5 Recency (postedDaysAgo 1 <= 2)
// +5 Channel (Source LinkedIn)
// Total: 100

const score = calculateMatchScore(testJob, testPrefs);
console.log(`Test Case 1 Score: ${score}/100`);

if (score === 100) {
    console.log('SUCCESS: Deterministic scoring logic verified.');
} else {
    console.error(`FAILURE: Expected 100, got ${score}`);
    process.exit(1);
}
