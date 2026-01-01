# Fix Candidates and Results Page Data Loading Issue on Refresh

## Problem
- fetchCandidates() and fetchResults() functions are called before authentication token is properly set in axios headers
- This causes API calls to fail on page refresh

## Solution Steps
- [ ] Update askContext.js to ensure user state is loaded AND token is set in axios headers BEFORE any API calls can be made
- [ ] Add console logs to debug token loading sequence on refresh
- [ ] Update candidates page to wait for both authChecked AND user token validation before attempting to fetch data
- [ ] Update results page to wait for both authChecked AND user token validation before attempting to fetch data
- [ ] Add check that ensures axios Authorization header is present before making API calls
- [ ] Test the fix by refreshing the pages

## Files to Modify
- ask/lib/askContext.js
- ask/app/admin/candidates/page.jsx
- ask/app/admin/results/page.jsx
- ask/components/admin/ResultsManager.jsx
