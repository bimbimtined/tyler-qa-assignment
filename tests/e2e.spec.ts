import { test, expect } from '@playwright/test';
import { SearchPositions } from '../page-objects/search-positions';
import { GeneralInformation } from '../page-objects/general-information';

test.beforeEach('TC_01_Navigate to Tyler Tech Website', async ({ page }) => {
  const searchPositions = new SearchPositions(page)
  await searchPositions.navigateToUrl()
  // Assert the URL
  await expect.soft(page).toHaveURL('https://www.tylertech.com/')
});

test('TC_Search for open position', async ({ page }) => {
  // Verify search bar
  const jobOpening = new SearchPositions(page)
  await jobOpening.verifyJobOpeningButton()
  expect(page.getByRole('combobox', { name: 'Search' }).isVisible())

  // Search for a QA position
  const searchQAPosition = new SearchPositions(page)
  await searchQAPosition.searchQAPosition()
  await expect(page.getByLabel('QA Engineer, Tyler Jury')).toBeVisible()

  // Clear search 
  const clearSearch = new SearchPositions(page)
  await clearSearch.clearSearchBar()

  // Search for a none existing job posting
  const searchnoneExistingPosition = new SearchPositions(page)
  await searchnoneExistingPosition.searchNoneExistingPosition()
  await expect(page.getByText('No results for None exist')).toBeVisible()
  await clearSearch.clearSearchBar()

  // Click the hyperlink 
  const hyperlink = new SearchPositions(page)
  await hyperlink.verifyHyperLink()

  //Assert URL
  await expect(page).toHaveURL('https://www.tylertech.com/careers/job-listings/qa-team-lead-data-insights-solutions-24-18940-01')
});

test('TC_Verify general information', async ({ page }) => {
  // Scroll to bottom
  const scroll = new GeneralInformation(page)
  await scroll.scrollToBottom()

  // Verify jury management
  const juryManagement = new GeneralInformation(page)
  await juryManagement.verifyJuryManagement()
  await expect(page.getByText('Get in Touch')).toBeVisible()

  // Verify get in touch
  const getInTouch = new GeneralInformation(page)
  await getInTouch.verifyGetInTouch()
  await expect(page.getByText('*How can we help?')).toBeVisible()

  // Select an inquiry
  const form = new GeneralInformation(page)
  await form.selectAnInquiry()

  // Enter customer info
  const info = new GeneralInformation(page)
  await info.enterCustomerInfo()
  await expect(page.getByText('*By checking this box, I')).toBeVisible()
});
