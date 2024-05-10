import {expect, type Locator, type Page} from '@playwright/test'

export class SearchPositions {
    readonly page: Page;
    constructor(page:Page){
        this.page = page;
    }
    async navigateToUrl(){
        await this.page.goto("https://www.tylertech.com/");
        // Assert the URL
        await this.page.getByRole('button', { name: 'Accept cookies' }).click();
    }

    async verifyJobOpeningButton(){
        await this.page.getByLabel('Find a Career').click();
        await this.page.getByRole('link', { name: 'Job Openings' }).isVisible();
        await this.page.getByRole('link', { name: 'Job Openings' }).click();
    }

    async searchQAPosition(){
        // Verify searchbar and search for a position
        await this.page.getByRole('combobox', { name: 'Search' }).fill('QA Engineer');
        await this.page.keyboard.press('Enter');
    }

    async clearSearchBar(){
        // Clear the search bar
        await this.page.getByRole('combobox', { name: 'Search' }).clear();
    }

    async searchNoneExistingPosition(){
        // Search for a none existing job posting
        await this.page.getByRole('combobox', { name: 'Search' }).fill('None exist');
        await this.page.keyboard.press('Enter');
    }

    async verifyHyperLink(){
        // Click hyperlink
        await this.page.getByRole('combobox', { name: 'Search' }).fill('QA');
        await this.page.keyboard.press('Enter');
        await this.page.getByLabel('QA Team Lead - Data & Insights Solutions (U.S. Only)').click()
        await this.page.getByRole('link', { name: 'Apply Online' }).isVisible();
    }
}
