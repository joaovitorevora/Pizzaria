 // Função para mostrar o formulário correspondente e ocultar os outros
 function showForm(formId) {
    const forms = document.querySelectorAll('section');
    forms.forEach(form => {
        if (form.id === formId) {
            form.classList.remove('hidden');
        } else {
            form.classList.add('hidden');
        }
    });
}