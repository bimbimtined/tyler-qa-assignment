import {expect, type Locator, type Page} from '@playwright/test'

export class GeneralInformation {
    readonly page: Page;
    constructor(page:Page){
        this.page = page;
    }
    async scrollToBottom(){
        const scrollY = await this.page.evaluate(() => document.body.scrollHeight);
        await this.page.mouse.wheel(0, scrollY);
    }

    async verifyJuryManagement(){
        await this.page.getByRole('link', { name: 'Jury Management' }).isVisible();
        await this.page.getByRole('link', { name: 'Jury Management' }).click();
    }

    async verifyGetInTouch(){
        await this.page.getByText('Get in Touch').isVisible();
        await this.page.getByText('Get in Touch').click();
    }

    async selectAnInquiry(){
        await this.page.getByLabel('*How can we help?').isVisible();
        await this.page.getByLabel('*How can we help?').selectOption("I'm Interested in talking to a sales representative")
    }

    async enterCustomerInfo(){
        await this.page.getByLabel('*First Name:').fill('John')
        await this.page.getByLabel('*Last Name:').fill('Doe')
        await this.page.getByLabel('*Email:').fill('test@gmail.com')
        await this.page.getByLabel('*Job Title:').fill('QA')
        await this.page.getByLabel('*Organization Name:').fill('XYC Company')
        await this.page.getByLabel('*Country:').selectOption('United States')
        await this.page.getByLabel('*State/Territory:').selectOption('AK')
        await this.page.getByLabel('*Tell us more about your').fill('Test')
        await this.page.getByRole('button', { name: 'Submit' }).isEnabled()
    }
}
