import { execSync } from 'node:child_process'

const branchName = execSync('git symbolic-ref --quiet --short HEAD', {
  encoding: 'utf8',
  stdio: ['ignore', 'pipe', 'ignore'],
}).trim()

// Allowed:
// - main, develop
// - release/*, hotfix/*
// - feat/*, fix/*, chore/*, docs/*, refactor/*, test/*, ci/*, build/*, perf/*, revert/*
const branchPattern =
  /^(main|develop|release\/[a-z0-9._-]+|hotfix\/[a-z0-9._-]+|(feat|fix|chore|docs|refactor|test|ci|build|perf|revert)\/[a-z0-9._-]+)$/

if (!branchPattern.test(branchName)) {
  console.error(
    `Invalid branch name: "${branchName}"\n` +
      'Allowed examples: feat/login-page, fix/api-timeout, chore/update-deps, release/v1.2.0'
  )
  process.exit(1)
}

console.log(`Branch name OK: ${branchName}`)
