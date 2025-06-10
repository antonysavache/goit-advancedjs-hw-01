// Оголошуємо об'єкт formData поза будь-якими функціями
const formData = { email: "", message: "" };

// Ключ для зберігання в localStorage
const STORAGE_KEY = "feedback-form-state";

// Знаходимо форму
const form = document.querySelector('.feedback-form');

// Функція для збереження даних в localStorage
function saveToLocalStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

// Функція для завантаження даних з localStorage
function loadFromLocalStorage() {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      formData.email = parsedData.email || "";
      formData.message = parsedData.message || "";
      
      // Заповнюємо поля форми збереженими даними
      form.elements.email.value = formData.email;
      form.elements.message.value = formData.message;
    }
  } catch (error) {
    console.error('Error loading data from localStorage:', error);
  }
}

// Обробник подій input (використовуємо делегування)
function onFormInput(event) {
  const { name, value } = event.target;
  
  // Оновлюємо formData та зберігаємо в localStorage
  if (name === 'email' || name === 'message') {
    formData[name] = value.trim();
    saveToLocalStorage();
  }
}

// Обробник submit форми
function onFormSubmit(event) {
  event.preventDefault();
  
  // Перевіряємо, чи заповнені всі поля
  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }
  
  // Виводимо дані в консоль
  console.log(formData);
  
  // Очищаємо localStorage, formData та поля форми
  localStorage.removeItem(STORAGE_KEY);
  formData.email = "";
  formData.message = "";
  form.reset();
}

// Додаємо слухачі подій
form.addEventListener('input', onFormInput);
form.addEventListener('submit', onFormSubmit);

// Завантажуємо дані при завантаженні сторінки
loadFromLocalStorage();
