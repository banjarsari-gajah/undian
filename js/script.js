$(document).ready(function () {
    let previousWinners = [];
    let maxNumber = 640;
    let minRange = 0;
    let maxRange = 9;
    let generateDuration = 4000; // 4 detik

    //$('#generate-btn').focus();

    function getRandomNumber() {
        return Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange;
    }

    function generateUniqueNumber() {
        let newNumber = [];
        do {
            newNumber = [];
            newNumber.push(0); // Digit pertama selalu 0
            newNumber.push(Math.floor(Math.random() * 7)); // Digit kedua maksimal 7
            newNumber.push(getRandomNumber()); // Digit ketiga bebas antara minRange dan maxRange
            newNumber.push(getRandomNumber()); // Digit keempat bebas antara minRange dan maxRange
        } while (previousWinners.some(winner => winner.join('') === newNumber.join('')) && (Number(newNumber.join('')) > maxNumber));
        return newNumber;
    }
    

    function animateNumbers($slots, finalNumbers) {
        $slots.each(function (index) {
            const $slot = $(this);
            let interval = 50;

            const spin = setInterval(function () {
                $slot.text(getRandomNumber());
            }, interval);

            setTimeout(function () {
                clearInterval(spin);
                $slot.text(finalNumbers[index]);
            }, generateDuration * (index + 1) / 4);
        });
    }

    function playSound() {
        // Mainkan efek suara disini (misalnya menggunakan Audio API)
        // const audio = new Audio('/sounds/spin.mp3');
        // audio.play();
    }

    $('#generate-btn').on('click', function () {
        const $slots = $('.slot');
        const finalNumbers = generateUniqueNumber();
        
        previousWinners.push(finalNumbers);

        animateNumbers($slots, finalNumbers);
        playSound();

        setTimeout(function () {
            $('#winner-list').prepend('<li>' + finalNumbers.join('') + '</li>');
        }, generateDuration + 500); // Waktu tambahan setelah animasi selesai
    });

    $(document).keypress(function(event) {
        if (event.key === "Enter") {
            const $slots = $('.slot');
        const finalNumbers = generateUniqueNumber();
        
        previousWinners.push(finalNumbers);

        animateNumbers($slots, finalNumbers);
        playSound();

        setTimeout(function () {
            $('#winner-list').prepend('<li>' + finalNumbers.join('') + '</li>');
        }, generateDuration + 500); // Waktu tambahan setelah animasi selesai
        }
    });
});
