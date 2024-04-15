/**
 * Switching plan and `contunue` button click handler script
 */

const SELECTED_PLAN_CLASS = 'selector_selected';

document.addEventListener('DOMContentLoaded', () => {
  let selectedPlan = 'yearly';

  const yearly = document.querySelector('#yearly-plan');
  const weekly = document.querySelector('#weekly-plan');
  const button = document.querySelector('.apply-plan-button');

  const transitionMap = {
    weekly: 'https://google.com',
    yearly: 'https://apple.com',
  };

  const elementsMap = {
    weekly,
    yearly,
  };

  const cleanSelection = () => {
    weekly.classList.remove(SELECTED_PLAN_CLASS);
    yearly.classList.remove(SELECTED_PLAN_CLASS);
  };
  
  const handlePlanSelection = (type) => () => {
    selectedPlan = type;
    cleanSelection();
    elementsMap[type].classList.add(SELECTED_PLAN_CLASS);
  };

  yearly.addEventListener('click', handlePlanSelection('yearly'));
  weekly.addEventListener('click', handlePlanSelection('weekly'));

  button.addEventListener('click', () => {
    window.location.href = transitionMap[selectedPlan];
  });

  // set default value
  handlePlanSelection(selectedPlan)();
});
