function calculate() {
            // Get input values
            const principal = parseFloat(document.getElementById('principal').value);
            const rate = parseFloat(document.getElementById('rate').value);
            const time = parseFloat(document.getElementById('time').value);
            
            // Validate inputs
            if (isNaN(principal) || principal <= 0) {
                alert("Please enter a valid principal amount (greater than 0).");
                document.getElementById('principal').focus();
                return;
            }
            
            if (isNaN(rate) || rate < 0) {
                alert("Please enter a valid interest rate (0 or greater).");
                document.getElementById('rate').focus();
                return;
            }
            
            if (isNaN(time) || time <= 0) {
                alert("Please enter a valid time period (greater than 0).");
                document.getElementById('time').focus();
                return;
            }
            
            // Calculate simple interest
            const interest = (principal * rate * time) / 100;
            const totalAmount = principal + interest;
            
            // Format numbers with commas and 2 decimal places
            const formatCurrency = (amount) => {
                return '$' + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
            };
            
            // Display results
            document.getElementById('principal-display').textContent = formatCurrency(principal);
            document.getElementById('interest-earned').textContent = formatCurrency(interest);
            document.getElementById('total-display').textContent = formatCurrency(totalAmount);
            document.getElementById('total-amount').textContent = formatCurrency(totalAmount);
            
            // Show result section with animation
            const resultElement = document.getElementById('result');
            resultElement.classList.add('show');
            
            // Scroll to results for better UX
            resultElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        
        function resetCalculator() {
            // Reset input values
            document.getElementById('principal').value = 1000;
            document.getElementById('rate').value = 5;
            document.getElementById('time').value = 1;
            
            // Hide result section
            document.getElementById('result').classList.remove('show');
            
            // Focus on principal input
            document.getElementById('principal').focus();
        }
        
        // Initialize calculator with a calculation on page load
        window.onload = function() {
            calculate();
        };
        
        // Add keyboard shortcuts
        document.addEventListener('keydown', function(event) {
            // Calculate on Enter key
            if (event.key === 'Enter') {
                calculate();
            }
            
            // Reset on Escape key
            if (event.key === 'Escape') {
                resetCalculator();
            }
        });
        
        // Add input validation and real-time formatting
        const inputs = document.querySelectorAll('input[type="number"]');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                // Remove any non-numeric characters except decimal point
                this.value = this.value.replace(/[^0-9.]/g, '');
                
                // Ensure only one decimal point
                const decimalCount = (this.value.match(/\./g) || []).length;
                if (decimalCount > 1) {
                    this.value = this.value.substring(0, this.value.lastIndexOf('.'));
                }
            });
        });