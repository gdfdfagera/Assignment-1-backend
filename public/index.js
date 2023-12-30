document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('bmiForm');
  const bmiElement = document.getElementById('bmi');
  const categoryElement = document.getElementById('bmiCategory');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(form);

    try {
      const response = await fetch('/BMI', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(Object.fromEntries(formData)),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();

      bmiElement.textContent = `Your BMI: ${result.bmi}`;
      categoryElement.textContent = `${result.category}`;
      categoryElement.classList.remove('underweight', 'normal', 'overweight');

      switch (result.category.toLowerCase()) {
        case 'underweight':
          categoryElement.classList.add('underweight');
          break;
        case 'normal weight':
          categoryElement.classList.add('normal');
          break;
        case 'overweight':
          categoryElement.classList.add('overweight');
          break;
        default:
          break;
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  });
});
