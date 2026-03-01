/**
 * Smoke tests: UsersPage — verifies the Users list page loads correctly.
 */
import { test, expect } from '../../fixtures';

test.describe( 'Users Page',() => {
  test.beforeEach(async ({usersPage}) => {
    await usersPage.goto();         
  })

  test('users page loads and shows Name column', async ({ usersPage }) => {
    await expect(usersPage.colName).toBeVisible();
    console.log('users page loads and shows Name column PASS successfully');
  });

  test('users page shows Email column', async ({ usersPage }) => {
    await expect(usersPage.colEmail).toBeVisible();
    console.log('users page shows Email column PASS successfully');
  });

  test('users page has name and email search inputs', async ({ usersPage }) => {
    await expect(usersPage.searchName).toBeVisible();
    await expect(usersPage.searchEmail).toBeVisible();
    console.log('users page has name and email search inputs PASS successfully');
  });

  test('users page URL is correct after goto', async ({ page }) => {
    await expect(page).toHaveURL(/partner\/users/);
    console.log('users page URL is correct after goto PASS successfully');
  });
}) 



