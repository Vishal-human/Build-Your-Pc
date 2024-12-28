document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    
    // Add loading state to button
    const addLoadingState = (button) => {
        const originalText = button.innerText;
        button.disabled = true;
        button.innerHTML = `
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Signing in...
        `;
        return originalText;
    };

    // Remove loading state from button
    const removeLoadingState = (button, originalText) => {
        button.disabled = false;
        button.innerText = originalText;
    };
    
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const remember = document.getElementById('remember').checked;
        const submitButton = loginForm.querySelector('button[type="submit"]');
        
        // Basic validation
        if (!email || !password) {
            // Add shake animation to form
            loginForm.classList.add('animate-shake');
            setTimeout(() => loginForm.classList.remove('animate-shake'), 500);
            return;
        }
        
        // Show loading state
        const originalText = addLoadingState(submitButton);
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Add your login logic here
            console.log('Login attempt:', { email, password, remember });
            
        } catch (error) {
            console.error('Login failed:', error);
        } finally {
            removeLoadingState(submitButton, originalText);
        }
    });

    // Add input focus effects
    const inputs = document.querySelectorAll('input[type="email"], input[type="password"]');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('ring-2', 'ring-blue-400/20');
        });
        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('ring-2', 'ring-blue-400/20');
        });
    });
});