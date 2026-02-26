import profileRaw from '../data/profile.json' assert { type: 'json' };
import projectsRaw from '../data/projects.json' assert { type: 'json' };
import ProfileSchema from './profile.schema.js';
import ProjectsSchema from './projects.schema.js';

console.log('Validating profile.json...');
const profileResult = ProfileSchema.safeParse(profileRaw);
if (!profileResult.success) {
  console.error('❌ Profile validation failed:');
  console.error(JSON.stringify(profileResult.error.format(), null, 2));
  process.exit(1);
}
console.log('✅ profile.json is valid');
console.log(`   → ${profileResult.data.experience.length} experience entries`);
console.log(`   → ${profileResult.data.skills.technical.length} skill categories`);

console.log('\nValidating projects.json...');
const projectsResult = ProjectsSchema.safeParse(projectsRaw);
if (!projectsResult.success) {
  console.error('❌ Projects validation failed:');
  console.error(JSON.stringify(projectsResult.error.format(), null, 2));
  process.exit(1);
}
console.log('✅ projects.json is valid');
console.log(`   → ${projectsResult.data.projects.length} projects loaded`);

const projectIds = projectsResult.data.projects.map((p) => p.id);
console.log(`   → IDs: ${projectIds.join(', ')}`);
