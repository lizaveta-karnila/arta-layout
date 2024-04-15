/**
 * Since there was no design for the desktop version,
 * I decided to hide the content and add an explanatory message.
 * To remove the blinking content, I added inline styles that remove
 * everything from the page and remove these styles in this file
 * when the content is loaded.
 * This decision affects SEO optimization of the page,
 * but the technical secification did not say anything about SEO :)
 */

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.no-desktop-version-warning').style.removeProperty('display');
  document.querySelector('.bg').style.removeProperty('display');
  document.querySelector('.content').style.removeProperty('display');
});
